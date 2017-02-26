#require 'app/models/admin/event'
class Event < ActiveRecord::Base
	def self.extra_fields
		[:participants,
		:languages,
		:requirements,
		:material,
		:notes,
		:price]
	end

	attr_accessor :artist_ids
	translates :title,
		:description,
		*self.extra_fields,
		:tickets_link,
		:short_description,
		:sub_section,
		:fallbacks_for_empty_translations => true
	extend FriendlyId
  friendly_id :title, :use => [:globalize, :slugged]
	default_scope { includes(:translations) }




	def self.workshop_cats
		[:workshop, :conference, :masterclass, :talk, :specials]
	end

	scope :published, -> {where(published: true)}

	scope :workshop, ->{where(section: workshop_cats)}
	scope :exhibition, ->{where(section: ['Exposition', 'Exhibition'])}
	scope :not_exhibition, ->{where.not(section: ['Exposition', 'Exhibition'])}

	scope :other, ->{where.not(section: [:workshop, :conference, :masterclass, :exhibition])}

	scope :featured, -> {where(featured: true)}
	has_many :event_dates, dependent: :delete_all, inverse_of: :event

	has_many :bookings, dependent: :delete_all, inverse_of: :event

	has_many :artists, through: :bookings, inverse_of: :events
	has_many :musicians, -> {where type: :dj}, through: :bookings, source: :artist, inverse_of: :events
	has_many :vjs,  -> {where type: :vj}, through: :bookings, source: :artist, inverse_of: :events
	has_many :instructors,  -> {where type: :instructor}, through: :bookings, source: :artist, inverse_of: :events

	has_many :assets, as: :assetable
	belongs_to :location, inverse_of: :events

	has_many :extra_infos, inverse_of: :event
	has_many :links, as: :linkable, dependent: :destroy

	include EventAdmin
	#validates :location, presence: true
	#validates :main_image, presence: tru
	has_attached_file :main_image,
		:styles => {
			:thumb => "100x100>",
			:tile => "600x>",
			:large => "800x>",
			:tile_blurred => "600x>",
			:large_blurred => "800x>"
		},
		:convert_options => {
			:large_blurred => '-blur 0x8',
			:tile_blurred => '-blur 0x8'
		},
		:default_url => "/images/missing.jpg",
		:use_timestamp => false

	validates_attachment_content_type :main_image, :content_type => /\Aimage\/(jpg|jpeg|png|gif)\Z/i

	#validates_presence_of :title

	def next
	end

	def previous
	end

	def finished?
	  false
	end

	def artists_as_title?
		/club|perfo/i.match(sub_section)
	end

	def is_workshop?
		Event.workshop_cats.include?(section.to_sym)
	end

	def sup_section
		self.section == 'workshop' ? :workshop :
			self.section == 'exhibition' ? :exhibition : :event
	end

	def set_image_from_url url
    self.main_image = open(url)
    self.save!
	end

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
