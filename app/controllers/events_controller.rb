class EventsController < ApplicationController
	before_filter :get_section, only: [:index]
	before_filter :require_admin!, only: [:sortable_index, :sort_update]

	def program
		@all_dates = {}
		@events = Event.not_exhibition
		@event_dates = EventDate.where(event_id: @events.map(&:id)).order('start ASC').includes(:event, :artists, :location)
		@artists = Artist.all.order(:name)
		@days = EventDate.all.pluck(:start).map(&:to_date).uniq
		render 'program'
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
		@artists = @event.artists.order(:updated_at)
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
