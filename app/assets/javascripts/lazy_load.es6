$(document).on('ready turbolinks:load', () => {
  $('[data-lazy-load]').each((i, elem) => {
    const img = new Image();
    const $this = $(elem);
    img.src = $this.data('lazy-load');
    img.srcset = $this.data('srcset');
    img.onload = function(){
      elem.src = img.src;
    };
  });
});
