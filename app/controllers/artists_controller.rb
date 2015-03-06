class ArtistsController < ApplicationController
	def index
		@artists = Artist.all
	end

	def show
		@artist = Artist.includes(:bookings).find(params[:id])
		@bookings = @artist.bookings
		@links = @artist.links
	end
end
