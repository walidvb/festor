class ArtistsController < ApplicationController
	
	def index
		@artists = Artist.all
	end

	def show
		@artist = Artist.includes(:bookings).friendly.find(params[:id])
		@bookings = @artist.bookings
		@links = @artist.links
	end
end
