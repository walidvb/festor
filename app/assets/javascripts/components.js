$(document).ready(function() {
	var options = {
		maxWidth: "95%",
		maxHeight: "95%",
	};

	$('.colorbox.trigger').colorbox(options);
	$('.colorbox.image').colorbox(options);
	$('.colorbox.video').each(function(){
		var href = $(this).attr('href');
		if(/youtube/.test(href)){
			options.width = 1120;
			options.height = 630;
		}
		else
		{
			options.width = 1000;
			options.height = 562;
		}
		options.iframe= true;
		$(this).colorbox(options);
	});
});