class StaticPagesController < ApplicationController
	def index
		@news = StaticPages.news
	end

	def show
		@static_page = StaticPage.find(params[:id])
	end
end
