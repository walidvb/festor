class StaticPagesController < ApplicationController
	def index
		@news = StaticPage.news
	end

	def show
		@static_page = StaticPage.find(params[:id])
	end
end
