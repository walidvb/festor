class BetaController < ApplicationController
	skip_before_filter :beta_only
  def new
  end

  def create
		binding.pry
  	if params[:beta_login] == 'borisisathug'
	  	cookies.permanent[:beta] = "gingerbread"
	  	redirect_to session[:previous_url] || root_path
	  else
	  	redirect_to home_path
	  end
  end
end
