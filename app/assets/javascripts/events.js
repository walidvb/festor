(function($){

  $(document, '.close').click(function(e){
    if($(e.target).hasClass('close')){
      $('.load-more-container').hide();
      $('#main-content').show();
      $('.close').hide();
    }
  });

  $(document, '[data-load-more]').on('click', function(e){
    var $this = $(e.target).parent('[data-load-more]');
    var url = $this.data('load-more') || $(e.target).data('load-more');
    if(url != undefined){
      e.preventDefault();
      $.ajax({
        url: url,
        success: function(data){
          var container = $('.load-more-container');
          $('#main-content').hide();
          container.html($(data).find('#main-content')).show();
          appendNavTo($this, container);
        }
      })
    };
  });

  function appendNavTo(siblingOf, container){
    // var prevUrl = siblingOf.prev('[data-load-more]').data('load-more');
    // var nextUrl = siblingOf.next('[data-load-more]').data('load-more');

    var nav = $('<div class="nav"/>');
    // if(prevUrl){
    //   $('<a class="prev" data-load-more="' + prevUrl + '" href="' + prevUrl + '"/>').appendTo(nav);
    // }
    $('<div class="close"/>').prependTo(nav);
    // if(nextUrl){
    //   $('<a class="next" data-load-more="' + nextUrl + '" href="' + nextUrl + '"/>').appendTo(nav);
    // }
    nav.prependTo(container).show();
  }
})(jQuery);
