function Glitchousel(){
	

}

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
}

var glitchousel = new Glitchousel();