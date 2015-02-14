class Location < ActiveRecord::Base
	has_many :events
	has_many :bookings, through: :events
	has_many :artists, through: :bookings

	has_attached_file :picture,
	:styles => {
		:thumb => "100x100#",
		:small => "400x300#",
		:large => "800x600#"
	},
	:default_url => "/images/missing.jpg"
	validates_attachment_content_type :picture, :content_type => /\Aimage\/.*\Z/

end
