class Location < ActiveRecord::Base
	geocoded_by :address_with_country   # can also be an IP address
	after_validation :geocode          # auto-fetch coordinates

	extend FriendlyId
	friendly_id :name, :use => [:globalize, :slugged]

	has_many :events, inverse_of: :location
	has_many :bookings, through: :events, inverse_of: :location
	has_many :artists, through: :bookings, inverse_of: :location


	private
	def address_with_country
		self.address + ' Switzerland'
	end
end
