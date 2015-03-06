class Artist < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, :use => :slugged

  translates :biography, :sidebar_media
  auto_html_for :sidebar_media do
    html_escape
    image
    youtube(:width => 400, :height => 250)
    link :target => "_blank", :rel => "nofollow"
    simple_format
  end

  validates :name, presence: true
  validates :biography, presence: true

  has_many :bookings, dependent: :delete_all
  has_many :events, through: :bookings
  has_many :locations, through: :bookings
  has_many :links, as: :linkable, dependent: :destroy

  accepts_nested_attributes_for :translations, allow_destroy: true
  accepts_nested_attributes_for :links, allow_destroy: true

	has_attached_file :profile_picture,
		:styles => {
			:thumb => "100x100#",
			:medium => "350x200#",
      :large => "1200x535#",
      :tile => "400x180#"
		},
		:default_url => "/images/missing.jpg",
		:use_timestamp => false
  
	validates_attachment_content_type :profile_picture, :content_type => /\Aimage\/.*\Z/

  def book_for event
  	Booking.create! event: event, artist: self
  end

	rails_admin do
    configure :translations, :globalize_tabs
    configure :links do 
      visible true
    end
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
