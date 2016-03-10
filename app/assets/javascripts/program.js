$(document).on('turbolinks:load', function(){
  var $prog = $('#program');
  if($prog.length)
  {
    $prog.on('arrangeComplete', initProgram);
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
          minOffset = offset + $this.find('h2').outerHeight();
        }
      };

      function bindHoverDate(i){
        var elems = $('.'+days[i]);
        elems.hover(function(){focusDate(i)}, unfocusDate);
        function unfocusDate(i){
          $('.focused').removeClass('focused');
        }
      };
      function focusDate(i){
        console.log(days[i]);
        $(':not(.'+days[i]+')').removeClass('focused');
        $('.'+days[i]).addClass('focused');
      }
    }
  }
})
