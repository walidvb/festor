$(document).on('turbolinks:load', function(){
  var $prog = $('#program');
  if($prog.length)
  {
    $prog.on('arrangeComplete', initProgram);
    $(window).on('resize', initProgram);
    function initProgram(e){
      var dayElems = $('.day');
      var days = _.map(dayElems, function(elem){
        return $(elem).data('date');
      });
      var closestDateIndex = getClosestDate(days);
      function getClosestDate(days){
        var today = new Date();
        var candidate;
        for(var i = 0; i < days.length; i++){
          var d = days[i];
          var that = new Date(d);
          candidate = that;
          if(candidate >= today){
            return i;
          }
        }
      };

      $('#dates').on('change', function(){
        $('#program').toggleClass('dates-only', $('#dates').is(':checked'));
        $('#date-dropdown-trigger .dropdown').toggleClass('dropdown-active', $('#dates').is(':checked'));
      });
      function showDate(i){
        $(dayElems).removeClass('active');
        $(dayElems[i]).addClass('active');
        $('#dates').prop('checked', false);
        $('#program').removeClass('dates-only');
        $('#program .events-list#events-for-'+days[i]).addClass('active');
      }
      function bindClick(i){
        var $this = $(dayElems[i]);
        $this.on('click', function(){
          var date = $(this).data('date');
          var trg = $('#events-for-'+date);
          if(window.innerWidth < 767){
            setTimeout(scroll, 400);
          }else{
            scroll();//!
          }
          function scroll(){
            $('html, body').stop().animate({
              scrollTop: trg.offset().top-$this.find('h2').outerHeight()-14,
            }, 300);
          };
          showDate(i);
        });
      };

      // placements
      for(var i = 0; i < dayElems.length; i++){
        bindClick(i);
        if(!$(dayElems[i]).hasClass('show-xs')){
          placeDate(i);
        }
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
          var offset = dayContainer.offset().top + parseInt(dayContainer.css('margin-top'));
          offset = dayContainer.height()+ parseInt(dayContainer.css('margin-bottom'));
          $this.fadeIn();
          $this.css({
            height: offset,
            maxHeight: offset
          })
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
