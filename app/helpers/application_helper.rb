module ApplicationHelper
	#include RailsAdmin::Engine.routes.url_helpers
	
  def title(value)
    unless value.nil?
      @title = "#{value} | Application"      
    end
  end

  def print_link link
    if !/^https?\/\/:/.match(link.url)
      url = "http://" + link.url
    else
      url = link.url
    end
    link_to link.text_to_show, url, target: "_blank"
  end

  def long_date
  	"%e %B - %H:%M"
  end

  def active_link_to txt, url
    path_1 = /\/?\w{0,2}?\/((\w*-?_?)+)/.match(url)[1]
    active = !request.fullpath.match(path_1).nil?
    link_to txt, url, class: active ? "active" : nil, locale: I18n.locale
  end

  def image_shower asset, gallery_id
    link_to(image_tag(asset.file.url(:thumb)), asset.file.url, "rel" => gallery_id, class: "fancybox")
  end

  def mf_auto_html html
    auto_html(html){
      html_escape;
      youtube(:width => 600, :height => 375)
      vimeo(:width => 600, :height => 375)
      dailymotion(:width => 600, :height => 375)
      soundcloud
      flickr
      simple_format; 
      link(:target => 'blank')
      image
    }.html_safe unless html.blank?
  end
end
