class EventsController < ApplicationController
	before_filter :get_category, only: [:index]
	before_filter :require_admin!, only: [:sortable_index, :sort_update]

	def program
		@filters = Event.category_enum
		@days = EventDate.where.not(dateable_type: %w{Workshop Exhibition}).order('start ASC').includes(:dateable, :artists, :locations)
		@event_dates = {}
		@days.each do |ed|
			@event_dates[ed.dateable_id] = ed
		end
		@days = @days.group_by do |ed|
				ed.start.to_date
		end
		render 'program'
	end

	def index
		if @category != :workshop && !user_signed_in?
			render 'static/coming_soon'
			return
		end
		@events = Event.order("position ASC").includes(:artists, :location).send(@category.to_sym)
		@events = @events.public unless user_signed_in?
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
		@dates = @event.event_dates
		@artists = @event.artists.public
		@musicians = @event.musicians.public
		@vjs = @event.vjs.public
		@instructors = @event.instructors.public
		@location = @event.location
		@links = @event.links
		@assets = @event.assets
	end

	private

	def get_category
		@category = params[:category] || :all
	end
end
