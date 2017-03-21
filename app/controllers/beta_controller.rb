class BetaController < ApplicationController
	skip_before_filter :beta_only
  def new
  end

  def create
  	if params[:beta_login] == 'borisisathug' || params[:beta_login] == 'borisisanotathug'
	  	cookies.permanent[:beta] = "gingerbread"
	  	redirect_to session[:previous_url] || root_path
	  else
	  	redirect_to root_path
	  end
  end
end
