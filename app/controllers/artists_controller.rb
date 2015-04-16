class ArtistsController < ApplicationController
	before_filter :require_admin!, only: [:sortable_index, :sort_update]
	
	def index
		@artists = Artist.includes(:events).order(:position)
	end

	def sortable_index
		@artists = Artist.all.order(:position)
	end

	def sort_update
		artist = Artist.find(params[:id])
		artist.insert_at(params[:position].to_i)
		head :ok
	end

	def show
		@artist = Artist.includes(:events).friendly.find(params[:id])
		@links = @artist.links
	end
end
