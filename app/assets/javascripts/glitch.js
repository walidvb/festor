function Glitchable(img, otherGlitchables){
  this.originalImg = img;
}
$(document).on('ready page:load', function(){
  // assuming there's a loaded img and a canvas element in the DOM.
  var myGlitches = document.getElementsByClassName('glitch');
  var glitchables = [];
  var minInterval, maxInterval;
  var stoppedGlitchCount = 0;
  window.glitchables = glitchables;
  for(var i = 0; i < myGlitches.length; i++){
    var currentGlitch = myGlitches[i];
    if(currentGlitch.nodeName == "IMG"){
      currentGlitch.onload = function(){
        var foo = new Glitchable(this);
        foo.init();
        glitchables.push(foo);
      }
    }
  }
  minInterval = 20;
  maxInterval = 200;
  if(getVisibleCanvas().length < 6)
  {
    minInterval = 200;
    maxInterval = 800;
  }
  setTimeout(function(){
    setTimeout(startRandomGlitching, 1000);
      function startRandomGlitching(){
        var thisGlitch = getRandomVisibleCanvas(glitchables);
        thisGlitch.glitchItFor(randomInt(300, 2000));
        setTimeout(startRandomGlitching, randomInt(minInterval, maxInterval));
      }
  }, 60000);

    function getVisibleCanvas(){
    var visibles = [];
    for(var i = 0; i < glitchables.length; i++){
      var $canvas = $(glitchables[i].canvas);
      var top = $canvas.offset().top;
      var canvasHeight = $canvas.height();
      if(!glitchables[i].isGlitching && 
        $(window).scrollTop() < top + canvasHeight - 10 && 
        top + 10 < $(window).height() + $(window).scrollTop())
      {
        visibles.push(glitchables[i]);
      }
    }
    return visibles;
  }

  function getRandomVisibleCanvas(_glitchables){
    var _glitchables = _glitchables || glitchables;
    var visibles = getVisibleCanvas(_glitchables);
    var i = randomInt(0, visibles.length - 1);
    return visibles[i];
  }

  function glitchAll(_glitchables){
    for(var i = 0; i < _glitchables.length; i++)
    {
      var currGlitchable = _glitchables[i];
      currGlitchable.glitchIt.call(currGlitchable);
    }
  }

  $(document).keypress(function(e){
    if(e.keyCode == 32)
    {
      // setTimeout(function(){
      //   glitchAll(glitchables);
      // }, randomInt(10, 300));
      e.preventDefault();
    }
  });
  $(document).keyup(function(e){
    if(e.keyCode == 32)
    {
      for(var i = 0; i < glitchables.length; i++)
      {
        glitchables[i].isGlitching = false;
        console.log("glitchables[i]:", glitchables[i]);
          glitchables[i].reset();
        setTimeout(function(){
        }, Math.random()*100 + i*10);
      }
      startRandomGlitching();
      function startRandomGlitching(){
        var thisGlitch = getRandomVisibleCanvas(glitchables);
        thisGlitch.glitchItFor(randomInt(200, 2000));
        setTimeout(startRandomGlitching, randomInt(minInterval, maxInterval));
      }
    }
  })

  /* Glitchable declaration */

  Glitchable.prototype.init = function(){
    var canvas = document.createElement('canvas');
    var width = this.originalImg.width;
    var height = this.originalImg.height;
    canvas.width = width;
    canvas.height = height;
    $(canvas).insertAfter($(this.originalImg).hide());
    ctx = canvas.getContext('2d');
    // draw the img on the canvas 
    this.originalImg.crossOrigin = "*"
    ctx.drawImage(this.originalImg, 0, 0);
    var originalImgClone = new Image();
    originalImgClone.crossOrigin = "*";
    var src = canvas.toDataURL(0, 0, canvas.width, canvas.height);
    originalImgClone.src = src;
    ctx.drawImage(originalImgClone, 0, 0);
    this.originalImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);;
    this.canvas = canvas;
    this.ctx = ctx;
    this.bindEvents();
  };

  Glitchable.prototype.bindEvents = function(){
    var that = this;
    var shouldGlitchOnHover = true;
    if(shouldGlitchOnHover)
    {
      var hoverTimer;
      function glitchThisOne(){
        that.glitchIt();
        hoverTimer = setTimeout(glitchThisOne, Math.random()*200+20)
      }
      that.canvas.onmouseover = glitchThisOne;
      that.canvas.onmouseout = function(){
        clearTimeout(hoverTimer);
        that.reset();
      }
    }
    else
    {
      this.canvas.onmouseover = function() {
        if(that.isGlitching)
        {
          stoppedGlitchCount++;
          if(stoppedGlitchCount > 5)
          {
            alert('Oh, you want to play this game? Let\'s go faster, shall we?');
            stoppedGlitchCount = 0;
            minInterval *= 0.3;
            maxInterval *= 0.3;
          }
        }
        that.reset();
      }
      this.canvas.onmousedown = function() {
        that.glitchItFor(1000);
      }
    }
  };
  
  Glitchable.prototype.reset = function(){
    var that = this;
    clearTimeout(that.glitchTimer);
    that.isGlitching = false;
    setTimeout(function(){
      that.ctx.putImageData(that.originalImgData, 0, 0);
    }, 50);
  };

  Glitchable.prototype.glitchItFor = function(millis){
    var that = this;
    var startingTime = new Date().getTime();
    function glitchInterval(){
      that.glitchIt();
      if(new Date().getTime() - startingTime < millis)
      {
        that.glitchTimer = setTimeout(glitchInterval, Math.random()*200+20);
      }
      else{
        that.reset();
      }
    };
    that.glitchTimer = setTimeout(glitchInterval, Math.random()*200+20);

    // Glitch another one
    var visibleCanvas = getVisibleCanvas();
    if((Math.random() > 0.2 && visibleCanvas.length > 4) || Math.random > 0.8 ){
      setTimeout(function(){
        getRandomVisibleCanvas(visibleCanvas).glitchItFor(randomInt(500, 1500));
      }, randomInt(20, 1000));
    }
  };

  Glitchable.prototype.glitchIt = function(parameters){
    var that = this;
    var parameters = parameters || {
      amount: Math.random()*50,
      seed: Math.random()*100,
      iterations: randomInt(0, 20),
      quality: Math.random()*100
    };
    var that = this;
    that.isGlitching = true;
    glitch(that.originalImgData, parameters, function(img_data) {
      var rdm = Math.random() > 0.4;
      var grayscaleImg = rdm ? img_data : that.grayscale(img_data);
      that.ctx.putImageData(grayscaleImg, 0, 0);
    });
  };
  /* /Glitchable declaration */
  
  // Utils
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  Glitchable.prototype.grayscale = function(pixels, args) {
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