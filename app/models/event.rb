class Event < ActiveRecord::Base
	translates :title, :description, :sidebar_media, :sidebar_text
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

	attr_accessor :link_ids
	attr_accessor :artist_ids
	def artist_ids=(ids)
		unless (ids = ids.map(&:to_i).select{|i|i>0}) == (current_ids = bookings.map(&:artist_id))
			(current_ids - ids).each { |id| bookings.select{|b|b.block_id == id}.first.mark_for_destruction }
			self.blocks = ids.each_with_index.map do |id, index|
				if current_ids.include?(id)
					(artist_association = bookings.select{|b|b.block_id == id}.first).position = (index+1)
					artist_association
				else
					booking.build({:block_id => id, :position => (index+1)})
				end
			end.map(&:artist)
		end
	end

	private

	rails_admin do
    configure :translations, :globalize_tabs
    configure :bookings do
      visible false
    end
		configure :event_dates do
			label :dates
			visible true
		end
    configure :musicians do
      visible false
    end
    configure :vjs do
      visible false
    end
    configure :links do
      visible false
    end
    edit do
			configure :event_dates do
				label "Dates"
			end
    	configure :slug do
    		hide
    	end
			configure :artists do
				hide
			end
			configure :assets do
				hide
			end
    end
    list do
    	scopes Event.type_enum
      field :title do
      	# pretty_value do
      	#  bindings[:view].link_to(bindings[:object].title, edit_path(model_name: bindings[:object].class)) << value
      	# end
      end
      field :category
      field :featured
    end
  end
end
