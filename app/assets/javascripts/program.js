$(document).on('turbolinks:load', function(){
  $('#program').on('arrangeComplete', initProgram);
})
$(window).on('resize', initProgram);
function initProgram(){
  var dayElems = $('.day');
  var days = _.map(dayElems, function(elem){
    return $(elem).data('date');
  });
  var minOffset = 0;
  for(var i = 0; i < dayElems.length; i++){
    var day = days[i];
    var $this = $(dayElems[i]);
    var offset = parseInt($('.grid .'+day+':visible').first().css('top'));
    if(typeof(offset) != "number"){
      $this.fadeOut();
    }
    else{
      $this.fadeIn();
    }
    $this.animate({top: offset >= minOffset ? offset : minOffset})
    minOffset += offset + $this.height();
  }
}
