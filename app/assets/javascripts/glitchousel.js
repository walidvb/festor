function Glitchousel(options){
	this.params = {
		speed: 1000,
	}
	this.timer = null;
	this.container = options.container
}

Glitchousel.prototype.start = function(){
	var that = this;
	play();
	function play(){
		that.next();
		that.timer = setTimeout(play, that.params.speed);
	}
};

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
	  // draw the img on the canvas 
	  this.canvas = canvas;
	  this.ctx = ctx;
	}
  return this;
};

Glitchousel.prototype.goTo = function(index){
	
	currentImg.src = this.imgs[index];
	var originalImgClone = new Image();
  this.originalImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.drawImage(originalImgClone, 0, 0);
	this.currentIndex = index;	
};
Glitchousel.prototype.next = function(){
	console.log("currentIndex", this.currentIndex++);
};

Glitchousel.prototype.glitchUp = function(){
	var tweenable = new Tweenable();
	var paramsFrom = {
		amount: 0,
		seed: 0,
		iterations: 0,
		quality: 0
	};
	var paramsTo = {
		amount: 100,
		seed: 100,
		iterations: 70,
		quality: 100
	};

	tweenable.tween({
		from: paramsFrom,
		to:   paramsTo,
		duration: 1000,
		easing: 'easeOutQuad',
		start: function () {  },
		step: function(state){ 
			console.log(state);
		},
		finish: function () {}
	});
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