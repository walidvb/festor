(() => {
	let $back;
	let sizes;

	$(document).on('turbolinks:load', () => {
		$('main').on('scroll', handleParallax);
		$back = $('#background');
		const imgSrc = /url\(\"?([^\"\)"]+)\"?\)/.exec($back.css('background-image'))[1];
		const backImg = new Image();
		backImg.onload = (e) => {
			sizes = {
				width: e.path[0].width,
				height: e.path[0].height,
			}
			console.log("sizes:", sizes);
		}
		backImg.src = imgSrc;
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
		//height = Math.max(height, 2*window.innerHeight);
		$back.css({ height: $('main').outerHeight(true) + $('main').offset().top });
		let percentageScrolled = ($this.scrollTop() / (height - window.innerHeight));
		percentageScrolled = Math.min(Math.max(0, percentageScrolled), 100);
		percentageScrolled = +percentageScrolled.toFixed(2);
		console.log("percentageScrolled:", percentageScrolled);


		let transform = percentageScrolled*sizes.height;
		console.log("`translateY(-${percentageScrolled}px)`:", transform);
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