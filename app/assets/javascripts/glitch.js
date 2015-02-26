$(document).ready(function(){
  // assuming there's a loaded img and a canvas element in the DOM.
  var myGlitches = document.getElementsByTagName('img');
  for(var i = 0; i < myGlitches.length; i++){
    var currentGlitch = myGlitches[i];
    if(currentGlitch.nodeName == "IMG"){
      currentGlitch.onload = function(){
        var originalImg = new Image();
        originalImg.src = this.src;
        originalImg.crossOrigin = "*"
        console.log("originalImg.src:", originalImg.src);
        var canvas = document.createElement('canvas');
        var width = originalImg.width;
        var height = originalImg.height;
        canvas.width = width;
        canvas.height = height;
        $(this).replaceWith(canvas);
        var ctx = canvas.getContext('2d');
        // draw the img on the canvas 
        ctx.drawImage(originalImg, 0, 0);
        glitchOnHover(originalImg, canvas, ctx);
      }
    }
    else if(currentGlitch.nodeName == 'A')
    {
      var elem = currentGlitch;
      var html = elem.outerHTML;
      rasterizeHTML.drawHTML( html );
    }
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function glitchOnHover(originalImg, canvas, ctx){
    var my_img_data = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
    var glitchInterval = null;
    function drawOriginalImage() {
      clearInterval(glitchInterval);
      ctx.putImageData(my_img_data, 0, 0);
    }

    function drawGlitchedImageData(img_data) {
      var rdm = Math.random() > 0.4;
      grayscaleImg = rdm ? img_data : grayscale(img_data);
      ctx.putImageData(grayscaleImg, 0, 0);
    }
    canvas.onmouseout = drawOriginalImage;
    canvas.onmouseover = function(){
      glitchInterval = setInterval(glitchIt, 200);
    };
    function glitchIt(){
      var parameters = {
        amount: Math.random()*100,
        seed: Math.random()*100,
        iterations: randomInt(0, 70),
        quality: Math.random()*100
      };
      glitch(my_img_data, parameters, drawGlitchedImageData);
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
}
});