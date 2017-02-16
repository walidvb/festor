(() => {
  $(document).on('touch click', '.hamburger',(e) => {
    $('body').toggleClass('open');
  });

  const $menu = '.drawer-container';
  $(document).on('touch click', '[data-drawer]', (e) => {
    const $this = $(e.currentTarget);
    const directLink = $this.data('direct-link');
    const href = e.currentTarget.href;
    const drawer = $($this.data('drawer'));
    openDrawer();
    function openDrawer(){
      $($menu).addClass('drawer-open');
      $('.drawer').removeClass('open');
      drawer.addClass('open');
      console.log($this);
    }
    e.preventDefault();
    // if program, trigger the visit anyways
    if(href != window.location && directLink){
      setTimeout( () => Turbolinks.visit(href), 0);
    }
  });

  const closeDrawer = (e) => {
    $('.drawer').removeClass('open');
    $($menu).removeClass('drawer-open');
    console.log('closing drawer', e);
  }
  $(document).on('touch click', '.drawer .back', closeDrawer);
  $(document).on('close-drawer', () => {
    console.log('close-drawer');
    closeDrawer();
  });

  $(document).on('turbolinks:before-visit', e => $('.full-content').addClass('exit'));
  $(document).on('turbolinks:load', e => $('.exit').removeClass('exit'));
})();
