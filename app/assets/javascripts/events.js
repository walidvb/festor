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
        $('#main-content').removeClass('leaving');
      }, 2000);
      $('.close').hide();
    }
  });

  $(document, '[data-load-more]').on('click', function(e){
    $('[data-load-more]').removeClass('active');
    var $this = $(e.target).parent('[data-load-more]');
    $this.addClass('active');
    var url = $this.data('load-more') || $(e.target).data('load-more');
    if(url != undefined){
      e.preventDefault();
      moreContainer.addClass('leaving');
      main.addClass('leaving');
      var transitionFinished = false;
      main.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', replaceContent);
      var replaceContent = function(){
        transitionFinished  = true;
        debugger;
      }
      $.ajax({
        url: url,
        success: function(data){
<<<<<<< HEAD
          var container = $('.load-more-container');
          $('#main-content').hide();
          container.html($(data).find('#main-content')).show();
          appendNavTo($this, container);
          $(document).trigger('page:load');
=======
          raeplaceContent = function(){
            var new_ = $(data).find('#main-content').html();
            moreContainer.html(new_);
            appendNavTo($this, moreContainer);
            moreContainer.addClass('leaving');
            setTimeout(function(){
              moreContainer.removeClass('leaving');
            }, 1000);
          };
          if(transitionFinished){
            replaceContent();
          }
>>>>>>> wip: adds transition
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
