(() => {
	let $back;
	let sizes;
	const scrollSelector = 'main';
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
		}
		backImg.src = imgSrc;
		setBackPosition('translateY(0px)', true)
	})
	$(document).on('turbolinks:before-render', () => setBackPosition('translateY(0px)', true));
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
		console.log("transform:", transform);
		$back[fn]({ transform })
	}

	let changing = false;
	$(document).on('click', '.background-changer', changeBack);
	document.addEventListener('keydown', function(e){
		if(!e.metaKey &&
			e.key != 'Control' &&
			e.key != 'Tab' &&
			e.key != 'Alt' &&
			e.key != 'Shift'){
			changeBack();
		}
	});
	let rdms = [];
	function changeBack(){
		if(changing){ return; };
		changing = true;
		var bckElem = $('#background img');
		var bck = bckElem.attr('src');
		let rdm = Math.ceil(Math.random()*BACKGROUND_IMAGES_COUNT);
		while(rdms.includes(rdm)){
			rdm = Math.ceil(Math.random()*BACKGROUND_IMAGES_COUNT);
		}
		rdms.push(rdm);
		var newBck = bck.replace(/mapping_(\d+)/, 'mapping_'+rdm);
		var img = new Image();
		img.onload = () => {
			bckElem.attr('src', newBck);
			$('body').removeClass('loading');
			$('#rdm').text(rdm);
			changing = false;
		}
		$('body').addClass('loading');
		img.src = newBck;
	}
})();