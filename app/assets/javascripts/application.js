// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require turbolinks
//= require jquery_ujs
//= require home.js
//= require rails_admin_sortable.js
//= require colorbox/jquery.colorbox-min.js
//= require app
//= require_tree .

$(document).on('turbolinks:load', function(){
  var theTop = window.innerWidth >= 767 ? $('.news').offset().top - 8 : $('#main-content').length? $('#main-content').offset().top : 0;
  var speed = window.innerWidth >= 767 ? 300 : 0;
  $('html, body').animate({
    scrollTop: theTop,
  }, speed);
});
