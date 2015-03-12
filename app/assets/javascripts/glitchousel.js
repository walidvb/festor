function Glitchousel(options){
	this.params = {
		speed: 600,
		timeout: 5000,
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
	setTimeout(function(){that.ctx.putImageData(that.imgDatas[that.currentIndex], 0, 0)},20);
};

Glitchousel.prototype.bindEvents = function(){
	var that = this;
	if(that.params.pauseOnHover)
	{
		that.container.hover(that.stop.bind(that), that.start.bind(that));
	}
	that.canvas.addEventListener('mousedown', function(){
		$(that.legends[that.currentIndex]).click();
	});
}

Glitchousel.prototype.init = function(){
	var that = this;
	var $slides = this.container.find(this.params.slideSelector);
	var $imgs = this.container.find('img');
	var $legends = this.container.find(this.params.legendSelector);
	this.imgDatas = [];
	this.legends = $legends;
	this.currentIndex = 0;
	var canvas = document.createElement('canvas');
	var ctx;
	this.container.prepend($(canvas));
	var tmpImg = new Image();
	var imgsLoadedCount = 0;
	for(var i = 0; i < $imgs.length; i++)
	{
		$imgs[i].onload = function(){
			imgsLoadedCount++;
			if(imgsLoadedCount == $imgs.length)
			{
				processImgs();
				that.bindEvents();
				that.start();
			}
		}
	}

	function processImgs(){
		for(var i = 0; i < $imgs.length; i++)
		{
			var width = $imgs[i].width;
			var height = $imgs[i].height;
			console.log("height:", height);
			$imgs[i].style.display = 'none';
			canvas.width = Math.max(width, canvas.width);
			canvas.height = Math.max(height, canvas.height);
			tmpImg.src = $imgs[i].src;
			ctx = canvas.getContext('2d');
			ctx.drawImage(tmpImg, 0, 0);
			var tmpImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			that.imgDatas.push(tmpImgData);
		}
		ctx.putImageData(that.imgDatas[0], 0, 0);
	  // draw the img on the canvas 
	  that.canvas = canvas;
	  that.ctx = ctx;
	}
	return this;
};

Glitchousel.prototype.goTo = function(index){
	var currentImgData = this.imgDatas[index];
  this.transition(this.imgDatas[this.currentIndex], this.imgDatas[index], index);
};

Glitchousel.prototype.next = function(){
	var nextIndex = this.currentIndex + 1;
	if(nextIndex >= this.imgDatas.length)
	{
		nextIndex = 0;
	}
	this.goTo(nextIndex);
};

Glitchousel.prototype.prev = function(){
	var nextIndex = this.currentIndex - 0;
	if(nextIndex < 0)
	{
		nextIndex = this.imgDatas.length - 1;
	}
	this.goTo(nextIndex);
};

Glitchousel.prototype.setLegend = function(index){
	var that = this;
	that.legends.removeClass('active');
	$(that.legends[index]).addClass('active');
}

Glitchousel.prototype.transition = function(imgSrc, imgTrg, index){
	var that = this;
	var finishedTransition = false;
	var direction = 1;
	var currParams = {
		amount: 2,
		seed: 70,
		iterations: 5,
		quality: 100
	};
	var currentImgData = imgSrc;
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
			currentImgData = imgTrg;
			that.currentIndex = index;
			that.setLegend(index);
		}
		if(currParams.amount <= 0){
			clearTimeout(that.transitionTimer);
			that.ctx.putImageData(imgTrg, 0, 0);
			// had to hack that in, as the original image would not be retored otherwise
			setTimeout(function(){
				console.log("restoring image...");
				that.ctx.putImageData(imgTrg, 0, 0);
			}, 20);
			setTimeout(function(){
				that.ctx.putImageData(imgTrg, 0, 0);
			}, 50);
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
	var glitchousels = [];
	containers.each(function(){
		glitchousels.push(new Glitchousel({
			container: $(this),
		}).init());
	});
});