module ApplicationHelper
	include RailsAdmin::Engine.routes.url_helpers
	
  def title(value)
    unless value.nil?
      @title = "#{value} | Application"      
    end
  end

  def long_date
  	"%e %B - %H:%M"
  end
end
