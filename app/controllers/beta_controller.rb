class BetaController < ApplicationController
	skip_before_filter :beta_only
  def new
  end

  def create
  	if params[:beta_login] == 'showtime2015' 
	  	cookies.permanent[:beta] = "gingerbread"
	  	redirect_to session[:previous_url] || root_path
	  else
	  	redirect_to home_path
	  end
  end
end
