class Booking < ActiveRecord::Base
	belongs_to :event
	belongs_to :artist

	has_one :location, through: :event
	validates :event, presence: true
	validates :artist, presence: true
end
