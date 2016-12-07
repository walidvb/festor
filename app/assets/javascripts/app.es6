$(document).on('turbolinks:load', () => {
  const $prog = $('#program');
  if($prog.length)
  {
    bindScrollToPerspective();
    $('[data-target]').click((e) => {
      const clicked = $(e.currentTarget),
       targetType = clicked.data('type'),
       targetCat = clicked.data('target');
       console.log(clicked);
      const selector = `[data-${targetType}*="${targetCat}"]`;

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
        //filter = "blur(0px)";
        zIndex = 1000;
        $(elem).addClass('focus');
      }
      else{
        //filter = "blur(15px)";
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
      const scrollable = $('body');
      scrollable.on('scroll', () => {

        const scrollTop = scrollable.scrollTop();
        // center to screen
        let originY = (1 - scrollTop/totalHeight)*50 + 25;
        let perspectiveOrigin = `50% ${originY}vh`;

        // move with the element
        originY = scrollTop + $(window).height()*.25;
        perspectiveOrigin = `50% ${originY}px`;
        console.log(perspectiveOrigin);
        $prog.css({perspectiveOrigin});
      });
    };
  }

});
