$(function() {
    FastClick.attach(document.body);
});
console.log(Array(16).join("info@vbbros.net" - 1) + " Batman!");


$(document).on('turbolinks:load', function(){
	if(window.hasOwnProperty('ontouchstart')){
		$('body').addClass('touch');
	}
	else{
		$('body').addClass('no-touch');
	}

  $('.slick').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    cssease: 'cubic-bezier(0, 1.54, 0, 1.16)',
    fade: true,
  });
  $('.colorbox').colorbox({
    iframe: true,
    innerWidth: 600,
    innerHeight: 281 * (600/500),
  })
	// fix menu
	// var nav = $('.navbar-nav');
	// var navOffsetTop = nav.offset().top;
	// $(window).on('resize', function(){
	// 	$('body').removeClass('nav-fixed');
	// 	navOffsetTop = nav.offset().top;
	// });
	// $(window).on('scroll', function(e){
	// 	if(window.innerWidth >= 767)
	// 	{
	// 		var scrollTop = $(this).scrollTop();
	// 		if(scrollTop >= navOffsetTop)
	// 		{
	// 			$('body').addClass('nav-fixed');
	// 		}
	// 		else
	// 		{
	// 			$('body').removeClass('nav-fixed');
	// 		}
	// 	}
	// });
});
$(document).on('turbolinks:load', function(){
	$('select').chosen({
		allow_single_deselect: true,
		disable_search_threshold: 10,
		width: '200px',
	});
})
