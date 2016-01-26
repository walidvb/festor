class Artist < ActiveRecord::Base
  extend FriendlyId
  include ArtistAdmin

  friendly_id :name, :use => :slugged
  acts_as_list
  scope :vj, -> {where(vj: true)}
  translates :biography


  validates_presence_of :name, :biography

  has_many :bookings, dependent: :delete_all, inverse_of: :artist
  has_many :events, through: :bookings, inverse_of: :artists
  has_many :locations, through: :bookings, inverse_of: :artists
  has_many :links, as: :linkable, dependent: :destroy, inverse_of: :linkable

  accepts_nested_attributes_for :translations, allow_destroy: true
  accepts_nested_attributes_for :links, allow_destroy: true

	has_attached_file :profile_picture,
		:styles => {
			:thumb => "100x100#",
			:medium => "350x200#",
      :large => "800x",
      :tile => "600x"
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
