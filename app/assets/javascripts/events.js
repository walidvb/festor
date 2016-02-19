$(document).on('ready turbolinks:load', function(){
  var nav = $('#back');
  $(document).on('ready turbolinks:load', function(){
    body = $('body').imagesLoaded(function(){
      $('.show-desc img, .bio img').each(function(i){
        var $this = $(this);
        if(!$this.data('wrapped')){
          var dir = i%2 ? 'right pull-right' : 'left';
          dir += ($this.width() < $('.show-desc, .bio').width()*0.5 ? ' small' : ' large');
          var wrapper = $('<div class="wrapper"/>');
          $this.wrap(wrapper).data('wrapped', true);
          $this.parents('.wrapper').addClass('col-sm-2 col-xs-5 ' + dir);
        }
      });
    });

  });

  var moreContainer, main, body;
  $(document).on('ready turbolinks:load', function(){
    moreContainer = $('.load-more-container');
    main = $('#main-content');
    body = $('body');
    nav = $('#back');
  });

  $(document, '.nav.back').click(function(e){
    if($(e.target).hasClass('back')){
      moreContainer.addClass('leaving');
      body.addClass('transitionning');
      setTimeout(function(){
        moreContainer.fadeOut('300', function(){
          main.addClass('leaving').fadeIn('300', function(){
            body.removeClass('transitionning');
            main.removeClass('leaving');
            $('[data-load-more]').removeClass('active');
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
      body.addClass('transitionning');
      main.add(moreContainer).addClass('leaving');
      $.ajax({
        url: url,
        success: function(data){
          moreContainer.fadeOut('300',function(){
            main.add(moreContainer).removeClass('leaving');
            body.removeClass('transitionning');
            var new_ = $(data).find('#main-content').html();
            moreContainer.add(main).hide();
            moreContainer.html(new_);
            nav.css('display', 'inline-block');
            body.addClass('transitionning');
            moreContainer.addClass('leaving').hide().fadeIn(function(){
              moreContainer.add(main).removeClass('leaving');
              body.removeClass('transitionning');
            });
            $(document).trigger('page:load');
          });
        }
      });
    };
  });

});
