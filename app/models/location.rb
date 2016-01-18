class Location < ActiveRecord::Base
	geocoded_by :address_with_country   # can also be an IP address
	after_validation :geocode          # auto-fetch coordinates

	extend FriendlyId
	friendly_id :name, :use => [:globalize, :slugged]

	has_many :events
	has_many :bookings, through: :events
	has_many :artists, through: :bookings

	has_attached_file :picture,
	:styles => {
		:thumb => "100x100#",
		:small => "400x300#",
		:large => "800x600#"
	},
	:default_url => "/images/missing.jpg",
	:use_timestamp => false
	validates_attachment_content_type :picture, :content_type => /\Aimage\/.*\Z/

	private
	def address_with_country
		self.address + ' Switzerland'
	end
end
