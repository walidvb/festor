class ApplicationController < ActionController::Base
  before_filter :set_locale
  before_filter :beta_only unless Rails.env.test?
  before_filter :get_static_pages
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  before_filter :configure_permitted_parameters, if: :devise_controller?
  

  # Devise permitted params
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(
      :email, 
      :password, 
      :password_confirmation) 
    }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(
      :email, 
      :password, 
      :password_confirmation,
      :current_password
      ) 
    }
  end
  
  # Redirects on successful sign in
  def after_sign_in_path_for(resource)
    cookies.permanent[:beta] = "sign"
    rails_admin_path
  end
  
  # Only permits admin users
  def require_admin!
    authenticate_user!
    if current_user && !current_user.admin?
      redirect_to root_path
    end
  end

  private
  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
    Rails.application.routes.default_url_options[:locale] = I18n.locale
  end

  def beta_only
    redirect_to beta_path if !cookies[:beta].present? && /sessions|confirmation/.match(params[:controller]).nil?
  end

  def get_static_pages
    @static_pages = StaticPage.static
  end
end
