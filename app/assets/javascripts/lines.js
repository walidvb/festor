// this code was autogenerated from PJS
var sketchProc = (function($p) {

    var time = 0;
    var fill_color = 255;
    var line_color = 0;
    var render_width = window.innerWidth;
    var render_height = window.innerHeight;

    var spot_diameter = 7;

    var random_offset = 250;
    var max_points = 8;
    var width_base = 16;

    var coord_x = $p.createJavaArray('float', [max_points]);
    var coord_y = $p.createJavaArray('float', [max_points]);

    var record = false;
    function setup() {
        $p.frameRate(30);
        $p.size(render_width, render_height);
        $p.strokeJoin($p.MITER);
        $p.strokeCap($p.SQUARE);
        $p.noFill();
        random_coords();
    }
    $p.setup = setup;
    setup = setup.bind($p);
    var getSpeed = function(){
      var sp = window.hasOwnProperty('ontouchstart') ? 0.15 : 0.55;
      return sp;
    };
    var speed = getSpeed();
    var xDir = 1;
    var yDir = 1;
    function draw() {
        $p.background(fill_color);

        for (var i = 1; i < width_base; i++) {
            my_line_3(coord_x, coord_y, (width_base - i) * width_base - (width_base / 2), i % 2 == 0 ? 255 : line_color);
        }
        var i = 1;
        for (; i < max_points - 1; i++) {
            $p.randomSeed($p.millis() * 111);
            coord_y[i] = (coord_y[i] + yDir*(i / 12.0 * speed)) % render_height;
            $p.randomSeed($p.millis() * 57);
            coord_x[i] = (coord_x[i] + xDir*(i / 10.0 * speed)) % render_width;
        }
        coord_x[i] = (coord_x[i] + xDir*(i / 10.0 * speed)) % render_width;
    }
    $p.draw = draw;
    draw = draw.bind($p);
    var isPlaying = true;
    if(disableLines()){
      isPlaying = false;
      $p.noLoop();
    }
    var firstLoad = true;
    $(document).on('turbolinks:click', function(e){
      yDir *= -1;
      xDir *= -1;
      speed = getSpeed()*2;
      $('html').addClass('transitionning');
      if(!isPlaying){
        $p.loop();
        $($p.externals.canvas).show();
        $('#canvas-placeholder').hide();
      }
    }).on('turbolinks:load', function(e){
      if(!isPlaying){
        random_coords();
        $p.noLoop();
        draw();
        setBackgroundImage();
      }
      speed = getSpeed();
      if(!firstLoad){
        $('html').addClass('imready');
        $('body').addClass('content-ready');
        setTimeout(function(){
          $('html').removeClass('transitionning');
        }, 100);
      }
      firstLoad = false;
    });

    function setBackgroundImage(){
      var img = $p.externals.canvas.toDataURL();
      $('#canvas-placeholder').css('background-image', 'url(' + img + ')').show();
      $($p.externals.canvas).hide();
    }
    function random_coords() {
        yDir = Math.random() > 0.5 ? 1 : -1;
        xDir = Math.random() > 0.5 ? 1 : -1;
        for (var i = 0; i < max_points; i++) {
            if (i > 0) {
                coord_x[i] = ($p.random(coord_x[i - 1] - random_offset, coord_x[i - 1] + random_offset) + render_width * 4) % render_width;
            } else {
                coord_x[i] = $p.random(render_width);
            }

            if (i > 0) {
                coord_y[i] = ($p.random(coord_x[i - 1] - random_offset, coord_x[i - 1] + random_offset) + render_height * 4) % render_height;
            }
            if (i == 0) {
                coord_y[i] = -100;
            }

            if (i == max_points - 1) {
                coord_y[i] = render_height + 100;
            }
        }
    }
    $p.random_coords = random_coords;
    random_coords = random_coords.bind($p);

    function my_line_3(coord_x, coord_y, weight, brightness) {
        $p.stroke(brightness, 255);
        $p.strokeWeight(weight);
        $p.beginShape();
        for (var i = 0; i < coord_x.length; i++) {
            $p.vertex(coord_x[i], coord_y[i]);
        }
        $p.endShape();
    }
    $p.my_line_3 = my_line_3;
    my_line_3 = my_line_3.bind($p);

    $p.resize = function(w, h){
      render_width = w;
      render_height = h;
      setup();
    }
});

$('document').ready(function(){
  var canvas = document.getElementById("canvas");
  if(canvas){
    var processingInstance = new Processing(canvas, sketchProc);
    processingInstance.resize(canvas.offsetWidth, canvas.offsetHeight);
    window.processingInstance = processingInstance;
    processingInstance.externals.context.globalCompositeOperation = 'difference';
    processingInstance.resize(canvas.offsetWidth, canvas.offsetHeight);
    $(document).on('random-coords', function(){
      processingInstance.random_coords();
    });
    $(document).on('keypress', function(e){
      processingInstance.random_coords();
    });
    $('.login-form').one('click touchdown', enterSite);
    var autoLogin = setTimeout(function(){
      $('#canvas').animate({
        opacity: 0.1,
      }, 1000, function(){
        enterSite();
        setTimeout(function(){$('#canvas').css('opacity', '')}, 1000);
      });
    }, 2000);

    function enterSite(){
      clearTimeout(autoLogin);
      $('html').addClass('imready');
      setTimeout(function(){$('html').removeClass('transitionning');}, 200);
      setTimeout(function(){$('html').removeClass('first-load');}, 5000);
    }
    $(window).on('resize', function(){
      processingInstance.resize(canvas.offsetWidth, canvas.offsetHeight);
    });

    // Adapted slightly from Sam Dutton
    // Set name of hidden property and visibility change event
    // since some browsers only offer vendor-prefixed support
    var hidden, state, visibilityChange;
    if (typeof document.hidden !== "undefined") {
    	hidden = "hidden";
    	visibilityChange = "visibilitychange";
    	state = "visibilityState";
    } else if (typeof document.mozHidden !== "undefined") {
    	hidden = "mozHidden";
    	visibilityChange = "mozvisibilitychange";
    	state = "mozVisibilityState";
    } else if (typeof document.msHidden !== "undefined") {
    	hidden = "msHidden";
    	visibilityChange = "msvisibilitychange";
    	state = "msVisibilityState";
    } else if (typeof document.webkitHidden !== "undefined") {
    	hidden = "webkitHidden";
    	visibilityChange = "webkitvisibilitychange";
    	state = "webkitVisibilityState";
    }

    // Add a listener that constantly changes the title
    document.addEventListener(visibilityChange, function() {
    	var hidden = document[state] == 'hidden';
      $(document).trigger('visibility', { visibility: hidden });
      hidden ? processingInstance.noLoop() : processingInstance.loop();
    }, false);

    setTimeout(sendScreenshot, 3000);
    function sendScreenshot(){
      if(!localStorage.hasTakenScreenshot){
        var csrf_token = $('meta[name="csrf-token"]').attr('content');

        var img = processingInstance.externals.canvas.toDataURL();
        $.ajax({
          url:"/screenshots",
          data:{
            screenshot:{
              screenshot:img,
            }
          },
          headers: {
            'X-CSRF-Token': csrf_token
          },
          success: function(e){
            localStorage.hasTakenScreenshot = true;
          },
          complete: function(e){},
          type:"POST",
          contentType:"application/x-www-form-urlencoded",
        });
      }
    };
  }
});
