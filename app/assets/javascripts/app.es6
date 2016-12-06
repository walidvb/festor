;
$(document).on('turbolinks:load', () => {
  const $prog = $('#program');
  if($prog.length)
  {
    $('.filters li').click((e) => {
      const clicked = $(e.target),
       targetType = clicked.data('type'),
       targetCat = clicked.data('target');
      const selector = `[data-${targetType}="${targetCat}"]`;

      const toTheBack = $(`.post:not(${selector})`);
      const toTheFront = $(`.post${selector}`);
      toTheBack.map((i, elem) => sendTo(elem, -Math.floor(Math.random() * 300) + 50));
      toTheFront.map((i, elem) => sendTo(elem, Math.floor(Math.random() * 50) + 50));

    });
    const sendTo = (elem, zPos) => {
      const oldTransform = $(elem).data('transform');
      const newTransform = `${oldTransform} perspective(500px) translateZ(${zPos}rem)`
      console.log(elem, newTransform);
      $(elem).css('transform', newTransform);
    }
  }
});
