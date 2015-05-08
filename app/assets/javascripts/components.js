$(document).ready(function() {
	var options = {
		padding: 0,
		nextClick: true,
		preload: 2,
	};

	$('.colorbox.trigger').colorbox();
	$('.colorbox.image').colorbox();
	$('.colorbox.video').each(function(){
		var href = $(this).attr('data-content');
		$(this).colorbox({
			inline: true,
			href: href
		});
	});
});