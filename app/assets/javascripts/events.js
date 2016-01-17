$(document, '[data-load-more]').on('click', function(e){

  var $this = $(e.target).parent('[data-load-more]');
  if($this){
    e.preventDefault();
    $.ajax({
      url: $this.data('load-more'),
      success: function(data){
        debugger;
        $('#main-content').hide();
        $('.load-more-container').append($(data).find('#main-content'));
      }
    })
  };
});
