class EventsController < ApplicationController

	before_filter :get_type, only: [:index]
	def index
		@events = Event.send(@type.to_sym)
	end

	def show
		@event = Event.includes(:artists).find(params[:id])
		@artists = @event.artists
	end

	private

	def get_type
		@type = request.path.split('/')[2]
		!@type ||= :all
	end
end
