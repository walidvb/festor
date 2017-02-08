$(document).on('turbolinks:load', () =>{
  console.log('asd');
  $('.hamburger').click( () => $('body').toggleClass('open'))
});
