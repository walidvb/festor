class StaticPagesController < ApplicationController
		skip_before_filter :beta_only

	def index
		@news = StaticPage.news
	end

	def show
		@static_page = StaticPage.find(params[:id])
	end
end
