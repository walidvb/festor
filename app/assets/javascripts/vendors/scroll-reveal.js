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
        if(shouldShow($this)){
          $this.addClass(options.activeClass);
        }
        else {
          $this.removeClass(options.activeClass)
        }
      });
    }
    function shouldShow(elem){
      var distTop = (offsetTop(elem) + elem.height()/2) - getTop();
      var distCenter = $(that).height()/2 - distTop;
      return Math.abs(distCenter) <= elem.height()/2;
    }

  }
})(jQuery, window);
