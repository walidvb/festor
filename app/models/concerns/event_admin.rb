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
          nested_form false
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
      	scopes Event.type_enum
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
  def artist_ids=(ids)
    unless (ids = ids.map(&:to_i).select { |i| i>0 }) == (current_ids = bookings.map(&:artist_id))
      (current_ids - ids).each { |id| bookings.select{|b|b.artist_id == id}.first.mark_for_destruction }
      ids.each_with_index do |id, index|
        if current_ids.include? (id)
          bookings.select { |b| b.artist_id == id }.first.position = (index+1)
        else
          bookings.build({:artist_id => id, :position => (index+1)})
        end
      end
    end
  end
end
