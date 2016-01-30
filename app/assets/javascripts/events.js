(function($){
  var nav = $('<span style="display: inline-block; cursor: pointer;" class="nav back">back</span>');
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
    nav.appendTo($('.related')).hide();
  });

  $(document, '.nav.back').click(function(e){
    if($(e.target).hasClass('back')){
      moreContainer.addClass('leaving');
      $('[data-load-more]').removeClass('active');
      nav.fadeOut('100', function(){nav.remove()});
      setTimeout(function(){
        moreContainer.fadeOut('300', function(){
          main.addClass('leaving').fadeIn('300', function(){
            main.removeClass('leaving')
          })
        })
      }, 300);
      nav.hide();
    }
  });
  $(document, '[data-load-more]').on('click', function(e){
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
            nav.css('display', 'inline-block');
            moreContainer.addClass('leaving').hide().fadeIn(function(){
              moreContainer.add(main).removeClass('leaving');
            });
            $(document).trigger('page:load');
          });
        }
      });
    };
  });

})(jQuery);
