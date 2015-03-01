class HomeController < ApplicationController
	def index
		@home_page  = true
		@exhibition = Event.where(type: :exhibition).first
		@workshop   = Event.where(type: :workshop).first
		@event      = Event.where(type: :performance).first
		@artist 		= Artist.first
	end
end
