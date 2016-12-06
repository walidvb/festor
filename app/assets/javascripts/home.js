console.log(Array(16).join("info@vbbros.net" - 1) + " Batman!");


$(document).on('turbolinks:load', function(){
	if(window.hasOwnProperty('ontouchstart')){
		$('body').addClass('touch');
	}
	else{
		$('body').addClass('no-touch');
	}

  $('.colorbox').colorbox({
    iframe: true,
    innerWidth: 600,
    innerHeight: 281 * (600/500),
  })
});
$(document).on('turbolinks:load', function(){
})
