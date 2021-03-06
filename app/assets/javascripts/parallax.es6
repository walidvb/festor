(() => {
	let $back;
	let sizes = {
		width: 1678, height: 2481
	};
	const scrollSelector = 'main';
	$(document).on('turbolinks:load', () => {
		$(scrollSelector).on('scroll', handleParallax);
		setSize();
		// setBackPosition('translateY(0px)', true)
		$(scrollSelector).stop().animate({scrollTop: 0});
	})
	function setSize(){
		$back = $('#background');
		const imgSrc = $back.find('img').attr('src');
		const backImg = new Image();
		backImg.onload = (e) => {
			sizes = {
				width: $back.width(),
				height: $back.height(),
			}
			handleParallax(e, true);
		}
		backImg.src = imgSrc;
	}
	$(window).resize(setSize);
	$(document).on('turbolinks:before-visit', () => setBackPosition('translateY(0px)', true));
	$(window).on('scroll', handleParallax);

	function handleParallax(e, animate = false){
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

		let transform = Math.ceil(percentageScrolled*(sizes.height - window.innerHeight));
		transform = `translateY(-${transform}px)`;

		window.requestAnimationFrame(() => setBackPosition(transform, animate));
	}

	function setBackPosition(transform, animate = false){
		if(animate){
			console.log("$back:", $back);
			// $(scrollSelector).stop().animate({scrollTop: 0});
		}
		$back.css({ transform });
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
	attachShake(changeBack);

	let rdms = [];

	function setRandomNumber(){
		$('#rdm').text(Math.ceil(Math.random()*BACKGROUND_IMAGES_COUNT));
	}
	let rdmer;
	function changeBack(){
		if(changing){ return; };
		changing = true;
		rdmer = setInterval(setRandomNumber, 50);
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
			$back.css({
				backgroundImage: `url(${newBck})`
			})
			$('body').removeClass('loading');
			$('#rdm').text(rdm);
			changing = false;
			clearInterval(rdmer);
		}
		$('body').addClass('loading');
		setTimeout(() => {
			img.src = newBck;
		}, 500);
	}

	function attachShake(cb){
		var myShakeEvent = new Shake({
	    threshold: 5, // optional shake strength threshold
	    timeout: 1000 // optional, determines the frequency of event generation
		});
		myShakeEvent.start();
		window.addEventListener('shake', cb, false);

	}
})();