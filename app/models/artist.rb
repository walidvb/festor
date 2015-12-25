class Artist < ActiveRecord::Base
  extend FriendlyId

  friendly_id :name, :use => :slugged
  acts_as_list
  scope :vj, -> {where(vj: true)}
  translates :biography, :sidebar_media


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
      :tile => "600x270#"
		},
		:default_url => "/images/missing.jpg",
		:use_timestamp => false

	validates_attachment_content_type :profile_picture, :content_type => /\Aimage\/(jpg|jpeg|png|gif)\Z/i

  def book_for event
  	Booking.create! event: event, artist: self
  end

	rails_admin do
    configure :translations, :globalize_tabs
    list do
      field :name
      field :profile_picture
    end
    # configure :links do
    #   visible true
    # end
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
