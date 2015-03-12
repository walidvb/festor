// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require home.js
//= require mixitup/build/jquery.mixitup.min.js
//= require mixitup/build/jquery.mixitup.min.js
//= require_tree .
//= stub_tree rails_admin


// to be removed when i get what's failing
$(document).on('ready page:load', function(){
	$('.dropdown a').click(function(){
		setTimeout(function(){$(this).parent('.dropdown').addClass('open')}, 0);
		console.log('asd');
	});

	var nav = $('.navbar-nav');
	var navOffsetTop = nav.offset().top;
	$(window).on('scroll', function(e){
		var scrollTop = $(this).scrollTop();
		if(scrollTop >= navOffsetTop)
		{
			$('body').addClass('nav-fixed');
		}
		else
		{
			$('body').removeClass('nav-fixed');
		}
	}).on('resize', function(){navOffsetTop = nav.offset().top;})
})