$(document).ready(function(){
  var target = $('#banner');
  target.mousemove(function(e){
    var $this = $(this);
    var yInDiv = event.clientY - this.offsetTop;
    var totalHeight = $this.height()/2;
    var yRatio = (yInDiv - totalHeight) / totalHeight;
    var yDiffToMiddle = yInDiv - totalHeight;
    var dist = map(yDiffToMiddle, -0.5, 0.5, -totalHeight, totalHeight);

    var xInDiv = event.clientX - this.offsetLeft;
    var totalWidth = $this.width()/2;
    var xDiffToMiddle = xInDiv - (totalWidth);
    xDiffToMiddle += $('.logo').width()/2*(xDiffToMiddle > 0 ? -1 : 1);
    dist = map(-xDiffToMiddle, -0.5, 0.5, -totalWidth, totalWidth);
    $this.toggleClass('shadow-opposite', (dist < 0));
    console.log(xInDiv, '. ', xDiffToMiddle, 'dist: ', dist);
    target.css({
      'text-shadow': dist + 'em 0 0px black, '+dist*2+'em 0 0px black'
    });
  }).mouseleave(function(){
    $(this).attr('style', '');
  });

  function map(value, minTo, maxTo, minFrom, maxFrom){
    return minTo + (maxTo - minTo) * ((value - minFrom) / (maxFrom - minFrom));
  }
});
