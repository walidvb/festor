$(document).on('turbolinks:load', function(){
  var $prog = $('#program');
  if($prog.length)
  {
    $('.filters .artist').click(setArtist);
    function setArtist(e){
      var trg = $(e.target)
      var artist = trg.data('artist');
      if(trg.hasClass('active')){
        $('.filters .artist').removeClass('active');
        $('.post').removeClass('focus');
        return;
      }
      trg.addClass('active');
      $('.post').removeClass('focus');
      $('.post[data-artist*="'+artist+'"]').addClass('focus');
    }

    $('.filters .day').click(setDate);
    function setDate(e){
      var trg = $(e.target).parents('[data-date]');
      if(trg.hasClass('active')){
        $('.filters .day').removeClass('active');
        $('.post').removeClass('focus');
        return;
      }
      trg.addClass('active');
      var date = $(trg).data('date');
      $('.post').removeClass('focus');
      $('.post[data-dates*="'+date+'"]').addClass('focus');
      console.log(date);
    }
  }
})
