$(document).on('ready turbolinks:load', () => {
  $('[data-lazy-load]').each((i, elem) => {
    const img = new Image();
    const $this = $(elem);
    img.src = $this.data('lazy-load');
    img.onload = function(){
    	elem.srcset = $this.data('srcset');
      elem.src = img.src;
    };
  });
});
