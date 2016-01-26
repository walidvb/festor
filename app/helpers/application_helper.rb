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

  def getEmbedLink src
    regexp_yt = /(https?:\/\/)?(www.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/watch\?(?:[\d|\w]+=[\d|\w]+)&*v=)([A-Za-z0-9_-]*)(\&\S+)?(\?\S+)?/
    regexp_vimeo = /https?:\/\/(www.)?vimeo\.com\/([A-Za-z0-9._%-]*)((\?|#)\S+)?/
    matches = regexp_yt.match(src)
    if !matches.nil?
      return "//www.youtube.com/embed/#{matches[4]}"
    end
    matches = regexp_vimeo.match(src)
    if !matches.nil?
      return "//player.vimeo.com/video/#{matches[2]}"
    end
  end

  def asset_colorbox asset, group
    if asset.file?
     link_to('', asset.file.url, "rel" => group, class: "colorbox image")
    elsif !asset.video.blank?
      link_to('', getEmbedLink(asset.video), "rel" => group, class: "colorbox video")
    end
  end

  def interpolate text, options = {}
    result = auto_html(text) {
      link(:target => 'blank')
      youtube(:width => 600, :height => 375)
      vimeo(:width => 600, :height => 375)
      dailymotion(:width => 600, :height => 375)
      soundcloud_
      flickr
      simple_format
    }
    result.gsub!(/\[image:?(\S*)?\]/) do |match|
      image_tag(options[:image], class: "inline-image #{Regexp.last_match[1].to_s}")
    end unless options[:image].blank?
    result.gsub!('[info]', options[:infos].gsub(/[\n\r]/, '')) unless options[:infos].nil?
    result
  end
end
