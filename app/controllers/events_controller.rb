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
		route_params = request.path.split('/')
		@type = route_params[1]
		!@type ||= :all
	end
end
