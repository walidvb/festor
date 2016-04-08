;$(document).on('ready', function(){

  // screenshot page
  var seen = [];
  var mine = $('[data-id='+localStorage.screenshotID+']');
  setYours = function(){
    var yourTile;
    if(mine.length){
      mine.addClass('focused');
      mine.find('.name').text(' by you,').css('font-weight', 'bold');
      mine.find('.location').remove();
      yourTile = $('.grid-item.focused');
      $('.grid').isotope('layout');
    }
  }
  localStorage.screenshotID ? $('.yours').attr('href', 'screenshots/'+localStorage.screenshotID) : $('.yours').remove();



  var loadImages = debounce(loop, 50);
  var fetching = false;
  function loop(){

    if(window.scrollY + window.innerHeight >= $(document).height() - window.innerHeight*4){

    	var addNext = function(){
    		var nextUrl = $('.pagination .next a').attr('href');
    		if(nextUrl && !fetching)
    		{
    			fetching = true;
    			$.ajax({
    				url: nextUrl,
    				success: function(data){
    					$('.pagination').replaceWith($('.pagination', data));
    					var more = $('.grid .grid-item:not(header, .stay)', data);

    					$('.grid', document).append(more).isotope('appended', more).isotope('layout');
    					fetching = false;
              setYours();
    				},
    				error: function(){
    					fetching = false;
    				}
    			})
    		}
    	}
      addNext();
    }
    var $items = $('.grid-item[data-screenshot].no-img')
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
            this.elem.removeClass('no-img');
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
  function filter(attr, checked){
    var url = checked ? '/where?filter='+attr : '/where'
    $.ajax({
      url: url,
      success: function(data){
        $('.grid-item:not(header, .stay)').remove();
        $('.pagination').replaceWith($('.pagination', data));
        var more = $('.grid .grid-item:not(header, .stay)', data);
        setYours();
        $('.grid', document).append(more).isotope('appended', more);
        $($('.grid-item')[5]).after($('.grid-item.stay'));
        $('.grid').isotope('layout')
      },
    })
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
      $('<iframe src="' + $this.data('map-src') + '" class="map" width="100%" height="100%"></iframe>').prependTo($this);
      gridItem.find('.thumb').click(function(e){
        console.log(e);
        e.stopPropagation();
        e.preventDefault();
        console.log(gridItem);
        gridItem.removeClass('map-show');
        if(!$(this).hasClass('featured')){
          gridItem.removeClass('grid-item--width2');
        }
      });
    });
  });
  $(document).on('submit', 'form#screenshot', postName);
  function postName(e){
    $('#screenshot').addClass('taken-screenshot added');
    $('#screenshot .submit').addClass('on-purpose');
    flash();
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
          });
        }, 800)
    }, 200);
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
    submit = $('#screenshot .submit.on-purpose');
    submit.removeClass('error success').addClass('fa-spin');
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
        submit.addClass('success').removeClass('fa-spin');
        setTimeout(function(){
          $('#screenshot').removeClass('added');
          submit.removeClass('error success');
        }, 5500);
      },
      error: function(){
        submit.addClass('error').removeClass('fa-spin');
      },
      complete: function(e){},
      type: type,
      contentType:"application/x-www-form-urlencoded",
    });
  };
});
