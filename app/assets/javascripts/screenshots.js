;$(document).on('ready', function(){

  // screenshot page
  var seen = [];
  var mine = $('[data-id='+localStorage.screenshotID+']');
  var yourTile;
  if(mine.length){
    mine.addClass('focused');
    mine.find('.name').text('by you, ').css('font-weight', 'bold');
    mine.find('.location').remove();

    yourTile = $('.grid-item.focused');
  }





  $('#sc-filters .filter').on('change', function(){
    console.log('filtering by ', $(this).data('filter'));
    $(this).siblings().prop('checked', false);
    filter($(this).data('filter'), $(this).prop('checked'));
  });
  $('label.yours').on('click', function(){
    if(yourTile.length){
      $('html, body').stop().animate({
        scrollTop: yourTile.offset().top
      }, 'ease-out');
    }
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
          if($this.hasClass('focused') || seen.indexOf(thisOne) < 0){
            seen.push(thisOne);
            return true;
          }else{
            return false
          };
        }
      }
    })
  };

  if(localStorage.screenshotID == undefined && $('#canvas').length)
  {
    setTimeout(submitScreenshot, 2000);
  }

  $(document).on('click', '#screenshot .submit', postName);
  function postName(e){
    submitScreenshot();
    e.preventDefault();
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
    console.log('posting screenshot: ', sc);
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
        console.log('took screenshit ', data.screenshot);
        debugger;
        localStorage.screenshotID = data.screenshot.id;
      },
      complete: function(e){},
      type: type,
      contentType:"application/x-www-form-urlencoded",
    });
  };
});
