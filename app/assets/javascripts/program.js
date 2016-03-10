$(document).on('turbolinks:load', function(){
  $('#program').on('arrangeComplete', initProgram);
  $(window).on('resize', initProgram);
  function initProgram(){
    var dayElems = $('.day');
    var days = _.map(dayElems, function(elem){
      return $(elem).data('date');
    });
    var minOffset = 0;
    for(var i = 0; i < dayElems.length; i++){
      placeDate(i);
      bindHoverDate(i);
    };

    function placeDate(i){
      var day = days[i];
      var $this = $(dayElems[i]);
      var firstVisibleEvent = $this.nextAll('.grid-item.'+day+':visible').first();
      if(!firstVisibleEvent.length){
        $this.fadeOut();
      }
      else{
        var offset = parseInt(firstVisibleEvent.css('top'));
        $this.fadeIn();
        $this.css({top: offset >= minOffset ? offset : minOffset})
        minOffset = offset + $this.height();
      }
    };

    function bindHoverDate(i){
      var elem = $(dayElems[i]);
      elem.hover(function(){focusDate(i)}, unfocusDate);
      function unfocusDate(i){
        $('.focused').removeClass('focused');
      }
    };
    function focusDate(i){
      console.log(days[i]);
      $('.grid-item:not(.'+days[i]+')').removeClass('focused');
      $('.grid-item.'+days[i]).addClass('focused');
    }

  }
})
