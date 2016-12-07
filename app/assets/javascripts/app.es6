$(document).on('turbolinks:load', () => {
  const $prog = $('#program');
  if($prog.length)
  {
    bindScrollToPerspective();
    const filters = $('.filters [data-target]')
    filters.click((e) => {
      const clicked = $(e.currentTarget),
       targetType = clicked.data('type'),
       targetCat = clicked.data('target');
       console.log(clicked);
      const selector = `[data-${targetType}*="${targetCat}"]`;
      filters.removeClass('active');
      clicked.addClass('active');
      const toTheBack = $(`.post:not(${selector})`);
      const toTheFront = $(`.post${selector}`);
      toTheBack.map((i, elem) => sendTo(elem, -(Math.floor(Math.random() * 50) + 100)));
      toTheFront.map((i, elem) => sendTo(elem, Math.floor(Math.random() * 10)));
    });
    const sendTo = (elem, zPos) => {
      const oldTransform = $(elem).data('transform');
      const transform = `${oldTransform} translateZ(${zPos}px)`;
      let opacity, zIndex, filter;
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
    function bindScrollToPerspective(){
      let totalHeight = $(document).height() - $(window).height();
      const persp = $('<div>perspective origin</div>').appendTo($prog).css({
        position: 'absolute',
        left: 0,
        right: 0,
        borderBottom: 'solid 1px blueviolet',
        opacity: 0.3,
        color: 'blueviolet',
        textAlign: 'right',
      });
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

        console.log(scrollRatio);
        $prog.css({perspectiveOrigin});
        persp.css({top: Math.min(originY, totalHeight)});
      });
    };
  }

});
