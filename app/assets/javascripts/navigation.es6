$(document).on('turbolinks:load ready', () =>{
  $('.hamburger').on('touch click', () => $('body').toggleClass('open'));

  const $menu = $('.drawer-container');
  $('[data-drawer]').on('touch click', (e) => {
    const $this = $(e.currentTarget);
    const drawer = $($this.data('drawer'));
    $menu.addClass('drawer-open');
    $('.drawer').removeClass('open');
    drawer.addClass('open');
    e.preventDefault();
  });
  $('.drawer .back').on('touch click', (e) => {
    $('.drawer').removeClass('open');
    $menu.removeClass('drawer-open');
  })
});
