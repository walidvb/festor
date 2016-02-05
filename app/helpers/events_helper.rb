module EventsHelper
  def path_for event, options = {locale: I18n.locale}

    cat = event.category.to_sym
    Event.workshop_cats.include?(cat) ? workshop_path(event, locale: options[:locale]) :
      cat == :exhibition ? exhibition_path(event, locale: options[:locale]) :
        event_path(event, locale: options[:locale])
  end
end
