(function($, window){
  $.fn.scrollReveal = function(options_){
    var that = this;
    var $that = $(that);
    var offsetTop, getTop;

    var options = $.extend({
      maxDistanceToCenter: window.innerHeight*0.3,
      itemSelector: '.grid-item',
      activeClass: 'sr-active',
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

    var onScroll = debounce(function(){
      elems.each(function(){
        var $this = $(this);

        var centerRel = window.scrollY + window.innerHeight/2;
        var itemCenterRel = offsetTop($this) + $this.height()/2;
        var distCenter = centerRel - itemCenterRel;
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
        var thresholdFromCenter = ($this.height() / 2) * 0.45;
        Math.abs(distCenter) <= thresholdFromCenter ? addActive() :
        addTopOrBottom(distCenter > 0);
      });
    }, 10, false);

    if(window.hasOwnProperty('ontouchstart'))
    {
      $(that).css('overflow-y', 'hidden');
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

  }
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
})(jQuery, window);
