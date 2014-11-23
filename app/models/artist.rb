class Artist < ActiveRecord::Base
	has_many :bookings, dependent: :delete_all
	has_many :events, through: :bookings

	def book_for event
		Booking.create! event: event, artist: self
	end

	rails_admin do 
		configure :bookings do 
			visible false
		end
		configure :events do 
			visible false
		end
	end
end
