class Booking < ActiveRecord::Base
	belongs_to :event
	belongs_to :artist

	validates :event, presence: true
	validates :artist, presence: true
end
