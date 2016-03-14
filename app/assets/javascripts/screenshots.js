;$(document).ready(function(){
  if(localStorage.screenshotID == undefined)
  {
    setTimeout(submitScreenshot, 3000);
  }

  $(document).on('click', '#screenshot .submit', postName);
  function postName(e){
    submitScreenshot();
    e.preventDefault();
  };


  // screenshot page
  var seen = [];
  var mine = $('.screenshot[data-id='+localStorage.screenshotID+']');
  if(mine.length){
    mine.addClass('focused');
    mine.find('.name').text('you').css('font-weight', 'bold');
  }

  $('#sc-filters .filter').on('change', function(){
    $(this).siblings().prop('checked', false);
    filter($(this).data('filter'), $(this).prop('checked'));
    console.log('filtering by ', $(this).data('filter'));
  });
  function filter(attr, state){
    console.log(attr, state);
    seen = [];
    $('.grid').isotope({
      // options
      itemSelector: '.grid-item',
      layoutMode: 'masonry',
      masonry: {
        columnWidth: '.grid-sizer',
        percentPosition: true
      },
      filter: function(){
        if(!state){
          return true;
        }
        else{
          var $this = $(this);
          var thisOne = $(this).data(attr);
          console.log(thisOne, seen);
          if(seen.indexOf(thisOne) < 0){
            seen.push(thisOne);
            console.log('letting', $(this));
            return true;
          }else{
            return false
          };
        }
      }
    })
  };
  function submitScreenshot(){
    var id = localStorage.screenshotID
    var csrf_token = $('meta[name="csrf-token"]').attr('content');
    var img = window.processingInstance.externals.canvas.toDataURL();
    var url = "/screenshots.json";
    var type = 'POST';
    var sc = {
      screenshot:img,
      name: $('#name').val(),
      user_agent: window.navigator.userAgent,
    };
    if(id != undefined){
      sc.id = localStorage.screenshotID;
      type = 'PATCH';
      url = '/screenshots/' + id + '.json';
    }
    $.ajax({
      url: url,
      data:{
        screenshot: sc
      },
      headers: {
        'X-CSRF-Token': csrf_token
      },
      success: function(data, e){
        localStorage.hasTakenScreenshot = true;
        localStorage.screenshotID = data.screenshot.id;
      },
      complete: function(e){},
      type: type,
      contentType:"application/x-www-form-urlencoded",
    });
  };
});
