module ZoneFestivalSyncer
  def self.get_data
    res = Net::HTTP.post_form(uri, email: email, password: password)
    res.body
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

    # EVENTS <- programs
    # description: program description, else show description
    # name: program name, else show name
    # dates: all programs with same show_id

    # ARTISTS <-
    # name: artist_name
    # bio: artist_bio


    p zf
    zf['venue'].each do |loc|
      location = Location.find_by_zf_id(loc['id'].to_i) || Location.new
      location.zf_id = loc['id'].to_i
      location.name = loc['name_1']
      location.address = loc['address']
      location.latitude = loc['latitude']
      location.longitude = loc['longitude']
      location.save!
    end

    zf['show'].each do |ev|
      event = Event.find_by_zf_id(ev['id'].to_i) || Event.new
      event.zf_id = ev['id'].to_i
      event.title = ev['title_selected']
      event.description = ev['description_long_1']
      if img = ev['image'][0]
        event.main_image = open(img['url'])
      end
      if artists = ev['artist']
        artists.each do |art|
          artist = Artist.find_by_zf_id(art['id']) || Artist.new
          artist.name = art['name']
          artist.country = art['country']
          artist.zf_id = art['id'].to_i
          if img = art['image'][0]
            artist.profile_picture = open(img['url'])
          end
          artist.biography = art['biography_1']
          artist.save!
          event.artists << artist
        end
      end

      section = zf['section_show_list'].map do |s_s|
        if s_s['show_id'].to_i == event.zf_id
          zf['section'].find{|sect| sect['id'] == s_s['section_id']}['name_1']
        end
      end.compact.first
      event.section = section

      programs = zf['program_show_list'].map do |prog_show|
        if prog_show['show_id'] == event.zf_id
          zf['program'].find{|prog| prog['id'] == prog_show['program_id']}
        end
      end.compact

      programs.each do |date|
        ed = EventDate.find_by_zf_id(date['id']) || EventDate.new
        ed.zf_id = date['id']
        ed.start = date['date_start']
        ed.end = date['date_end']

        if event.title.blank?
          event.title = date['name_1']
        end
        ed.dateable_type = section
        event.event_dates << ed
        event.location = Location.find_by_zf_id(date['venue_id'])
      end



      begin
        event.save!
      rescue => e
        p e
        p event.inspect
        p event.valid?
        p ev
        p programs
        p sections
        raise e
      end
    end
  end
end
