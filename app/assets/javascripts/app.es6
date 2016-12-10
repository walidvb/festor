$(document).on('turbolinks:load', () => {
  const $prog = $('#program');
  if($prog.length)
  {
    // ZIndexing
    const maxZ = 0,
      maxZDelta = 10,
      minZ = 100,
      minZDelta = 10;
    bindScrollToPerspective();

    window.organizeBy = organizeBy;
    function organizeBy(options){
      const { category, type} = options;
      const selector = `[data-${type}*="${category}"]`;
      const toTheBack = $(`.post:not(${selector})`);
      const toTheFront = $(`.post${selector}`);
      toTheBack.map((i, elem) => sendTo(elem, -(Math.floor(Math.random() * minZDelta) + minZ)));
      toTheFront.map((i, elem) => sendTo(elem, Math.floor(Math.random() * maxZDelta)));

      $(`[data-${type}]`).removeClass('active');
      $(`[data-${type}=${category}]`).addClass('active');

    }

    function sendTo(elem, zPos){
      const oldTransform = $(elem).data('transform');
      const transform = `${oldTransform} translateZ(${zPos}px)`;
      let opacity, zIndex, filter;
      console.log(transform);
      if(zPos >= 0){
        filter = "blur(0px)";
        zIndex = 1000;
        $(elem).addClass('focus');
      }
      else{
        filter = "blur(10px)";
        zIndex = 5;
        $(elem).removeClass('focus');
      }
      $(elem).css({
        transform,
        //filter,
        zIndex,
      });
    }

    function setupDateTickers(){
      var tickers = $('.day-ticker');
      for (var i = 0; i < tickers.length; i++) {
        sendTo(tickers[i], maxZ+maxZDelta+1);
        console.log(tickers[i], maxZ+maxZDelta+1);
      }
    }
    // Scrolling
    function bindScrollToPerspective(){
      let totalHeight = $(document).height() - $(window).height();
      // const persp = $('<div>perspective origin</div>').appendTo($prog).css({
      //   position: 'absolute',
      //   left: 0,
      //   right: 0,
      //   borderBottom: 'solid 1px blueviolet',
      //   opacity: 0.3,
      //   color: 'blueviolet',
      //   textAlign: 'right',
      // });
      const scrollable = $('body');
      scrollable.on('scroll', () => {

        const scrollTop = scrollable.scrollTop();
        const scrollRatio = scrollable.scrollTop()/totalHeight;
        // center to screen
        let originY = (1 - scrollTop/totalHeight)*50 + 25;
        let perspectiveOrigin = `50% ${originY}vh`;

        // move with the element
        originY = scrollTop + $(window).height()*(scrollRatio);
        perspectiveOrigin = `50% ${originY}px`;

        $prog.css({perspectiveOrigin});
        //persp.css({top: Math.min(originY, totalHeight)});
      });
    };

    // init
    // setupDateTickers();
    organizeBy({type: 'category', category: 'event'});
  }

});
