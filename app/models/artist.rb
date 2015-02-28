class Artist < ActiveRecord::Base
  translates :biography
  accepts_nested_attributes_for :translations, allow_destroy: true


	has_many :bookings, dependent: :delete_all
  has_many :events, through: :bookings
  has_many :locations, through: :bookings

	has_attached_file :profile_picture,
		:styles => {
			:thumb => "100x100#",
			:medium => "350x200#",
			:large => "500x800>"
		},
		:default_url => "/images/missing.jpg",
		:use_timestamp => false
  
	validates_attachment_content_type :profile_picture, :content_type => /\Aimage\/.*\Z/

  def book_for event
  	Booking.create! event: event, artist: self
  end

	rails_admin do
    configure :translations, :globalize_tabs
    configure :bookings do 
      visible false
    end
    configure :events do 
      visible false
    end
    configure :locations do 
      visible false
    end
  end

end
