class EventsController < ApplicationController
	before_filter :get_type, only: [:index]

	def index
		@events = Event.includes(:artists, :location).send(@type.to_sym)
		if @type == :single_event
			@dates = @events.map(&:schedule_start).uniq{|d| d.strftime("%e-%b-%y")}.compact.sort()
			render 'index_single_events'
		else
			render 'index'
		end
	end

	def show
		@event = Event.includes(:artists, :location).friendly.find(params[:id])
		@musicians = @event.musicians
		@vjs = @event.vjs
		@location = @event.location
		@links = @event.links
	end

	private

	def get_type
		@type = params[:type] || :all
	end
end
