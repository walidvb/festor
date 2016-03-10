$(document).on('turbolinks:load', function(){
  

$('#program').on('arrangeComplete', function(){
			initProgram();
			console.log('arrangeComplete');
		});
})
function initProgram(){
  console.log('initProgram');
  var dayElems = $('.day');
  var days = _.map(dayElems, function(elem){
    return $(elem).data('date');
  });
  for(var i = 0; i < dayElems.length; i++){
    var day = days[i];
    var offset = $('.grid .'+day).first().css('top');
    console.log(offset);
    $(dayElems[i]).animate({top: offset})
  }
}