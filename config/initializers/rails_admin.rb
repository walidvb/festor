RailsAdmin.config do |config|

  config.main_app_name = ["Mapping 2015"]

  ### Popular gems integration
  I18n.default_locale = :en
  I18n.available_locales = [:en, :fr]
  ## == Devise ==
  config.authenticate_with do
    warden.authenticate! scope: :user
  end
  config.current_user_method(&:current_user)

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  ## == Globalize ==
  config.included_models = ['Artist', 'Artist::Translation', 'Event', 'Event::Translation', 'Location', 'User', 'StaticPage', 'StaticPage::Translation', 'Booking']

  config.model 'Artist::Translation' do
    visible false
    configure :locale, :hidden do
      help ''
    end
    include_fields :locale, *Artist.translated_attribute_names
  end

  config.model 'Event::Translation' do
    visible false
    configure :locale, :hidden do
      help ''
    end
    include_fields :locale, *Event.translated_attribute_names
  end

  config.model 'StaticPage::Translation' do
    visible false
    configure :locale, :hidden do
      help ''
    end
    include_fields :locale, *StaticPage.translated_attribute_names
  end

  config.model 'Booking' do 
    configure :location do 
      visible false
    end
  end

  config.model 'Location' do
    configure :events do 
      visible false
    end
    configure :artists do 
      visible false
    end
    configure :bookings do 
      visible false
    end
  end
end
