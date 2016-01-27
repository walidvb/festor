(function($){
  $(document).on('ready page:load', function(){
    body = $('body').imagesLoaded(function(){
      $('.show-desc img, .bio img').each(function(i){
        var dir = i%2 ? 'right' : 'left';
        dir += ($(this).width() < $('.show-desc, .bio').width()*0.5 ? ' small' : ' large');
        $(this).addClass(dir);
      });
    });
  });

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
          $(document).trigger('page:load');
        }
      })
    };
  });

  function appendNavTo(siblingOf, container){
    var nav = $('<div class="nav"/>');
    $('<div class="close"/>').prependTo(nav);
    nav.prependTo(container).show();
  }
})(jQuery);
