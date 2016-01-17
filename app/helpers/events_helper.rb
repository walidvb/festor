module EventsHelper
	def interpolate event
		infos = render('info_block', event: event)
		result = event.description
			.gsub('[image]', image_tag(event.main_image.url(:large), class: 'inline-image'))
			.gsub('[info]', infos)
			# this should also render the infos from the partial
		auto_html(result) {
      youtube(:width => 600, :height => 375)
      vimeo(:width => 600, :height => 375)
      dailymotion(:width => 600, :height => 375)
      soundcloud
      flickr
      simple_format
      link(:target => 'blank')
      image
		}
		#mf_auto_html(result)
	end
end
