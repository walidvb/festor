class Event < ActiveRecord::Base
	has_many :bookings
	has_many :artists, through: :bookings
	accepts_nested_attributes_for :artists, :allow_destroy => true

	def add_artist artist
		Booking.create! event: self, artist: artist
	end
end
