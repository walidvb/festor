class Admin::DataController < ApplicationController
  def events
    assocs = [:artists]
    events = Event.all.includes(:event_dates, *assocs)

    csv_export Event, events, assocs
  end

  def artists
    assocs = [:events]
    artists = Artist.all.includes(:events, *assocs)
    csv_export Artist, artists, assocs
  end

  def locations
    assocs = [:events, :artists]
    locs = Location.all.includes(*assocs)
    csv_export Location, locs, assocs
  end

  def csv_export model, array, assocs
    locales = I18n.available_locales
    res = CSV.generate() do |csv|
      headers = model.column_names

      model.translated_attribute_names.each do |attr_name|
        locales.each do |l|
          headers += ["#{l}_#{attr_name}"]
        end
      end
      if model.respond_to? :event_dates
        5.times do |i|
          headers += ["start_#{i}", "end_#{i}"]
        end
      end

      headers += assocs

      csv << headers


      array.each do |m|
        row = []

        model.column_names.each do |attr_name|
          row += [m.send(attr_name)]
        end

        model.translated_attribute_names.each do |attr_name|
          locales.each do |l|
            I18n.locale = l
            row += [m.send(attr_name)]
          end
        end

        if model.respond_to? :event_dates
          m.event_dates.each do |ed|
            headers += [ed.start, ed.end]
          end
          (5-m.event_dates.count).times do |i|
            headers += [nil, nil]
          end
        end

        assocs.each do |asso|
          row += [m.send(asso).map(&:slug).join(', ')]
        end

        csv << row
      end
    end
    respond_to do |format|
      format.html{render text: res}
      format.csv{send_data res}
    end
  end
end
