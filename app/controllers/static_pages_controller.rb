class StaticPagesController < ApplicationController
	before_filter :store_location

	def index
		@news = StaticPage.news
	end

	def show
		@static_page = StaticPage.friendly.find(params[:id])
    if @static_page.requires_authentication?
    	session[:previous_url] = location || request.fullpath
    	beta_only
  	end
	end

	private 

  def store_location location = nil
    # store last url - this is needed for post-login redirect to whatever the user last visited.
  end
end
