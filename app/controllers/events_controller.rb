class EventsController < ApplicationController
	before_filter :get_type, only: [:index]
	skip_before_filter :beta_only
	before_filter :allow_workshops

	def index
		@events = Event.includes(:artists, :location).send(@type.to_sym).order(:schedule_start, :schedule_end)
		if @type == :single_event
			@dates = @events.map(&:schedule_start).uniq{|d| d.strftime("%e-%b-%y")}.compact.sort()
			render 'index_single_events'
		else
			render 'index'
		end
	end

	def show
		@event = Event.includes(:artists, :location).friendly.find(params[:id])
		events_array = Event.where(type: @event.type).select(:slug).order(:schedule_start, :schedule_end).map(&:slug)
		current_index = events_array.index(@event.slug)
		@next = events_array[current_index + 1]
		@previous = events_array[current_index - 1] unless current_index - 1 < 0
		@type = @event.type
		@musicians = @event.musicians
		@vjs = @event.vjs
		@location = @event.location
		@links = @event.links
	end

	private

	def get_type
		@type = params[:type] || :all
	end

	def allow_workshops
		beta_only if @type != :workshop
	end
end
