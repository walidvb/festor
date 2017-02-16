module ZoneFestivalSyncer
  def self.get_data
    res = Net::HTTP.post_form(uri, email: email, password: password)
    res.body
  end

  def self.reset_and_sync!
    Artist.delete_all
    Event.delete_all
    Location.delete_all
    Link.delete_all
    EventDate.delete_all
    Booking.delete_all

    self.sync!
  end

  def self.sync!
    zf = ZoneFestival.first || ZoneFestival.new
    zf.data = self.get_data
    zf.save!
    if Rails.env.development?
      zf.store_locally!
    else
      zf.delay.store_locally!
    end
  end
  private

  def self.email
    ENV['ZONE_FESTIVAL_EMAIL']
  end

  def self.password
    ENV['ZONE_FESTIVAL_PASSWORD']
  end

  def self.uri
    URI("http://api.zonefestival.com/json/program/")
  end

  def self.store_locally zf
    Rails.logger.info "processing venues"
    self.store_venues zf

    # EVENTS <- programs
    # description: program description, else show description
    # name: program name, else show name
    # dates: all programs with same show_id

    # ARTISTS <-
    # name: artist_name
    # bio: artist_bio

    zf['program'].each do |date|
      Rails.logger.info "processing #{date['title']}: #{date['date_start']}"
      event_date = EventDate.find_by_zf_id(date['id']) || EventDate.new
      event_date.zf_id = date['id']
      event_date.start = DateTime.parse(date['date_start'])
      event_date.end = DateTime.parse(date['date_end'])
      Rails.logger.info "Fetching shows"
      shows = self.shows_for_program(date, zf)
      has_multiple_shows_for_single_program = shows.count > 1

      first_show = shows.first
      #store zf_id as the first show of the list
      event = Event.find_by_zf_id(first_show['id'].to_i) || Event.new
      event.zf_id = first_show['id'].to_i

      if has_multiple_shows_for_single_program
        self.store_translations(event, :title, date, :name)
        Rails.logger.info "Multiple Performances detected for #{date['name_1']}"
        store_translations event, :description,  date, :description
      else
        store_translations event, :description,  first_show, :description_long
        event.title = first_show['title_selected']
      end
      store_translations event, :short_description,  first_show, :description_short

      event.location = Location.find_by_zf_id(date['venue_id'])
      section_from_show = self.section_for_show(event.zf_id, zf)
      section_from_program = self.section_for_program(date, zf)
      section = section_from_show || section_from_program
      puts section
      store_translations event, :section,  section, :name
      event.save!
      if img = first_show['image'][0]
        event.delay.set_image_from_url(img['url'])
      end
      event_date.event = event
      event_date.save!
      self.store_artists_from_shows shows, event, zf
    end


  end

  private

  def self.store_artists_from_shows shows, event, zf
    shows.each do |ev|
      if artists = ev['artist']
        artists.each do |art|
          Rails.logger.info "processing #{art['name']}"
          artist = Artist.find_by_zf_id(art['id']) || Artist.new
          artist.name = art['name']
          artist.country = art['country']
          artist.zf_id = art['id'].to_i
          self.store_translations artist, :biography, art, :biography
          art['website'].each do |web|
            artist.links << Link.create!(text_to_show: web['type_1'], url: web['website'])
          end
          artist.save!
          if img = art['image'][0]
            artist.delay.set_image_from_url(img['url'])
          end
          if !event.artists.map(&:id).include?(artist.id)
            artist.book_for event
          end
        end
      end
    end
  end

  def self.store_venues zf
    Rails.logger.info "processing venues"
    zf['venue'].each do |loc|
      location = Location.find_by_zf_id(loc['id'].to_i) || Location.new
      location.zf_id = loc['id'].to_i
      store_translations location, :name,  loc, :name
      location.address = loc['address']
      location.latitude = loc['latitude']
      location.longitude = loc['longitude']
      location.save!
    end
  end

  def self.shows_for_program program, zf
    show_ids = zf['program_show_list'].select{|prog_show| prog_show['program_id'] == program['id']}.map{|prog_show| prog_show['show_id']}
    zf['show'].select{|show| show_ids.include?(show['id'])}
  end

  def self.section_for_show show_id, zf
    zf['section_show_list'].map do |s_s|
      if s_s['show_id'].to_i == show_id
        zf['section'].find{|sect| sect['id'] == s_s['section_id']}
      end
    end.compact.first
  end

  def self.section_for_program(date, zf)
    section_id = date['section_id']
    zf['section'].find{|sec| sec['id'] == section_id}
  end

  def self.store_translations object, object_column, source_object, source_column
    old_locale = I18n.locale
    I18n.locale = :fr
    object.send("#{object_column}=", source_object["#{source_column}_1"])
    I18n.locale = :en
    object.send("#{object_column}=", source_object["#{source_column}_2"])
    I18n.locale = old_locale
  end
end
