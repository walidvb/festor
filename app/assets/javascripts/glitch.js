$(document).ready(function(){
  // assuming there's a loaded img and a canvas element in the DOM.
  var myGlitches = document.getElementsByClassName('glitch');
  var glitchables = [];
  window.glitchables = glitchables;
  for(var i = 0; i < myGlitches.length; i++){
    var currentGlitch = myGlitches[i];
    if(currentGlitch.nodeName == "IMG"){
      currentGlitch.onload = function(){
        var foo = new Glitchable(this);
        foo.init();
        glitchables.push(foo);
        foo.glitchOnHover();
      }
    }
  }
  setInterval(function(){
    var thisGlitch = getRandomVisibleCanvas(glitchables);
    thisGlitch.glitchItFor(500);
  }, 200);
  function Glitchable(img){
    this.originalImg = img;
  }

  Glitchable.prototype.init = function(){
    var originalImgClone = new Image();
    originalImgClone.src = this.originalImg.src;
    originalImgClone.crossOrigin = "*"
    console.log("originalImg.src:", this.originalImg.src);
    var canvas = document.createElement('canvas');
    var width = originalImgClone.width;
    var height = originalImgClone.height;
    canvas.width = width;
    canvas.height = height;
    $(this.originalImg).replaceWith(canvas);
    ctx = canvas.getContext('2d');
    // draw the img on the canvas 
    ctx.drawImage(originalImgClone, 0, 0);
    this.originalImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    this.canvas = canvas;
    this.ctx = ctx;
    this.glitchOnHover();
  };

  Glitchable.prototype.glitchOnHover = function(){
    var glitchInterval = null;
    var that = this;
    this.canvas.onmouseover = function(){
      console.log("mouovering:", that);
      glitchInterval = setInterval(that.glitchIt.bind(that), 200);
    };
    this.canvas.onmouseout = function() {
      clearInterval(glitchInterval);
      that.ctx.putImageData(that.originalImgData, 0, 0);
    }
  };
  
  Glitchable.prototype.reset = function(){
    this.ctx.putImageData(this.originalImgData, 0, 0);
  };

  Glitchable.prototype.glitchItFor = function(millis){
    var that = this;
    var startingTime = new Date().getTime();
    function glitchInterval(){
      console.log("glitching:");
      that.glitchIt();
      if(new Date().getTime() - startingTime < millis)
      {
        setTimeout(glitchInterval, Math.random()*200+20);
      }
      else{
        // that.reset();
      }
    };
    setTimeout(glitchInterval, Math.random()*200+20);
  };

  Glitchable.prototype.glitchIt = function(parameters){
    var parameters = parameters || {
      amount: Math.random()*100,
      seed: Math.random()*100,
      iterations: randomInt(0, 70),
      quality: Math.random()*100
    };
    var that = this;
    glitch(this.originalImgData, parameters, function(img_data) {
      var rdm = Math.random() > 0.4;
      grayscaleImg = rdm ? img_data : grayscale(img_data);
      that.ctx.putImageData(grayscaleImg, 0, 0);
    });
  };

  
  function getRandomVisibleCanvas(glitchables){
    var visibles = [];
    for(var i = 0; i < glitchables.length; i++){
      var $canvas = $(glitchables[i].canvas);
      var top = $canvas.offset().top;
      if($(window).scrollTop() < top + $canvas.height() && top < $(window).height() + $(window).scrollTop())
      {
        visibles.push(glitchables[i]);
      }
    }
    var i = randomInt(0, visibles.length - 1);
    return visibles[i];
  }
  // Utils
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function grayscale(pixels, args) {
    var d = pixels.data;
    for (var i=0; i<d.length; i+=4) 
    {
      var r = d[i];
      var g = d[i+1];
      var b = d[i+2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v
    }
    return pixels;
  }
});