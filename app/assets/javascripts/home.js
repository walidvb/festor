$(document).on('ready page:load', function(){

	// fix menu
	var nav = $('.navbar-nav');
	var navOffsetTop = nav.offset().top;
	$(window).on('resize', function(){
		$('body').removeClass('nav-fixed');
		navOffsetTop = nav.offset().top;
	});
	$(window).on('scroll', function(e){
		if(window.innerWidth >= 767)
		{
			var scrollTop = $(this).scrollTop();
			if(scrollTop >= navOffsetTop)
			{
				$('body').addClass('nav-fixed');
			}
			else
			{
				$('body').removeClass('nav-fixed');
			}
		}
	});

	$('select').chosen({
		allow_single_deselect: true,
		disable_search_threshold: 10,
		width: '200px',
	});
})

_ = {}
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
_.debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};