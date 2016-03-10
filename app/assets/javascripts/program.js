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
      for(var i = 0; i < dayElems.length; i++){
        placeDate(i);
        bindHoverDate(i);
      };

      function placeDate(i){
        var day = days[i];
        var $this = $(dayElems[i]);
        var dayContainer = $('#events-for-'+day);
        if(!dayContainer.length){
          $this.fadeOut();
        }
        else{
          var offset = dayContainer.position().top + parseInt(dayContainer.css('margin-top'));
          $this.fadeIn();
          $this.css({top: offset})
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
