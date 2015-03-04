class HomeController < ApplicationController
	def index
		@home_page  = true
		@exhibition = Event.exhibition.first
		@workshop   = Event.workshop.first
		@events     = Event.single_event.featured
		@artist 		= Artist.first
	end
end
