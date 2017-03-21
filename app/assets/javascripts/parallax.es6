(() => {
	let $back;
	let sizes;
	const scrollSelector = 'main, .events, .legends';
	$(document).on('turbolinks:load', () => {
		$(scrollSelector).on('scroll', handleParallax);
		$back = $('#background');
		const imgSrc = $back.find('img').attr('src');
		const backImg = new Image();
		backImg.onload = (e) => {
			sizes = {
				width: $back.width(),
				height: $back.height(),
			}
			console.log("sizes:", sizes);
		}
		backImg.src = imgSrc;
	})
	$(document).on('turbolinks:before-visit turbolinks:before-render', () => setBackPosition('translateY(0px)', true));
	$(window).on('scroll', handleParallax);

	function handleParallax(e){
		const $this = $(e.currentTarget);
		let height;
		if($this.is(scrollSelector)){
			const heights = $this.children().map((i,elem) => $(elem).outerHeight(true));
			height = Math.max(...heights);
		}
		else{
			height = $(scrollSelector).outerHeight(true);
		}
		// don't exagerate it...
		height = Math.max(height, 3*window.innerHeight);

		let percentageScrolled = ($this.scrollTop() / (height - window.innerHeight));
		percentageScrolled = Math.min(Math.max(0, percentageScrolled), 100);
		percentageScrolled = +percentageScrolled.toFixed(2);


		let transform = Math.ceil(percentageScrolled*(sizes.height - window.innerHeight));
		console.log("`translateY, sizes`:", transform, sizes);
		transform = `translateY(-${transform}px)`;

		window.requestAnimationFrame(() => setBackPosition(transform));
	}

	function setBackPosition(transform, animate = false){
		const fn = animate ? 'animate' : 'css';
		$back[fn]({ transform })
	}

	document.addEventListener('keydown', function(e){
		if(!e.metaKey &&
			e.key != 'Control' &&
			e.key != 'Tab' &&
			e.key != 'Alt' &&
			e.key != 'Shift'){
			var bckElem = $('#background img');
			var bck = bckElem.attr('src');
			var rdm = Math.ceil(Math.random()*BACKGROUND_IMAGES_COUNT);
			var newBck = bck.replace(/mapping_(\d+)/, 'mapping_'+rdm);
			var img = new Image();
			img.onload = () => {
				bckElem.attr('src', newBck);
				$('body').removeClass('loading');
			}
			$('body').addClass('loading');
			img.src = newBck;
		}
	});
})();