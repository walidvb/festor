module EventsHelper
	def schedule_for event
		start = event.schedule_start
		finish = event.schedule_end
		if finish.present?
			"#{start.strftime('%e')} #{t('time.to')} #{finish.strftime('%e %b')} &mdash; #{start.strftime('%H:%M')}-#{finish.strftime('%H:%M')}".html_safe
		else
			"#{start.strftime('%A %e %b')} &mdash; #{start.strftime('%H:%M')}".html_safe
		end
	end
end
