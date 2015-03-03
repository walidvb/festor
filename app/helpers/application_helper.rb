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

  def active_link_to txt, url
    path_1 = url.split('/')[1]
    active = !request.fullpath.match(path_1).nil?
    link_to txt, url, class: active ? "active" : nil
  end
end
