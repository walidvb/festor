class EventsController < ApplicationController
	before_filter :get_category, only: [:index]
	before_filter :require_admin!, only: [:sortable_index, :sort_update]

	def program
		@filters = Event.category_enum
		@filters.delete(:workshop)
		@filters.delete(:exhibition)

		@total_duration = ((EventDate.order('"end" DESC').first.end - EventDate.order('start ASC').first.start) / 3600).ceil
		@first_start = EventDate.order('start ASC').first.start

		@days = EventDate.where(dateable_type: :event).includes(:event, :artists, :location).to_a.shuffle
		@artists = Artist.all
		@event_dates = {}
		@days.each do |ed|
			@event_dates[ed.event_id] = ed
		end
		@days = @days.group_by do |ed|
				ed.start.to_date
		end
		render 'program'
	end

	def index
		@events = Event.order("position ASC").includes(:artists, :location).send(@category.to_sym)
		@events = @events.published unless user_signed_in?
		@filters = @category == :workshop ? [:workshop, :conference, :masterclass] : []
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
		@category = @event.category
		@dates = @event.event_dates.includes(:location)
		@artists = @event.artists.published.order(:updated_at)
		@musicians = @event.musicians.published
		@vjs = @event.vjs.published
		@instructors = @event.instructors.published
		@links = @event.links
		@assets = @event.assets
	end

	private

	def get_category
		@category = params[:category] || :all
	end
end
