class EventsController < ApplicationController

	def index
		@events = Event.all
	end

	def show
		@event = Event.includes(:artists).find(params[:id])
		@artists = @event.artists
		binding.pry
	end
end
