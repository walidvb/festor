class ZoneFestival < ActiveRecord::Base


  def self.sync!
    zf = ZoneFestival.first || ZoneFestival.new
    zf.data = self.get_data()
    zf.save!
    if Rails.env.development?
      zf.store_locally!
    else
      zf.delay.store_locally!
    end
  end

  def self.reset_and_sync!
    Artist.delete_all
    Event.delete_all
    Location.delete_all
    Link.delete_all
    EventDate.delete_all
    Booking.delete_all
    zf = ZoneFestival.first || ZoneFestival.new
    zf.sync!
  end

  def store_locally!
    zf = self.data
    Rails.logger.info "processing venues"
    store_venues zf

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
      shows = shows_for_program(date, zf)
      has_multiple_shows_for_single_program = shows.count > 1
      has_show = !shows.empty?
      section_from_show = nil

      if(has_show)
        first_show = shows.first
        #store zf_id as the first show of the list
        event = Event.find_by_zf_id(first_show['id'].to_i) || Event.new
        event.zf_id = first_show['id'].to_i

        if has_multiple_shows_for_single_program
          store_translations(event, :title, date, :name)
          Rails.logger.info "Multiple Performances detected for #{date['name_1']}"
          store_translations event, :description,  date, :description
        else
          store_translations event, :description,  first_show, :description_long
          store_translations event, :title, first_show, :title_selected
        end
        store_translations event, :short_description,  first_show, :description_short
        section_from_show = section_for_show(event.zf_id, zf)
      else
        Rails.logger.info "No Performance detected for #{date['name_1']}"
        event = Event.find_by_zf_id(date['id'].to_i) || Event.new
        store_translations event, :title,  date, :title
        store_translations event, :description,  date, :description
      end
      event.location = Location.find_by_zf_id(date['venue_id'])
      section_from_program = section_for_program(date, zf)

      if section = section_from_show || section_from_program
        store_translations event, :section,  section, :name
      end

      if sub_section = sub_section_for_program(date, zf)
        store_translations event, :sub_section,  sub_section, :name
      end

      event.save!
      if has_show && img = first_show['image'][0]
        if (imgs = first_show['image']) && imgs.count > 0
          if img = imgs.first{ |_img| _img['principal'].nil? || _img['principal'] == 1 }
            event.delay.set_image_from_url(img['url'])
          end
        end
      end
      event_date.event = event
      event_date.save!
      store_artists_from_shows shows, event, zf
    end
  end

  private

  def store_artists_from_shows shows, event, zf
    shows.each do |ev|
      if artists = ev['artist']
        artists.each do |art|
          Rails.logger.info "processing #{art['name']}"
          artist = Artist.find_by_zf_id(art['id']) || Artist.new
          artist.name = art['name']
          artist.country = art['country']
          artist.zf_id = art['id'].to_i
          store_translations artist, :biography, art, :biography
          art['website'].each do |web|
            artist.links << Link.find_or_create_by!(text_to_show: web['type_1'], url: web['website'])
          end
          artist.save!
          if (imgs = art['image']) && imgs.count > 0
            if img = imgs.first{ |_img| _img['principal'].nil? || _img['principal'] == 1 }
              artist.delay.set_image_from_url(img['url'])
            end
          end

          if !event.artists.map(&:id).include?(artist.id)
            artist.book_for event
          end
        end
      end
    end
  end

  def store_venues zf
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

  def shows_for_program program, zf
    show_ids = zf['program_show_list'].select{|prog_show| prog_show['program_id'] == program['id']}.map{|prog_show| prog_show['show_id']}
    zf['show'].select{|show| show_ids.include?(show['id'])}
  end

  def section_for_show show_id, zf
    zf['section_show_list'].map do |s_s|
      if s_s['show_id'].to_i == show_id
        zf['section'].find{|sect| sect['id'] == s_s['section_id']}
      end
    end.compact.first
  end

  def section_for_program(date, zf)
    section_id = date['section_id']
    zf['section'].find{|sec| sec['id'] == section_id}
  end

  def sub_section_for_program(date, zf)
    section_sub_id = date['section_sub_id']
    zf['section_sub'].find{|sec| sec['id'] == section_sub_id}
  end

  def store_translations object, object_column, source_object, source_column
    old_locale = I18n.locale
    I18n.locale = :fr
    object.send("#{object_column}=", source_object["#{source_column}_1"])
    I18n.locale = :en
    object.send("#{object_column}=", source_object["#{source_column}_2"])
    I18n.locale = old_locale
  end

  def self.get_data
    res = Net::HTTP.post_form(
      URI("http://api.zonefestival.com/json/program/"),
      email: ENV['ZONE_FESTIVAL_EMAIL'],
      password: ENV['ZONE_FESTIVAL_PASSWORD'])
    res.body
  end

end
