$(document).ready(function(){
  var target = $('#banner');
  $('#banner').mousemove(function(e){
    var $this = $(this);
    var totalHeight = $this.height()/2;
    var yRatio = (event.clientY - totalHeight) / totalHeight;
    var yDiffToMiddle = event.clientY - totalHeight;
    var dist = map(yDiffToMiddle, -0.5, 0.5, -totalHeight, totalHeight);

    var totalWidth = $this.width()/2;
    var xRatio = (event.clientX - totalWidth) / totalWidth;
    var xDiffToMiddle = event.clientX - totalWidth;
    dist = map(xDiffToMiddle, -0.3, 0.3, 0, totalWidth);

    target.css({
      'text-shadow': dist + 'em 0 0px black, '+dist*2+'em 0 0px black'
    });
    console.log(dist + 'em 0 0px black, '+dist*2+'em 0 0px black');
  }).mouseleave(function(){
    $(this).attr('style', '');
  });

  function map(value, minTo, maxTo, minFrom, maxFrom){
    return minTo + (maxTo - minTo) * ((value - minFrom) / (maxFrom - minFrom));
  }
});
