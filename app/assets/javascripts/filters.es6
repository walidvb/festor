$(document).on('turbolinks:load', () => {
  const filters = $('.filters [data-target]');
  filters.click((e) => {
    const clicked = $(e.currentTarget),
     type = clicked.data('type'),
     category = clicked.data('target');
     organizeBy({
       type,
       category
     })
  });
  const filtersToolbar = $('.filters-toolbar');
  let isDragging = false;

  $('.draggable').draggabilly().on( 'dragStart', () => {
    isDragging = true
  }).on( 'pointerUp', () => setTimeout(() => {
    isDragging = false;

  }, 100))
  filtersToolbar.on('click', () => {
    if(!isDragging){ $('.filters-content').toggleClass('closed') }
  })
});
