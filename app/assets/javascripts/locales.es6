$(document).on('click', '.locales a[data-lang]', (e) => {
  e.preventDefault();
  console.log(e.target);
  const lang = $(e.target).data('lang');
  const href = $(`link[hreflang="${lang}"]`).attr('href');
  window.location = href;
});
