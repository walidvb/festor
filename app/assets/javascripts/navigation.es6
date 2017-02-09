$(document).on('turbolinks:load ready', () =>{
  console.log('asd');
  $('.hamburger').on('touch click', () => $('body').toggleClass('open'));
});
