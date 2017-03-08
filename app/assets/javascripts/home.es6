console.log(Array(16).join("info@vbbros.net" - 1) + " Batman!");


$(document).on('turbolinks:load', function(){
	if(window.hasOwnProperty('ontouchstart')){
		$('body').addClass('touch');
	}
	else{
		$('body').addClass('no-touch');
	}
	dragscroll.reset()
  // $('.colorbox').colorbox({
  //   iframe: true,
  //   innerWidth: 600,
  //   innerHeight: 281 * (600/500),
  // })
});
$(document).on('turbolinks:load', function(){
	if(!smallScreen()){
		const $logo = $('header'),
			$nav = $('nav');
		const $logoHeight = $logo.outerHeight(true);

		const handleScrollHeader = ({ currentTarget }) => {
			const scrollTop = $(currentTarget).scrollTop();
			const MIN = 10,
				MAX = 300;
			let opacity,
				translateZ,
				top;
			if(scrollTop < MIN){
				opacity = 1;
				translateZ = 0;
				top = $logoHeight;
			}
			else if(scrollTop > MIN && scrollTop < MAX){
				opacity = map(scrollTop, MIN, MAX, 1, 0.3);
				translateZ = map(scrollTop, MIN, MAX, 0, 10);
				 top = map(scrollTop, MIN, MAX, $logoHeight, $logoHeight*3/4)
			}
			else{
				opacity = .3;
				translateZ = 10;
				top = $logoHeight*3/4;
			}
			setPropertyWithoutTransition($logo, {
				transform: `perspective(60px) translateZ(${-translateZ}px)`,
				opacity,
			});

			setPropertyWithoutTransition($nav, {
				height: `calc(100vh - ${top}px)`
			});

			function setPropertyWithoutTransition(elem, props){
				props.transition = 'all 0s';
				elem.css(props);
				elem.css({
					transition: "",
				})
			}
		}
		// $('main').on('scroll', debounce(handleScrollHeader, 20, true));
	}
})

function map(num, inMin, inMax, outMin, outMax){
	return (num - inMin)*(outMax - outMin) / (inMax - inMin) + outMin;
}
