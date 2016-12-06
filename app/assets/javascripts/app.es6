;
$(document).on('turbolinks:load', () => {
  const $prog = $('#program');
  if($prog.length)
  {
    $('[data-target]').click((e) => {
      const clicked = $(e.currentTarget),
       targetType = clicked.data('type'),
       targetCat = clicked.data('target');
       console.log(clicked);
      const selector = `[data-${targetType}*="${targetCat}"]`;

      const toTheBack = $(`.post:not(${selector})`);
      const toTheFront = $(`.post${selector}`);
      toTheBack.map((i, elem) => sendTo(elem, -(Math.floor(Math.random() * 30) + 300)));
      toTheFront.map((i, elem) => sendTo(elem, Math.floor(Math.random() * 5)));
      console.log(selector);
    });
    const sendTo = (elem, zPos) => {
      const oldTransform = $(elem).data('transform');
      const transform = `${oldTransform} translateZ(${zPos}px)`;
      let opacity, zIndex;
      if(zPos >= 0){
        opacity = .9;
        zIndex = 1000
        $(elem).addClass('focus');
      }
      else{
        opacity = .3;
        zIndex = 5;
        $(elem).removeClass('focus');
      }
      $(elem).css({
        transform,
        opacity,
        zIndex,
      });
    }
  }
});
