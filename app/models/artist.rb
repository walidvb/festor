class Artist < ActiveRecord::Base
  extend FriendlyId
  include ArtistAdmin

  friendly_id :name, :use => :slugged
  acts_as_list
  scope :vj, -> {where(vj: true)}
  translates :biography


  validates :name, presence: true
  validates :biography, presence: true

  has_many :bookings, dependent: :delete_all, inverse_of: :artist
  has_many :events, through: :bookings, inverse_of: :artists
  has_many :locations, through: :bookings, inverse_of: :artists
  has_many :links, as: :linkable, dependent: :destroy, inverse_of: :artists

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

  def self.type_enum
    [:vj, :dj, :instructor, :performer]
  end

  self.inheritance_column = :fake_column
end
