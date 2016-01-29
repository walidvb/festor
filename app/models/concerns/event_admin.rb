module EventAdmin
  extend ActiveSupport::Concern
  included do
    attr_accessor :link_ids
  	attr_accessor :artist_ids

    rails_admin do
      configure :translations, :globalize_tabs
      configure :bookings do
        visible false
      end
  		configure :event_dates do
  			label :dates
  			visible true
  		end
      configure :musicians do
        visible false
      end
      configure :vjs do
        visible false
      end
      configure :links do
        visible false
      end
      edit do
  			configure :event_dates do
  				label "Dates"
  			end
        configure :artists do
          orderable true
        end
        configure :instructors do
          hide
        end
        configure :extra_infos do
          hide
          orderable true
          nested_form false
        end
        [:slug, :assets, :position].each do |h|
          configure h do
            hide
          end
        end
      end
      list do
      	scopes [:workshop, :exhibition, :other, :all]
        field :title do
        	# pretty_value do
        	#  bindings[:view].link_to(bindings[:object].title, edit_path(model_name: bindings[:object].class)) << value
        	# end
        end
        field :category
        field :featured
      end
    end
  end

end
