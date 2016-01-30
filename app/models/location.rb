class Location < ActiveRecord::Base
	geocoded_by :address_with_country   # can also be an IP address
	after_validation :geocode          # auto-fetch coordinates
	translates :infos
	accepts_nested_attributes_for :translations, allow_destroy: true

	rails_admin do
		configure :translations, :globalize_tabs
		[:artists, :events, :bookings, :slug].each do |ffield|
			configure ffield do
				hide
			end
		end
	end

	extend FriendlyId
	friendly_id :name, :use => [:globalize, :slugged]

	has_many :events, inverse_of: :location
	has_many :bookings, through: :events, inverse_of: :location
	has_many :artists, through: :bookings, inverse_of: :locations


	private
	def address_with_country
		self.address + ' Switzerland'
	end
end
