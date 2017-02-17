$(document).on('turbolinks:load', function(){
  function sync(a, b){
    $(a).on('scroll', function () {
      if(!$(b).is(':hover')){
        $(b).scrollTop($(this).scrollTop());
      }
    });
  }
  var ev = $('.events'), leg = $('.legend');
  sync(ev, leg);
  sync(leg, ev);
});
