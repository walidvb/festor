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

        random_coords();
        $p.strokeJoin($p.MITER);
        $p.strokeCap($p.SQUARE);
        $p.noFill();
    }
    $p.setup = setup;
    setup = setup.bind($p);
    var speed = 0.1;
    var xDir = 1;
    var yDir = 1;
    function draw() {
        $p.background(fill_color);


        for (var i = 1; i < width_base; i++) {
            my_line_3(coord_x, coord_y, (width_base - i) * width_base - (width_base / 2), i % 2 == 0 ? 255 : line_color);
        }
        var iterator = 1;
        for (iterator = 1; i < max_points - 1; iterator++) {
            $p.randomSeed($p.millis() * 111);
            coord_y[iterator] = (coord_y[iterator] + yDir*(iterator / 12.0 + speed)) % render_height;
        }
        $p.randomSeed($p.millis() * 57);
        coord_x[iterator] = (coord_x[iterator] + xDir*(iterator / 10.0 + speed)) % render_width;
    }
    $p.draw = draw;
    draw = draw.bind($p);
    var firstLoad = true;
    $(document).on('turbolinks:click', function(e){
      yDir *= -1;
      xDir *= -1;
      speed = 0.2;
      $('html').addClass('transitionning');
    }).on('turbolinks:load', function(e){
      speed = 0.1;
      if(!firstLoad){
        $('html').addClass('imready');
        setTimeout(function(){
          $('html').removeClass('transitionning');
        }, 100);
      }
      firstLoad = false;
    });
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

    function my_spot(x, y, my_width, my_height) {
        $p.fill(0);
        $p.noStroke();
        $p.ellipse(x, y, my_width, my_height);
    }
    $p.my_spot = my_spot;
    my_spot = my_spot.bind($p);

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
window.processingInstanc
$('document').ready(function(){
  var canvas = document.getElementById("canvas");
  if(canvas){
    var processingInstance = new Processing(canvas, sketchProc);
    processingInstance.resize(canvas.offsetWidth, canvas.offsetHeight);
    window.processingInstance = processingInstance;
    $(document).on('random-coords', function(){
      processingInstance.random_coords();
    });
    var pressCount = 1;
    var newOp = 1;

    $('.login-form').click(function(){
      if(window.innerWidth < 768 && pressCount >= 3){
        $('html').addClass('imready');
        $(canvas).css('opacity', '');
      }
      processingInstance.random_coords();
      pressCount++;
      var newOp = Math.max(0.1, 1/pressCount);
      $('#canvas').css('opacity', newOp);
      if(pressCount >= 2){
        setTimeout(function(){
          $('html').addClass('imready');
          $(canvas).css('opacity', '');
        }, 4000);
      };
      if(pressCount >= 2){
        $('html').addClass('imready');
        $(canvas).css('opacity', '');
      };
    })
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
      hidden ? console.log(hidden) : console.log(hidden);
    }, false);
  }
});
