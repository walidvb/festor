$(document).on('turbolinks:load', () =>{
  console.log('asd');
  $('.hamburger').on('touch click', () => $('body').toggleClass('open'))
});
