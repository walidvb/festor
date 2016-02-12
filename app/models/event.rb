#require 'app/models/admin/event'
class Event < ActiveRecord::Base

	attr_accessor :artist_ids
	translates :title, :description, :participants, :languages, :requirements, :material, :notes
	extend FriendlyId
  friendly_id :title, :use => [:globalize, :slugged]
  acts_as_list scope: 'category = \'#{category}\''

	def self.workshop_cats
		[:workshop, :conference, :masterclass]
	end

	def is_workshop?
		Event.workshop_cats.include?(category.to_sym)
	end

	scope :workshop, ->{where(category: workshop_cats)}
	scope :exhibition, ->{where(category: :exhibition)}
	scope :other, ->{where.not(category: [:workshop, :conference, :masterclass, :exhibition])}

	scope :featured, -> {where(featured: true)}
	has_many :event_dates, dependent: :delete_all, inverse_of: :dateable, as: :dateable

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

	validates_presence_of :category, :title

	def next
		if ed = event_dates.first
			EventDate.where('dateable_type = ? AND dateable_id != ? AND start > ?', self.category, self.id, ed.start.strftime("%Y-%m-%d %H:%M")).first.try(:event)
		end
	end

	def previous
		if ed = event_dates.first
			EventDate.where('dateable_type = ? AND dateable_id != ? AND start < ?', self.category, self.id, ed.start.strftime("%Y-%m-%d %H:%M")).first.try(:event)
		end
	end

	def self.category_enum
		[:clubbing, :performance, :screening, :exhibition, :conference, :masterclass, :specials, :workshop]
	end

	def finished?
	  false
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
