module EventsHelper
  def path_for event, options = {locale: I18n.locale}
    event.type != :exhibition ? workshop_path(event, locale: options[:locale]) : exhibition_path(event, locale: options[:locale])
  end
end
