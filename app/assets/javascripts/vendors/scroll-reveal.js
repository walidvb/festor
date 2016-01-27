(function($, window){
  $.fn.scrollReveal = function(options_){
    var that = this;
    console.log(that);
    var offsetTop, getTop;
    var options = $.extend({
      maxDistanceToCenter: window.innerHeight*0.15,
      itemSelector: '.grid-item',
      activeClass: 'sr-active',
      shouldShow: shouldShow,
      touchOnly: true,
      mCustomScrollbar: {
        autoHideScrollbar: true,
        callbacks: {
          whileScrolling: function(){
            var that = this;
            getTop = function(){
              return -that.mcs.top;
            };
            offsetTop = function(elem){
              return elem.offset().top + getTop();
            };
            onScroll();
          }
        }
      }
    }, options_);

    var elems = $(options.itemSelector);
    if(!elems.length) return;
    if(window.hasOwnProperty('ontouchstart'))
    {
      $(that).css('overflow', 'hidden');
      $(that).mCustomScrollbar(options.mCustomScrollbar);

    }
    else{
      getTop = function(){
        return $(window).scrollTop();
      };
      offsetTop = function(elem){
        return elem.offset().top;
      }
      $(window).on('scroll', onScroll);
    }

    function onScroll(){
      elems.each(function(){
        var $this = $(this);

        var distTop = (offsetTop($this) + $this.height()/2) - getTop();
        var distCenter = $(that).height()/2 - distTop;

        function addActive(){
          $this.addClass('sr-middle')
          $this.removeClass('sr-top sr-bottom');
        }
        function addTopOrBottom(top){
          $this.removeClass('sr-middle')
          if(top){
            $this.addClass('sr-top');
          }
          else{
            $this.addClass('sr-bottom');
          }
        }
        Math.abs(distCenter) <= $this.height()/2 ? addActive() :
          addTopOrBottom(distCenter > 0);

      });
    }
    function shouldShow(elem){
    }

  }
})(jQuery, window);
