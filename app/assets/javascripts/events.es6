(() => {

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

  $(window).on('scroll.handleTranslateZonEnter', debounce(handleTranslateZonEnter, 20, true));
  $(document).on('turbolinks:render', handleTranslateZonEnter);
  function handleTranslateZonEnter(e){
    const $artistContainer = $('.artists'),
      $artists = $('.artist-single');
    if($artistContainer.length){
      if(window.scrollY+window.innerHeight - 10 > $artistContainer.position().top  ){
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
