(() => {
    $(document).on('click', 'a[data-url]', (event) => {
      const videoContainer = $('.videos-container iframe');
      event.preventDefault();
      const $this = $(event.currentTarget);
      const url = `https://youtube.com/embed/${$this.data('url')}`;
      videoContainer.attr('src', url);
      $('a[data-url]').removeClass('active');
      $this.addClass('active');
    });
})();
  