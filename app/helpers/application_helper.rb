module ApplicationHelper
	include RailsAdmin::Engine.routes.url_helpers
	
  def title(value)
    unless value.nil?
      @title = "#{value} | Application"      
    end
  end
end
