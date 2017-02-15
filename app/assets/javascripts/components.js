
function hideHeader(e){
	console.log('hiding header');
	$('header').removeClass('open');
}
$(document).on('turbolinks:load', function() {
	return;
	$('.header-left').on('click', function(e){
		console.log('toggling menu');
		var header = $('header');
		header = $('header');
		header.toggleClass('open');
	});
	$('main').on('mousedown', 'main', hideHeader);
});
