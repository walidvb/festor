(() => {
  $(document).on('touch click', '.hamburger', () => $('body').toggleClass('open'));

  const $menu = '.drawer-container';
  $(document).on('touch click', '[data-drawer]', (e) => {
    const $this = $(e.currentTarget);
    const drawer = $($this.data('drawer'));
    $($menu).addClass('drawer-open');
    $('.drawer').removeClass('open');
    drawer.addClass('open');
    e.preventDefault();
  });
  $(document).on('touch click', '.drawer .back', (e) => {
    $('.drawer').removeClass('open');
    $($menu).removeClass('drawer-open');
  })
})();
