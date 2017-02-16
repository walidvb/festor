(() => {
  $(document).on('touch click', '.hamburger',(e) => {
    $('body').toggleClass('open');
  });

  const $menu = '.drawer-container';
  $(document).on('touch click', '[data-drawer]', (e) => {
    const $this = $(e.currentTarget);
    const drawer = $($this.data('drawer'));
    $($menu).addClass('drawer-open');
    $('.drawer').removeClass('open');
    drawer.addClass('open');
    e.preventDefault();
  });

  const closeDrawer = (e) => {
    $('.drawer').removeClass('open');
    $($menu).removeClass('drawer-open');
  }
  $(document).on('touch click', '.drawer .back', closeDrawer);
  $(document).on('close-drawer', closeDrawer);

  $(document).on('turbolinks:visit', e => $('.full-content').addClass('exit'));
  $(document).on('turbolinks:load', e => $('.exit').removeClass('exit'));
})();
