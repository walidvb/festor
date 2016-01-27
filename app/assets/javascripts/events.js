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

  var moreContainer, main;
  $(document).ready(function(){
    moreContainer = $('.load-more-container');
    main = $('#main-content');
  });

  $(document, '.close').click(function(e){
    if($(e.target).hasClass('close')){
      moreContainer.addClass('leaving');
      setTimeout(function(){
        moreContainer.fadeOut('300', function(){
          main.addClass('leaving').fadeIn('300', function(){
            main.removeClass('leaving')
          })
        })
      }, 2000);
      $('.close').hide();
    }
  });
  $(document, '[data-load-more]').on('click', function(e){
    $('[data-load-more]').removeClass('active');
    var $this = $(e.target).parent('[data-load-more]');
    $this.addClass('active');
    var url = $this.data('load-more') || $(e.target).data('load-more');
    var transitionFinished = false;
    if(url != undefined){
      e.preventDefault();
      main.add(moreContainer).addClass('leaving');
      $.ajax({
        url: url,
        success: function(data){
          moreContainer.fadeOut('300',function(){
            main.add(moreContainer).removeClass('leaving');
            var new_ = $(data).find('#main-content').html();
            moreContainer.add(main).hide();
            moreContainer.html(new_);
            appendNavTo($this, moreContainer);
            moreContainer.addClass('leaving').hide().fadeIn(function(){
              moreContainer.add(main).removeClass('leaving');
            });
            $(document).trigger('page:load');
          });
        }
      });
    };
  });

  function appendNavTo(siblingOf, container){
    var nav = $('<div class="nav"/>');
    nav.html('back');
    nav.prependTo(container).show();
  }
})(jQuery);
