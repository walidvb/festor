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


  var $items = $('.grid-item[data-screenshot]');

  var loadImages = debounce(loop, 50);
  function loop(){
    for(var i = $items.length - 1; i >= 0; --i){
      var $this = $($items[i]);
      if(!$this.data('done') && $this.offset().top - window.scrollY <  window.innerHeight + 250){
        var img = new Image();
        img.src = $this.data('screenshot');
        img.elem = $this;
        img.onload = function(){
          if(!this.elem.data('done')){
            var thumb = this.cloneNode();
            this.className = 'big';
            thumb.className = 'thumb';
            this.elem.prepend(this).prepend(thumb);
            this.elem.data('done', true).addClass('done');
            this.elem.find('.placeholder').remove();
          }
        };
      };
    };
  }
  $('.screenshots-page .grid').on('arrangeComplete', loop);
  $(window).on('scroll', loadImages);


  $('#sc-filters .filter').on('change', function(){
    $(this).siblings().prop('checked', false);
    filter($(this).data('filter'), $(this).prop('checked'));
  });
  $('.yours').on('click', function(){
    if(yourTile.length){
      $('html, body').stop().animate({
        scrollTop: yourTile.offset().top - 24
      }, 'ease-out');
    }
  });
  function filter(attr, state){
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
          if($this.hasClass('focused') || (seen.indexOf(thisOne) < 0 && thisOne != undefined)){
            seen.push(thisOne);
            return true;
          } else {
            return false
          };
        }
      }
    });
    loadImages();
  };

  if(localStorage.screenshotID == undefined && $('#canvas').length)
  {
    setTimeout(submitScreenshot, 2000);
  }
  else{
    $('#screenshot').addClass('taken-screenshot');
    $('#name').val(localStorage.screenshotName);
  }

  $('.screenshots-page .tile-link').each(function(){
    var $this = $(this);
    $this.click(function(e){
      e.preventDefault();
      $('html, body').animate({scrollTop: $this.offset().top - 14*5}, 300);
      $('.map-show').removeClass('grid-item--width2');
      var gridItem = $this.parent('.grid-item');
      gridItem.addClass('map-show');// grid-item--width2');
      $this.find('.map.empty').attr('src', $this.attr('href')).removeClass('empty');
      setTimeout(layout, 200);

      gridItem.find('.thumb').click(function(e){
        console.log(e);
        e.stopPropagation();
        e.preventDefault();
        console.log(gridItem);
        gridItem.removeClass('map-show');
        if(!$(this).hasClass('featured')){
          gridItem.removeClass('grid-item--width2');
        }
        setTimeout(layout, 200);
      });

      function layout(){
        $('.grid.ready').isotope('layout');
      }
    });
  });
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
    $('body, #the-content').css('visibility', 'hidden');
    $('#the-content').css('opacity', 0);
    setTimeout(function(){
        $('body').css('visibility', 'visible');
        setTimeout(function(){
          $('#the-content').css('visibility', 'visible').animate({opacity: 1}, 400, function(){
            $('#canvas').css('opacity', '');
              if(!disableLines()){
                window.processingInstance.loop();
              }
              setTimeout(function(){
                $('#screenshot').addClass('taken-screenshot added');
                setTimeout(function(){$('#screenshot').removeClass('added');}, 4500);
              }, 200);
          });
        }, 800)
    }, 120);
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
        localStorage.screenshotID = data.screenshot.id;
      },
      complete: function(e){},
      type: type,
      contentType:"application/x-www-form-urlencoded",
    });
  };
});
