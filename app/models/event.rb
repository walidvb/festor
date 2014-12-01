class Event < ActiveRecord::Base
	translates :title, :description
	
	has_many :bookings, dependent: :delete_all
	has_many :artists, through: :bookings
	accepts_nested_attributes_for :artists, :allow_destroy => true

	validates :slug, uniqueness: true, presence: true

  # add a delete_<asset_name> method: 
  attr_accessor :delete_profile_picture
  before_validation { self.profile_picture.clear if self.delete_profile_picture == '1' }

	def add_artist artist
		Booking.create! event: self, artist: artist
	end


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

	rails_admin do 
		configure :bookings do 
			visible false
		end
	end
end
