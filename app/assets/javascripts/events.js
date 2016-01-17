$(document, '.close').click(function(e){
  $('.load-more-container').hide();
  $('#main-content').show();
  $('.close').hide();
});

$(document, '[data-load-more]').on('click', function(e){
  var $this = $(e.target).parent('[data-load-more]');
  console.log($this);
  if($this.length){
    console.log('getting ', $this.data('load-more'));
    e.preventDefault();
    $.ajax({
      url: $this.data('load-more'),
      success: function(data){
        var container = $('.load-more-container');
        $('#main-content').hide();
        container.html($(data).find('#main-content')).show();
        $('<div class="close"/>').prependTo(container).show();
      }
    })
  };
});
