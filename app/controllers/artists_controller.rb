class ArtistsController < ApplicationController
	
	def index
		@artists = Artist.includes(:events).sort{|a,b| a.events.first.schedule_start <=> b.events.first.schedule_start}
	end

	def show

		@artist = Artist.includes(:events).friendly.find(params[:id])
		@links = @artist.links
	end
end
