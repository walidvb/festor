RailsAdmin.config do |config|

  config.main_app_name = ["Mapping 2016"]

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
    dashboard do
      except ['Setting']
    end
    index do
    end
    new do
      except ['Setting']
    end
    export
    bulk_delete
    show
    edit
    delete do
      except ['Setting']
    end
    show_in_app do
      except ['Setting']
    end

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  ## == Globalize ==
  config.included_models = ['Artist', 'Artist::Translation', 'Event', 'Event::Translation', 'Location', 'User', 'StaticPage', 'StaticPage::Translation', 'Booking', 'Link', 'EventDate', 'Partner', 'Setting', 'Setting::Translation',  'ExtraInfo', 'ExtraInfo::Translation']

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

  config.model 'Setting::Translation' do
    visible false
    configure :locale, :hidden do
      help ''
    end
    include_fields :locale, *Setting.translated_attribute_names
  end

  config.model 'ExtraInfo::Translation' do
    visible false
    configure :locale, :hidden do
      help ''
    end
    include_fields :locale, *ExtraInfo.translated_attribute_names
  end

  config.model 'Booking' do
    configure :location do
      visible false
    end
  end

  config.model 'Link' do
    visible false
  end

  config.model 'Asset' do
    configure :assetable do
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
