class Artist < ActiveRecord::Base
	has_many :bookings
	has_many :events, through: :bookings

	def book_for event
		Booking.create! event: event, artist: self
	end
end
