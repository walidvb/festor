function Glitchousel(options){
	this.params = {
		speed: 5000,
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
		ctx.putImageData(that.imgDatas[0], 0, 0);
	  // draw the img on the canvas 
	  that.canvas = canvas;
	  that.ctx = ctx;
	}
  return this;
};

Glitchousel.prototype.goTo = function(index){
	console.log("drawing", index);
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
	glitchTo(1, imgSrc);
	var finishedTransition = false;
	function glitchTo(direction, imgData){
		var from, to; 
		if(direction > 0)
		{
			from = paramsFrom;
			to = paramsTo;
		}
		else{
			from = paramsTo;
			to = paramsFrom;
		}
		tweenable.tween({
			from: from,
			to:   to,
			duration: 1000,
			easing: 'easeOutQuad',
			start: function () {  },
			step: function(state){ 
				console.log("state:", state);
				glitch(imgData, state, function(img_data) {
		      var rdm = Math.random() > 0.4;
		      var grayscaleImg = rdm ? img_data : Glitchable.prototype.grayscale(img_data);
		      that.ctx.putImageData(grayscaleImg, 0, 0);
		    });
			},
			finish: function () {
				if(!finishedTransition)
				{
					glitchTo(-1, imgTrg);
				}
				else{
					that.ctx.putImageData(imgTrg, 0, 0);
				}
				finishedTransition = true;
			}
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