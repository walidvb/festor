class EventsController < ApplicationController
	before_filter :get_type, only: [:index]

	def index
		@events = Event.includes(:artists, :location).send(@type.to_sym)
		if @type == :single_event
			@dates = @events.map(&:schedule_start).uniq.compact.sort
			render 'index_single_events'
		else
			render 'index'
		end
	end

	def show
		@event = Event.includes(:artists, :location).find(params[:id])
		@artists = @event.artists
		@location = @event.location
		@links = @event.links
	end

	private

	def get_type
		@type = params[:type] || :all
	end
end
