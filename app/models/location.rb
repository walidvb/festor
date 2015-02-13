class Location < ActiveRecord::Base
	has_many :events
	has_many :bookings, through: :events
	has_many :artists, through: :bookings
end
