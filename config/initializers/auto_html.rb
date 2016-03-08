# encoding: UTF-8

# set these options and default values
# :width => '100%', :height => 166, :auto_play => false, :theme_color => '00FF00', :color => '915f33', :show_comments => false, :show_artwork => false, :visual => true
AutoHtml.add_filter(:soundcloud_).with(:width => '100%', :height => 166, :auto_play => false, :theme_color => '000000', :color => '000000', :show_comments => false, :show_artwork => true, :visual => false) do |text, options|
  require 'uri'
  require 'net/http'
  text.gsub(/<a href="(https?:\/\/?(?:www)?.?soundcloud\.com\/[^\"]*)[^>]*>[^<]*<\/a>/) do |match|
    new_uri = Regexp.last_match[1].to_s
    new_uri = (new_uri =~ /^https?\:\/\/.*/) ? URI(new_uri) : URI("http://#{new_uri}")
    new_uri.normalize!
    width = options[:width]
    height = options[:height]
    auto_play = options[:auto_play]
    theme_color = options[:theme_color]
    color = options[:color]
    show_artwork = options[:show_artwork]
    show_comments = options[:show_comments]
    visual = options[:visual]
    %{<iframe width="#{width}" height="#{height}" scrolling="no" frameborder="no" src="http://w.soundcloud.com/player/?url=#{new_uri}&show_artwork=#{show_artwork}&show_comments=#{show_comments}&auto_play=#{auto_play}&color=#{color}&theme_color=#{theme_color}&visual=#{visual}"></iframe>}
  end
end
