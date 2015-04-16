class StaticPagesController < ApplicationController

	def index
		@news = StaticPage.news
	end

	def show
		@static_page = StaticPage.friendly.find(params[:id])
	end
end
