class EventsController < ApplicationController
	before_filter :get_section, only: [:index]
	before_filter :require_admin!, only: [:sortable_index, :sort_update]

	def program
		@all_dates = {}
		if params[:exhib].present?
			@events = Event.published.not_exhibition
		else
			@events = Event.published
		end
		
		if user_signed_in? || cookies[:beta].present?
			@events = Event.all
		end

		@event_dates = EventDate.where(event_id: @events.map(&:id)).order('start ASC').includes(:event, :artists, :location)
		@artists = @events.map(&:artists).flatten.uniq.sort_by(&:name)
		@days = EventDate.all.pluck(:start).map(&:to_date).uniq
		if stale?(etag: [@event_dates.map(&:updated_at), @events.map(&:updated_at), @artists.map(&:updated_at)].join(''))
			render 'program'
		end
	end

	def index
		@events = Event.order("position ASC").includes(:artists, :location).send(@section.to_sym)
		@events = @events.published unless user_signed_in?
		@filters = @section == :workshop ? [:workshop, :conference, :masterclass] : []
		render 'index'
	end

	def sortable_index
		@events = Event.all.order(:position)
		@events = @events.send(params[:type]) if params[:type].present? && @events.respond_to?(params[:type])
	end

	def sort_update
		event = Event.find(params[:id])
		event.insert_at(params[:position].to_i)
		head :ok
	end

	def show
		@event = Event.includes(:artists, :location, :event_dates).friendly.find(params[:id])
		@section = @event.section
		@dates = @event.event_dates.includes(:location)
		@artists = @event.artists.order(:position)
		@musicians = @event.musicians.published
		@vjs = @event.vjs.published
		@instructors = @event.instructors.published
		@links = @event.links
		@assets = @event.assets
	end

	private

	def get_section
		@section = params[:section] || :all
	end
end
