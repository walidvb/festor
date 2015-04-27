function Glitchousel(options){
	this.params = {
		speed: options.speed || 600,
		delay: options.delay || 0,
		timeout: options.timeout || 5000,
		pauseOnHover: true,
		slideSelector: '.slide',
		legendSelector: '.legend'
	}
	this.timer = null;
	this.transitionTimer = null;
	this.container = options.container
}

Glitchousel.prototype.start = function(){
	var that = this;
	play();
	function play(){
		that.next();
		that.timer = setTimeout(play, that.params.timeout+ that.params.speed);
	}
};

Glitchousel.prototype.stop = function(){
	var that = this;
	clearTimeout(that.timer);
	clearTimeout(that.transitionTimer);
	that.slides[that.currentIndex].img.style.display = 'inline-block';
	that.canvas.style.display = 'none';
};

Glitchousel.prototype.bindEvents = function(){
	var that = this;
	if(that.params.pauseOnHover)
	{
		that.container.hover(that.stop.bind(that), that.start.bind(that));
	}
	that.canvas.addEventListener('mousedown', function(e){
		if(e.which == 1)
		{
			$(that.legends[that.currentIndex]).click();
		}
	});
}

Glitchousel.prototype.init = function(){
	var that = this;
	var $slides = this.container.find(this.params.slideSelector);
	this.slides = [];
	var $imgs = this.container.find('img');
	var $legends = this.container.find(this.params.legendSelector);
	this.imgDatas = [];
	this.legends = $legends;
	this.currentIndex = 0;
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	this.canvas = canvas;
	this.ctx = ctx;
	this.container.prepend($(canvas));
	var tmpImg = new Image();
	var imgsLoadedCount = 0;
	for(var i = 0; i < $slides.length; i++)
	{
		slide = {};
		slide.html = $slides[i];
		slide.img = $($slides[i]).find('img')[0];
		slide.img.style.display = 'none';
		createUntainted(slide);
		this.slides.push(slide);
	}
	that.bindEvents();
	setTimeout(function(){
		that.start();
	}, that.params.delay)
	this.setLegend(0);
	function createUntainted(slide){
			var img = slide.img;
      img.crossOrigin = "Anonymous";
      var src = img.src,
        imgAsData = document.createElement('img');
      img.parentNode.insertBefore(imgAsData, img);


      img.onload = function() {
				canvas.width = Math.max(img.width, canvas.width);
				canvas.height = Math.max(img.height, canvas.height);
        ctx.drawImage( img, 0, 0, img.width, img.height );
        var dataURL = canvas.toDataURL('image/jpeg', 1);
        imgAsData.src = dataURL;
        ctx.drawImage(imgAsData, 0, 0, img.width, img.height);
        imgAsData.style.display = 'none';
        slide.imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);;
      }
      img.src = src;

      //  //resets cache on src of img if it comes back undefined, using a 1x1 blank gif dataURI
      if ( img.complete || img.complete === undefined ) {
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = src;
      }
      return imgAsData;
    };
	return this;
};

Glitchousel.prototype.goTo = function(index){
  this.transition(this.slides[this.currentIndex], this.slides[index], index);
};

Glitchousel.prototype.next = function(){
	var nextIndex = this.currentIndex + 1;
	if(nextIndex >= this.slides.length)
	{
		nextIndex = 0;
	}
	this.goTo(nextIndex);
};

Glitchousel.prototype.prev = function(){
	var prevIndex = this.currentIndex - 0;
	if(prevIndex < 0)
	{
		prevIndex = this.slides.length - 1;
	}
	this.goTo(prevIndex);
};

Glitchousel.prototype.setLegend = function(index){
	var that = this;
	that.legends.removeClass('active');
	$(that.legends[index]).addClass('active');
}

Glitchousel.prototype.transition = function(slideSrc, slideTrg, index){
	var that = this;
	var finishedTransition = false;
	var direction = 1;
	var currParams = {
		amount: 2,
		seed: 70,
		iterations: 5,
		quality: 100
	};
	that.slides[that.currentIndex].img.style.display = 'none';
	for(var i = 0; i < that.slides.length; i++)
	{
		that.slides[i].img.style.display = 'none';
	}
	that.canvas.style.display = 'inline-block';

	var currentImgData = slideSrc.imgData;
	var increment = (100 - currParams.amount) / (that.params.speed / 200);
	glitchTo();
	function glitchTo(){
		var from, to; 
		if(direction > 0)
		{
			currParams.amount += 10+Math.random()*increment+2;
			currParams.seed += 10+Math.random()*increment+2;
			currParams.iterations *= Math.random()+1;
			currParams.quality -= 1.5;
		}
		else{
			currParams.amount -= 10+Math.random()*increment+2;
			currParams.seed -= 10+Math.random()*increment+2;
			currParams.iterations /= Math.random()+1;
			currParams.quality += 10+Math.random()*increment+2;
		}

		for(key in currParams){
			if(currParams[key] >= 100){
				currParams[key] = 100;
			}
			else if(currParams[key] <= 0)
			{
				currParams[key] = 0;
			}
			else{
				currParams[key] = Math.floor(currParams[key]);
			}
		}
		that.transitionTimer = setTimeout(glitchTo, Math.random()*20+200);
		if(currParams.amount >= 100)
		{
			direction = -1;
			currParams.amount = 100;
			currentImgData = slideTrg.imgData;
			that.currentIndex = index;
			that.setLegend(index);
		}
		if(currParams.amount <= 0){
			clearTimeout(that.transitionTimer);
			for(var i = 0; i < that.slides.length; i++)
			{
				that.slides[i].img.style.display = 'none';
			}
			that.slides[that.currentIndex].img.style.display = 'inline-block';
			that.canvas.style.display = 'none';
		}
		glitch(currentImgData, currParams, function(img_data) {
			var rdm = Math.random() > 0.25;
			var grayscaleImg = rdm ? img_data : Glitchable.prototype.grayscale(img_data);
			that.ctx.putImageData(grayscaleImg, 0, 0);
		});
	};
};


/*       Init the whole lot      */
$(document).on('ready page:load', function(){
	var containers = $('.glitchousel');
	if(/OS 7_|OS 6/.test(navigator.userAgent))
	{
		$('body').addClass('no-glitch');
		$('.glitchousel').slick({
		   autoplay: true,
		   prevArrow: false,
		   nextArrow: false,
		});
	}
	else
	{
		var glitchousels = [];
		containers.each(function(){
			glitchousels.push(new Glitchousel({
				container: $(this),
				delay: Math.random()*2500 + 2800,
				speed: Math.random()*600 + 200,
			}).init());
		});
	}
});