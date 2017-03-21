(() => {
	let $back;
	$(document).on('turbolinks:load', () => {
		$('main').on('scroll', handleParallax);
		$back = $('#background');
	})
	$(document).on('turbolinks:before-visit, turbolinks:before-render', () => setBackPosition('0%', true));
	$(window).on('scroll', handleParallax);

	function handleParallax(e){
		const $this = $(e.currentTarget);
		let height;
		if($this.is('main')){
			const heights = $this.children().map((i,elem) => $(elem).outerHeight(true));
			height = Math.max(...heights);
		}
		else{
			height = $('main').outerHeight(true);
		}
		// don't exagerate it...
		height = Math.max(height, 2*window.innerHeight);
		let percentageScrolled = ($this.scrollTop() / (height - window.innerHeight))*100;
		percentageScrolled = Math.min(Math.max(0, percentageScrolled), 100);
		percentageScrolled = +percentageScrolled.toFixed(2)
		window.requestAnimationFrame(() => setBackPosition(`${percentageScrolled}%`))
	}

	function setBackPosition(backgroundPositionY, animate = false){
		const fn = animate ? 'animate' : 'css';
		$back[fn]({ backgroundPositionY })
	}
})();