RailsAdmin.config do |config|

  config.main_app_name = ["Mapping 2017"]

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

  nested_only = %w{Setting Link}
  config.actions do
    dashboard do
      except nested_only
    end
    toggle
    index do
    end
    new do
      except ['Settings']
    end
    export
    bulk_delete
    show
    edit
    delete do
      except nested_only
    end
    show_in_app do
      except nested_only
    end

    ## With an audit adapter, you can add:
    # history_index
    # history_show

    root :sync do
      controller do
        proc do
          begin
            notice = ZoneFestival.sync!
            redirect_to '/admin', notice: notice
          rescue => e
            raise e unless Rails.env.prod?
            redirect_to '/admin', alert: "Error when syncing database: #{e}"
          end
        end
      end
    end
    root :reset_and_sync do
      controller do
        proc do
          begin
            notice = ZoneFestival.reset_and_sync!
            redirect_to '/admin', notice: notice
          rescue => e
            raise e unless Rails.env.prod?
            redirect_to '/admin', alert: "Error when syncing database: #{e}"
          end
        end
      end
    end
  end

  ## == Globalize ==
  config.included_models = ['Artist', 'Artist::Translation', 'Event', 'Event::Translation', 'Link', 'Location', 'Location::Translation', 'User', 'Booking', 'EventDate', 'Partner', 'Setting', 'Setting::Translation', 'PreviousEdition', 'Message', 'Message::Translation']

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

  config.model 'Setting::Translation' do
    visible false
    configure :locale, :hidden do
      help ''
    end
    include_fields :locale, *Setting.translated_attribute_names
  end

  config.model 'Location::Translation' do
    visible false
    configure :locale, :hidden do
      help ''
    end
    include_fields :locale, *Location.translated_attribute_names
  end

  config.model 'Message::Translation' do
    visible false
    configure :locale, :hidden do
      help ''
    end
    include_fields :locale, *Message.translated_attribute_names
  end

  config.model 'Booking' do
    configure :location do
      visible false
    end
  end

  config.model 'Link' do
    visible true
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
