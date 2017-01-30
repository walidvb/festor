#require 'app/models/admin/event'
class Event < ActiveRecord::Base

	attr_accessor :artist_ids
	translates :title, :description, :participants, :languages, :requirements, :material, :notes, :price, :tickets_link, :fallbacks_for_empty_translations => true
	extend FriendlyId
  friendly_id :title, :use => [:globalize, :slugged]
	default_scope { includes(:translations) }

	def self.workshop_cats
		[:workshop, :conference, :masterclass]
	end

	scope :published, -> {where(published: true)}

	scope :workshop, ->{where(section: workshop_cats)}
	scope :exhibition, ->{where(section: :exhibition)}
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

	validates_presence_of :title, :location

	def next
		cat = %w{workshop conference masterclass}.include?(section) ? [:workshop, :conference, :masterclass] : section
		Event.where(section: cat).where('id > ?', id).first
		# if ed = event_dates
		# 	EventDate.where('dateable_type = ? AND event_id != ? AND start > ?', self.sup_section, self.id, ed.start.strftime("%Y-%m-%d")).order(:start).distinct(:event_id).first.try(:event)
		# end
	end

	def previous
		cat = %w{workshop conference masterclass}.include?(section) ? [:workshop, :conference, :masterclass] : section
		Event.where(section: cat).where('id < ?', id).last
		# if ed = event_dates.first
		# 	EventDate.where('dateable_type = ? AND event_id != ? AND start < ?', self.sup_section, self.id, ed.start.strftime("%Y-%m-%d")).distinct(:event_id).order(:start).first.try(:event)
		# end
	end

	def self.section_enum
		[:clubbing, :performance, :screening, :exhibition, :conference, :masterclass, :specials, :workshop]
	end

	def finished?
	  false
	end

	def is_workshop?
		Event.workshop_cats.include?(section.to_sym)
	end

	def sup_section
		self.section == 'workshop' ? :workshop :
			self.section == 'exhibition' ? :exhibition : :event
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
