class Admin::DataController < ApplicationController
  def events
    assocs = [:artists]
    events = Event.all.includes(:event_dates, *assocs)

    csv_export Event, events, assocs
  end

  def artists
    assocs = [:events]
    artists = Artist.all.includes(:event_dates, *assocs)
    csv_export Artist, artists, assocs
  end

  def locations
    assocs = [:artists, :events]
    locs = Location.all.includes(*assocs)
    csv_export Location, locs, assocs
  end

  def csv_export model, array, assocs = []
    locales = I18n.available_locales
    res = CSV.generate() do |csv|

      if model.respond_to? :attachment_definitions
        attachments = model.attachment_definitions.keys
        attachments_columns = attachments.map{|att| ["#{att}_file_name", "#{att}_file_size", "#{att}_content_type", "#{att}_updated_at"] }.flatten
        columns = (model.column_names - attachments_columns)
      else
        attachments = []
        columns = model.column_names
      end

      # columns, paperclip, translations, event_dates(up to 5)
      headers = []

      headers += columns

      attachments.each do |attachment|
        headers += [attachment]
      end

      model.translated_attribute_names.each do |attr_name|
        locales.each do |l|
          headers += ["#{l}_#{attr_name}"]
        end
      end

      if model.reflect_on_association :event_dates
        headers += ["event_dates_start"]
        headers += ["event_dates_end"]
      end

      headers += assocs

      csv << headers


      array.each do |m|
        row = []

        columns.each do |attr_name|
          row += [m.send(attr_name)]
        end

        attachments.each do |attachment|
          row +=[m.send(attachment).url]
        end

        model.translated_attribute_names.each do |attr_name|
          locales.each do |l|
            I18n.locale = l
            result = m.send(attr_name).to_s
            result = result.gsub('&nbsp;', ' ').gsub(/(\[(?:info|image):?\w*\])/, '').gsub(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, '')
            row += [result]
          end
        end
        if model.reflect_on_association :event_dates
          row += [m.event_dates.map{|ed|ed.start.strftime("%e %b %Y - %H:%M")}.join(' | ')]
          row += [m.event_dates.map{|ed|ed.end.try(:strftime, "%e %b %Y - %H:%M")}.join(' | ')]
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
