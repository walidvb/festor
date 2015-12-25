#require 'app/models/admin/event'
class Event < ActiveRecord::Base

	include EventAdmin
	attr_accessor :artist_ids
	translates :title, :description
	extend FriendlyId
  friendly_id :title, :use => [:globalize, :slugged]
  acts_as_list scope: 'type = \'#{type}\''

	has_many :links, as: :linkable, dependent: :destroy

	scope :featured, -> {where(featured: true)}
	has_many :event_dates, dependent: :delete_all
	accepts_nested_attributes_for :event_dates, allow_destroy: true

	has_many :bookings, dependent: :delete_all

	has_many :artists, through: :bookings
	has_many :musicians, -> {where vj: false}, through: :bookings, source: :artist
	has_many :vjs,  -> {where vj: true}, through: :bookings, source: :artist

	has_many :assets, as: :assetable
	accepts_nested_attributes_for :assets, allow_destroy: true
	belongs_to :location

	accepts_nested_attributes_for :artists, allow_destroy: true
	accepts_nested_attributes_for :links, allow_destroy: true
	accepts_nested_attributes_for :translations, allow_destroy: true

	#validates :location, presence: true
	#validates :main_image, presence: true
	has_attached_file :main_image,
		:styles => {
			:thumb => "100x100#",
			:tile => "600x270#",
			:large => "1200x535#"
		},
		:default_url => "/images/missing.jpg",
		:use_timestamp => false

	validates_attachment_content_type :main_image, :content_type => /\Aimage\/(jpg|jpeg|png|gif)\Z/i

	def finished?
		if schedule_end.nil?
			DateTime.now > schedule_start
		else
			DateTime.now > schedule_end
		end
	end

	def add_artist artist
		Booking.create! event: self, artist: artist
	end

	def next
	end

	def previous
	end

	def self.type_enum
		[:single_event, :exhibition, :workshop]
	end

	def self.category_enum
		[:clubbing, :performance, :screening, :other, :installation, :exhibition]
	end

	self.type_enum.each do |type|
		scope type, -> {where(type: type)}
	end

	self.inheritance_column = :fake_column


end
