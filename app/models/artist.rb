class Artist < ActiveRecord::Base

	has_many :bookings, dependent: :delete_all
	has_many :events, through: :bookings

	has_attached_file :profile_picture,
		:styles => {
			:thumb => "100x100#",
			:small  => "150x150>",
			:medium => "200x200",
			:large => "500x800>"
			},
			:default_url => "/images/missing.jpg"
	validates_attachment_content_type :profile_picture, :content_type => /\Aimage\/.*\Z/
  # add a delete_<asset_name> method: 
  attr_accessor :delete_profile_picture
  before_validation { self.profile_picture.clear if self.delete_profile_picture == '1' }


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
