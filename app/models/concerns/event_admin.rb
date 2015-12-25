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
  				label "Datesa"
  			end
      	configure :slug do
      		hide
      	end
  			configure :artists do
  				hide
  			end
  			configure :assets do
  				hide
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
end
def artist_ids=(ids)
	unless (ids = ids.map(&:to_i).select{|i|i>0}) == (current_ids = bookings.map(&:artist_id))
		(current_ids - ids).each { |id| bookings.select{|b|b.block_id == id}.first.mark_for_destruction }
		self.blocks = ids.each_with_index.map do |id, index|
			if current_ids.include?(id)
				(artist_association = bookings.select{|b|b.block_id == id}.first).position = (index+1)
				artist_association
			else
				booking.build({:block_id => id, :position => (index+1)})
			end
		end.map(&:artist)
	end
end
