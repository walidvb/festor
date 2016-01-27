#require 'app/models/admin/event'
class Event < ActiveRecord::Base

	include EventAdmin
	attr_accessor :artist_ids
	translates :title, :description, :participants, :languages, :requirements, :material, :notes
	extend FriendlyId
  friendly_id :title, :use => [:globalize, :slugged]
  acts_as_list scope: 'type = \'#{type}\''

	has_many :links, as: :linkable, dependent: :destroy

	scope :featured, -> {where(featured: true)}
	has_many :event_dates, dependent: :delete_all, inverse_of: :event
	accepts_nested_attributes_for :event_dates, allow_destroy: true

	has_many :bookings, dependent: :delete_all, inverse_of: :event

	has_many :artists, through: :bookings, inverse_of: :events
	has_many :musicians, -> {where type: :dj}, through: :bookings, source: :artist, inverse_of: :events
	has_many :vjs,  -> {where type: :vj}, through: :bookings, source: :artist, inverse_of: :events
	has_many :instructors,  -> {where type: :instructor}, through: :bookings, source: :artist, inverse_of: :events

	has_many :assets, as: :assetable
	accepts_nested_attributes_for :assets, allow_destroy: true
	belongs_to :location, inverse_of: :events

	has_many :extra_infos, inverse_of: :event

	accepts_nested_attributes_for :links, allow_destroy: true
	accepts_nested_attributes_for :extra_infos, allow_destroy: true
	accepts_nested_attributes_for :translations, allow_destroy: true

	#validates :location, presence: true
	#validates :main_image, presence: true
	has_attached_file :main_image,
		:styles => {
			:thumb => "100x100",
			:tile => "600x",
			:large => "800x"
		},
		:default_url => "/images/missing.jpg",
		:use_timestamp => false

	validates_attachment_content_type :main_image, :content_type => /\Aimage\/(jpg|jpeg|png|gif)\Z/i

	def add_artist artist
		Booking.create! event: self, artist: artist
	end

	def next
		if ed = event_dates.first
			EventDate.where('event_id != ? AND start > ?', self.id, ed.start.strftime("%Y-%m-%d %H:%M")).first.try(:event)
		end
	end

	def previous
		if ed = event_dates.first
			EventDate.where('event_id != ? AND start < ?', self.id, ed.start.strftime("%Y-%m-%d %H:%M")).first.try(:event)
		end
	end

	def self.type_enum
		[:single_event, :exhibition, :workshop]
	end

	def self.category_enum
		[:clubbing, :performance, :screening, :other, :installation, :exhibition, :conference]
	end

	def finished?
	  false
	end

	self.type_enum.each do |type|
		scope type, -> {where(type: type)}
	end

	self.inheritance_column = :fake_column

	attr_accessor :artist_ids
	def artist_ids=(ids)
		unless (ids = ids.map(&:to_i).select { |i| i>0 }) == (current_ids = bookings.map(&:artist_id))
			(current_ids - ids).each { |id| bookings.select{|b|b.artist_id == id}.first.mark_for_destruction }
			ids.each_with_index do |id, index|
				if current_ids.include? (id)
					#bookings.select { |b| b.artist_id == id }.first.position = (index+1)
				else
					bookings.build({:artist_id => id})#, :position => (index+1)})
				end
			end
		end
	end

end
