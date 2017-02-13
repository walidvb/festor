module ZoneFestivalSyncer
  def self.get_data
    res = Net::HTTP.post_form(uri, email: email, password: password)
    res.body
  end

  def self.reset_and_sync!
    Artist.destroy_all
    EventDate.destroy_all
    Event.destroy_all
    Location.destroy_all
    self.sync!
  end

  def self.sync!
    self.store_locally JSON.parse(self.get_data)
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
      event_date.start = date['date_start']
      event_date.end = date['date_end']

      shows = self.shows_for_program(date, zf)
      has_multiple_shows_for_single_program = shows.count > 1

      first_show = shows.first
      #store zf_id as the first show of the list
      event = Event.find_by_zf_id(first_show['id'].to_i) || Event.new
      event.zf_id = first_show['id'].to_i

      if has_multiple_shows_for_single_program
        event.title = date['name_1']
        p "Multiple Performances detected for #{date['name_1']}"
        event.description = date['description_1']
      else
        event.description = first_show['description_long_1']
        event.title = first_show['title_selected']
      end

      event.location = Location.find_by_zf_id(date['venue_id'])
      event.section = self.sections_for_show(event.zf_id, zf).first
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
          artist.biography = art['biography_1']
          artist.save!
          if img = art['image'][0]
            artist.delay.set_image_from_url(img['url'])
          end
          event.artists << artist
        end
      end
    end
  end
  def self.store_venues zf
    Rails.logger.info "processing venues"
    zf['venue'].each do |loc|
      location = Location.find_by_zf_id(loc['id'].to_i) || Location.new
      location.zf_id = loc['id'].to_i
      location.name = loc['name_1']
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

  def self.sections_for_show show_id, zf
    zf['section_show_list'].map do |s_s|
      if s_s['show_id'].to_i == show_id
        zf['section'].find{|sect| sect['id'] == s_s['section_id']}['name_1']
      end
    end.compact
  end
end
