class ZoneFestival < ActiveRecord::Base


  def self.sync! zf = nil
    zf = ZoneFestival.first || ZoneFestival.new
    if !zf.syncing?
      zf.syncing = true
      zf.data = self.get_data()
      zf.save!
      if Rails.env.development?
        zf.store_locally!
      else
        zf.delay.store_locally!
      end
      return 'Database sync in progress. Please wait a moment for the images to syncronise as well.'
    else
      return 'Sync already running.'
    end
  end

  def self.reset_and_sync!
    zf = ZoneFestival.first || ZoneFestival.new
    if !zf.syncing?
      Artist.delete_all
      Event.delete_all
      Location.delete_all
      Link.delete_all
      EventDate.delete_all
      Booking.delete_all
    end
    return ZoneFestival.sync! zf
  end

  def unset_sync
    self.syncing = false
    self.save!
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

    programs = zf['program'].select{|pr|
      pr['id'] == 42 ||
      pr['id'] == 23 ||
      pr['id'] == 27 ||
      pr['id'] == 54 ||
      pr['id'] == 41 ||
      true
    }
    processed_events = []
    programs.each do |date|
      Rails.logger.info "Processing #{date['name_1']}: #{date['date_start']}"
      event_date = EventDate.find_by_zf_id(date['id']) || EventDate.new
      event_date.zf_id = date['id']
      event_date.start = DateTime.parse(date['date_start'])
      event_date.end = DateTime.parse(date['date_end'])
      Rails.logger.info "Fetching shows"
      shows = shows_for_program(date, zf)
      has_multiple_shows_for_single_program = shows.count > 1
      has_show = !shows.empty?

      section_from_show = nil
      section_from_program = section_for_program(date, zf)
      sub_section = sub_section_for_program(date, zf)

      if(has_show)
        first_show = shows.first
        #store zf_id as the first show of the list
        event = Event.find_by_zf_id(first_show['id'].to_i) || Event.new
        if event.locked? || processed_events.include?(event)
          Rails.logger.info "skipping #{event.title} because processed: #{processed_events.include?(event)}"
          event_date.event = event
          event_date.save!
          next
        end
        processed_events << event
        event.zf_id = first_show['id'].to_i

        if has_multiple_shows_for_single_program
          Rails.logger.info "Group Performances detected for #{date['name_1']}"
          store_translations_for(event, :title, date, :name)
          store_translations_for event, :description,  date, :description

          desc_empty = date['description_1'].empty? && date['description_2'].empty?
          if sub_section && group_descriptions = /conf|perf/i.match(sub_section["name_1"])
            Rails.logger.info "Grouping Performances descriptions for #{date['name_1']}"
            create_description_from shows, date, event
          end
        elsif has_multiple_shows_for_single_program
          Rails.logger.info "Multiple Performances detected for #{date['name_1']}"
          shows.each do |show|
            Rails.logger.info "Show #{show['title_1']}(#{show['title_1']})"
            event = Event.find_by_zf_id(show['id']) || Event.new
            store_translations_for(event, :title, show, :title)
            store_translations_for(event, :description, show, :description_long)
            section_from_show = section_for_show(event.zf_id, zf)
            section_from_program = section_for_program(date, zf)
            event.location = Location.find_by_zf_id(date['venue_id'])
            store_translations_for event, :tickets_link, date, :ticket_url
            if section = section_from_show || section_from_program
              store_translations_for event, :section,  section, :name
            end
            if sub_section
              store_translations_for event, :sub_section,  sub_section, :name
            end

            if (informations = date['information']) && !informations.empty?
              Event.extra_fields.each do |key|
                store_information_for event, informations, key
              end
            end


            event.save!
            if has_show && img = show['image'][0]
              if (imgs = show['image']) && imgs.count > 0
                if img = imgs.find{ |_img| _img['principal'].nil? || _img['principal'] == 1 }
                  event.delay.set_image_from_url(img['url'])
                end
              end
            end
            store_artists_from_shows [show], event, zf
          end
          event_date.event = event
          event_date.save!
          next
        else
          Rails.logger.info "Single Performances detected for #{date['name_1']}"
          store_translations_for event, :description,  first_show, :description_long
          store_translations_for event, :title, first_show, :title
        end

        store_translations_for event, :short_description,  first_show, :description_short
        section_from_show = section_for_show(event.zf_id, zf)
      else
        Rails.logger.info "No Performance detected for #{date['name_1']}"
        event = Event.find_by_zf_id(date['id'].to_i) || Event.new
        if event.locked? || processed_events.include?(event)
          event_date.event = event
          Rails.logger.info "skipping #{event.title} because processed: #{processed_events.include?(event)} 2"
          event_date.save!
          next
        end
        processed_events << event
        event.zf_id = date['id'].to_i;
        store_translations_for event, :title,  date, :name
        store_translations_for event, :description,  date, :description
        event.save!
        store_artists_from_shows shows, event, zf
      end
      Rails.logger.info "Storing location to #{event.title}"
      event.location = Location.find_by_zf_id(date['venue_id'])
      store_translations_for event, :tickets_link, date, :ticket_url


      if section = section_from_show || section_from_program
        store_translations_for event, :section,  section, :name
      end

      if sub_section = sub_section_for_program(date, zf)
        store_translations_for event, :sub_section,  sub_section, :name
      end

      if (informations = date['information']) && !informations.empty?
        Event.extra_fields.each do |key|
          store_information_for event, informations, key
        end
      end
      Rails.logger.info "Saving event"
      event.save!
      if has_show && ((img = date['image'][0]) || (img = first_show['image'][0]))
        if (imgs = first_show['image']) && imgs.count > 0
          if img = imgs.find{ |_img| _img['principal'].nil? || _img['principal'] == 1 }
            event.delay.set_image_from_url(img['url'])
          end
        end
      end
      event_date.event = event
      event_date.save!
      store_artists_from_shows shows, event, zf
    end
    if Rails.env.production? 
      self.delay.unset_sync
    else
      self.unset_sync
    end
  end

  private

  def store_artists_from_shows shows, event, zf
    Rails.logger.info "Storing artists from #{shows.count} into #{event.title}"
    shows.each do |ev|
      if artists = ev['artist']
        artists.each do |art|
          Rails.logger.info "processing #{art['name']}"
          artist = Artist.find_or_create_by!(name: art['name'])
          if artist.locked?
            next
          end
          artist.name = art['name']
          artist.label = ev['art_direction']
          artist.country = IsoCountryCodes.search_by_name(art['country_2']).map(&:alpha2).join(', ') if artist.country.blank?
          artist.zf_id = art['id'].to_i
          store_translations_for artist, :biography, art, :biography
          art['website'].each do |web|
            artist.links << Link.find_or_create_by!(text_to_show: web['type_1'], url: web['website'])
          end
          artist.save!
          if (imgs = art['image']) && imgs.count > 0
            if img = imgs.first{ |_img| _img['principal'].nil? || _img['principal'] == 1 }
              artist.delay.set_image_from_url(img['url'])
            end
          end
          artist.book_for event
        end
      end
    end
    Rails.logger.info "Finished storing artists from #{shows.count} into #{event.title}"
  end

  def store_venues zf
    Rails.logger.info "processing venues"
    zf['venue'].each do |loc|
      location = Location.find_by_zf_id(loc['id'].to_i) || Location.new
      location.zf_id = loc['id'].to_i
      store_translations_for location, :name,  loc, :name
      store_translations_for location, :infos,  loc, :description
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

  def store_information_for target, informations, key
    {fr: '1', en: '2'}.each do |locale, locale_key|
      I18n.locale = locale
      if info = informations.find{|ques| ques["question_#{locale_key}"].downcase == "#{key}_#{locale_key}".downcase}
        target.send("#{key}=", info["answer_1"])
      end
    end
  end

  def store_translations_for object, object_column, source_object, source_column
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

  def create_description_from shows, date, event
    {fr: '1', en: '2'}.each do |locale, value|
      I18n.locale = locale
      ordered_shows = shows.sort_by do |show|
        show_id = show['id']
        date_id = date['id']
        time = data['program_show_list'].find{|ps| ps['show_id'] == show_id && ps['program_id'] == date_id}
        time['time']

      end

      description = shows.map do |show|
        t = show["title_#{value}"]
        d = show["description_long_#{value}"]
        "<div class='show-single'> \
        <h1 class='show-title'>#{t}</h1> \
        <div class='show-description'>#{d}</div> \
        </div>"
      end.join("")
      global_desc = date["description_#{value}"]
      event.description = "<div class='global-desc'>#{global_desc}</div><div class='multiple-shows'>#{description}</div>"
    end
    event.save!
  end

end
