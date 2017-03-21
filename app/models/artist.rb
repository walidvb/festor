class Artist < ActiveRecord::Base
  extend FriendlyId
  include ArtistAdmin

  friendly_id :name, :use => :slugged
  acts_as_list
  scope :published, -> {where(published: true)}
  scope :vj, -> {where(vj: true)}
  translates :biography, :fallbacks_for_empty_translations => true


  #validates_presence_of :name
  default_scope { includes(:translations) }
  has_many :bookings, dependent: :delete_all, inverse_of: :artist
  has_many :events, through: :bookings, inverse_of: :artists
  has_many :event_dates, through: :events, inverse_of: :artists
  has_many :locations, through: :bookings, inverse_of: :artists
  has_many :links, as: :linkable, dependent: :destroy, inverse_of: :linkable

  accepts_nested_attributes_for :translations, allow_destroy: true
  accepts_nested_attributes_for :links, allow_destroy: true

	has_attached_file :profile_picture,
		:styles => {
			:thumb => "100x100#",
      :banner => "600x250#",
      :tile => "600x>",
      :medium => "800x>"
			:large => "1200x>",
		},
		:default_url => "/images/missing.jpg",
		:use_timestamp => false

	validates_attachment_content_type :profile_picture, :content_type => /\Aimage\/(jpg|jpeg|png|gif)\Z/i

  def book_for event
  	Booking.find_or_create_by! event: event, artist: self
  end

  def set_image_from_url url
    self.profile_picture = open(url)
    self.save!
  end

  def self.type_enum
    [:vj, :dj, :instructor, :performer, :exhibitor]
  end

  def next
    Artist.where('id > ? AND type = ?', self.id, self.type).first
  end
  def previous
    Artist.where('id < ? AND type = ?', self.id, self.type).first
  end
  self.inheritance_column = :fake_column
end
