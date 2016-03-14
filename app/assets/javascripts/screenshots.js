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
        scrollTop: yourTile.offset().top - 24
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
  else{
    $('#screenshot').addClass('taken-screenshot');
    $('#name').val(localStorage.screenshotName);
  }

  $(document).on('submit', 'form#screenshot', postName);
  function postName(e){
    flash();
    $('#screenshot').addClass('taken-screenshot');
    submitScreenshot();
    e.preventDefault();
  };

  function flash(){
    window.processingInstance.draw();
    window.processingInstance.noLoop();
    $('#canvas').css('opacity', 1);
    $('body').css('opacity', 0);
    setTimeout(function(){
        $('body').animate({opacity: 1}, 800, function(){
          setTimeout(function(){
            $('#canvas').css('opacity', '');
            if(!disableLines()){
              window.processingInstance.loop();
            }
            $('#screenshot').addClass('taken-screenshot added');
            setTimeout(function(){$('#screenshot').removeClass('added');}, 4000);
          }, 1000);
      });
    }, 80);
  };
  function submitScreenshot(manual){
    var id = localStorage.screenshotID;
    var csrf_token = $('meta[name="csrf-token"]').attr('content');
    window.processingInstance.draw();
    var img = window.processingInstance.externals.canvas.toDataURL();
    var url = "/screenshots.json";
    var type = 'POST';
    var sc = {
      screenshot:img,
      name: $('#name').val(),
      user_agent: window.navigator.userAgent,
    };
    localStorage.screenshotName = sc.name;
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
