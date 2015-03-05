function Glitchousel(options){
	this.params = {
		speed: 600,
		timeout: 5000,
	}
	this.timer = null;
	this.container = options.container
}

Glitchousel.prototype.start = function(){
	var that = this;
	console.log('starting');
	play();
	function play(){
		that.next();
		that.timer = setTimeout(play, that.params.timeout+ that.params.speed);
	}
};

Glitchousel.prototype.pause = function(){
	var that = this;
	console.log('pausing');
	clearTimeout(that.timer);
	that.ctx.putImageData(this.imgDatas[this.currentIndex], 0, 0);
};

Glitchousel.prototype.bindEvents = function(){
	var that = this;
	this.container.on('hover', that.pause, that.play);
}

Glitchousel.prototype.init = function(){
	var that = this;
	var $imgs = this.container.find('img');
	this.imgDatas = [];
	this.currentIndex = 0;
	var canvas = document.createElement('canvas');
	var ctx;
	this.container.append($(canvas));
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
				console.log("that:", that);
				that.start();
			}
		}
	}

	function processImgs(){
		for(var i = 0; i < $imgs.length; i++)
		{
			var width = $imgs[i].width;
			var height = $imgs[i].height;
			$imgs[i].style.display = 'none';
			canvas.width = width;
			canvas.height = height;
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
  //this.originalImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  this.transition(this.imgDatas[this.currentIndex], this.imgDatas[index]);
  this.currentIndex = index;
};

Glitchousel.prototype.next = function(){
	var nextIndex = this.currentIndex + 1;
	if(nextIndex >= this.imgDatas.length)
	{
		nextIndex = 0;
	}
	this.goTo(nextIndex);
};

Glitchousel.prototype.transition = function(imgSrc, imgTrg){
	var that = this;
	var finishedTransition = false;
	var direction = 1;
	var timer;
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
		timer = setTimeout(glitchTo, Math.random()*20+200);
		if(currParams.amount >= 100)
		{
			direction = -1;
			currParams.amount = 100;
			currentImgData = imgTrg;
		}
		if(currParams.amount <= 0){
			clearTimeout(timer);
			setTimeout(function(){that.ctx.putImageData(imgTrg, 0, 0);}, 10);
		}
		glitch(currentImgData, currParams, function(img_data) {
			var rdm = Math.random() > 0.25;
			var grayscaleImg = rdm ? img_data : Glitchable.prototype.grayscale(img_data);
			that.ctx.putImageData(grayscaleImg, 0, 0);
		});
	};
};


/*       Init the whole lot      */
window.glitchousels = [];
$(document).on('ready page:load', function(){
	var containers = $('.glitchousel');
	//var glitchousels = [];
	containers.each(function(){
		window.glitchousels.push(new Glitchousel({
			container: $(this),
		}).init());
	});
	console.log("glitchousels:", window.glitchousels);
});