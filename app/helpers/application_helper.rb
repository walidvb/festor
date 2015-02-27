module ApplicationHelper
	#include RailsAdmin::Engine.routes.url_helpers
	
  def title(value)
    unless value.nil?
      @title = "#{value} | Application"      
    end
  end

  def print_link link
    link_to link.text_to_show, link.url, target: "_blank"
  end

  def long_date
  	"%e %B - %H:%M"
  end
end
