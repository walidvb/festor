require 'rails_admin/config/fields/base'
require 'rails_admin/i18n_support'

module RailsAdmin
  module Config
    module Fields
      module Types
        class Datetime < RailsAdmin::Config::Fields::Base
          class << self
            # Parse normalized date strings using time zone
            def parse_date_string(date_string)
              ::Time.zone.parse(date_string, DateTime.now)
            end
          end
        end
      end
    end
  end
end
