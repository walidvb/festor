class EventsController < ApplicationController
	before_filter :get_type, only: [:index]
	before_filter :require_admin!, only: [:sortable_index, :sort_update]
	def index
		@events = Event.order("position ASC").includes(:artists, :location).send(@type.to_sym)
		if @type == :single_event
			@dates = EventDate.all.uniq{|d| d.start.strftime("%e-%b-%y")}.map(&:start)
			render 'index_single_events'
		else
			render 'index'
		end
	end

	def sortable_index
		@types = Event.all.order(:position).group_by{|e| e.type}
	end

	def sort_update
		event = Event.find(params[:id])
		event.insert_at(params[:position].to_i)
		head :ok
	end

	def show
		@event = Event.includes(:artists, :location, :event_dates).friendly.find(params[:id])
		@type = @event.type
		@dates = @event.event_dates
		@musicians = @event.musicians
		@vjs = @event.vjs
		@instructors = @event.instructors
		@location = @event.location
		@links = @event.links
		@assets = @event.assets
	end

	private

	def get_type
		@type = params[:type] || :all
	end
end
