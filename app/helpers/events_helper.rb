module EventsHelper
  def path_for event
    event.type == 'workshop' ? workshop_path(event, locale: I18n.locale) : exhibition_path(event, locale: I18n.locale)
  end
end
