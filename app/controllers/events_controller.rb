class EventsController < ApplicationController
	before_filter :get_section, only: [:index]
	before_filter :require_admin!, only: [:sortable_index, :sort_update]

	def program
		@filters = Event.section_enum

		@all_dates = {}
		@events = Event.all
		@sections = Event.pluck(:section).uniq.compact
		@event_dates = EventDate.order('start ASC').includes(:event, :artists, :location)
		@artists = Artist.all.order(:name)
		@artists_by_letter = @artists.group_by{|artist| artist.name[0].upcase}
		@days = EventDate.all.pluck(:start).map(&:to_date).uniq
		@venues = Location.all
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
		@artists = @event.artists.published.order(:updated_at)
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
