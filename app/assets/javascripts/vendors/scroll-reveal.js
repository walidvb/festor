(function($, window){
  $.fn.scrollReveal = function(options){
    $(this).mCustomScrollbar();
    var options = {
      maxDistanceToCenter: window.innerHeight*0.15,
      itemSelector: '.scroll-item',
      activeClass: 'sr-active',
      shouldShow: shouldShow,
      touchOnly: true,
    };
    var elems = $(options.itemSelector);
    $(window).on('scroll', function(){
      elems.each(function(){
        var $this = $(this);
        if(shouldShow($this)){
          $this.addClass(options.activeClass);
        }
        else {
          $this.removeClass(options.activeClass)
        }
      });
    });

    function shouldShow(elem){
      var distTop = (elem.offset().top + elem.height()/2) - $(window).scrollTop();
      var distCenter = $(window).height()/2 - distTop;
      return Math.abs(distCenter) <= elem.height()/2;
    }
  }
})(jQuery, window);
