module EventsHelper
	def interpolate event
		infos = render('info_block', event: event)
		result = event.description
			.gsub('[image]', image_tag(event.main_image.url(:large), class: 'inline-image'))
			.gsub('[info]', infos).html_safe
		mf_auto_html(result)
	end
end
