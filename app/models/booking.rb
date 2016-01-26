class Booking < ActiveRecord::Base
	belongs_to :event, inverse_of: :booking
	belongs_to :artist, inverse_of: :booking

	has_one :location, through: :event
	#validates :event, presence: true
	#validates :artist, presence: true

	rails_admin do
		list do
			field :artist
			field :event
		end
		edit do
			configure :location do
				visible false
			end
		end
	end
end
