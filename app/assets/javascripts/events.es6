(function(){

  var moreContainer, main, html, nav;
  $(document).on('turbolinks:load', function(){
    nav = $('#back');
    html = $('body').imagesLoaded(wrapImages);

    function wrapImages(){
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
    };

    moreContainer = $('.load-more-container');
    main = $('#main-content');
    html = $('html');
    nav = $('#back');

  });
  $(document, '.nav.back').click(function(e){
    if($(e.target).hasClass('back')){
      moreContainer.addClass('leaving');
      html.addClass('transitionning');
      setTimeout(function(){
        moreContainer.fadeOut('300', function(){
          main.addClass('leaving').fadeIn('300', function(){
            html.removeClass('transitionning');
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
      html.addClass('transitionning');
      main.add(moreContainer).addClass('leaving');
      $.ajax({
        url: url,
        success: function(data){
          moreContainer.fadeOut('300',function(){
            main.add(moreContainer).removeClass('leaving');
            html.removeClass('transitionning');
            var new_ = $(data).find('#main-content').html();
            moreContainer.add(main).hide();
            moreContainer.html(new_);
            nav.css('display', 'inline-block');
            html.addClass('transitionning');
            moreContainer.addClass('leaving').hide().fadeIn(function(){
              moreContainer.add(main).removeClass('leaving');
              html.removeClass('transitionning');
            });
            $(document).trigger('turbolinks:load');
          });
        }
      });
    };
  });

  $(window).on('scroll.handleTranslateZonEnter', debounce(handleTranslateZonEnter, 50, false));
  function handleTranslateZonEnter(e){
    const $artistContainer = $('.artists'),
      $artists = $('.artist-single');
    if($artistContainer.length){
      if(window.scrollY+window.innerHeight-250 > $artistContainer.offset().top  ){
        $artists.each((i, elem) => {
          const translateZ = $(elem).data('translateZ') || Math.floor(Math.random()*50) + 5;
          $(elem).data('translateZ', translateZ);
          $(elem).css({
            transform: `translateZ(-${translateZ}px)`,
            opacity: 1,
          });
        });
      }
    }
  }
})();
