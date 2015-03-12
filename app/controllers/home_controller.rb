class HomeController < ApplicationController
	def index
		@home_page  = true
		@exhibitions = Event.exhibition.featured
		@workshops   = Event.workshop.featured
		@events     = Event.single_event.featured
		@news 		= StaticPage.news.first(3)
	end
end
