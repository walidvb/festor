
var myInfoWindow, newInfoWindow = null;

// Create an array of styles.
var styles = [
	{
		"featureType": "road",
		"elementType": "geometry.stroke",
		"stylers": [
			{ "color": "#c6c6c6" }
		]
	},
	{
		"featureType": "road",
		"elementType": "geometry.fill",
		"stylers": [
			{ "color": "#ffffff" }
		]
	},
	{
		"elementType":"labels.text.fill",
		"stylers": [
			{ "color": "#343434" }
		]
	},
	{
		"featureType": "water",
		"elementType": "geometry.fill",
		"stylers": [
			{ "color": "#b2b2b2" }
		]
	},
	{
		"featureType": "poi",
		"stylers": [
			{ "hue": "#dcdcdc" }
		]
	},
	{
		"featureType": "landscape.man_made",
		"stylers":[
			{ "color": "#dddddd" }
		]
	},
	{
		"featureType": "landscape.natural",
		"stylers":[
			{ "color": "#c9c9c9" }
		]
	},
	{
		"featureType": "poi",
		"elementType": "geometry.fill",
		"stylers": [
			{ "color": "#c9c9c9" }
		]
	},
	{
		"featureType": "poi",
		"elementType": "labels.icon",
		"stylers": [
			{ "hue": "#363636" },
			{ "saturation": -100 }
		]
	},
	{
		"featureType": "road",
		"elementType": "labels.icon",
		"stylers": [
			{ "hue": "#363636" },
			{ "saturation": -100 }
		]
	},
	{
		"featureType": "administrative",
		"elementType": "labels.icon",
		"stylers": [
			{ "hue": "#363636" }
		]
	},
	{
		"featureType": "landscape",
		"elementType": "labels.icon",
		"stylers": [
			{ "hue": "#363636" }
		]
	},
	{
		"featureType": "transit",
		"elementType": "labels.icon",
		"stylers": [
			{ "hue": "#919191" }
		]
	},
	{
		"featureType": "water",
		"elementType": "labels.icon",
		"stylers": [
			{ "hue": "#363636" }
		]
	},
	{
		"featureType": "transit",
		"elementType": "geometry.fill",
		"stylers": [
			{ "color": "#afafaf" }
		]
	},
	{
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [
			{ "color": "#343434" }
		]
	},
	{
		"featureType": "administrative",
		"elementType": "geometry.fill",
		"stylers": [
			{ "color": "#dbdbdb" }
		]
	},
	{
		"featureType": "transit.station",
		"stylers": [
			{ "hue": "#363636" },
			{ "saturation": -100 }
		]
	}
];
var lang = $('html').attr('lang');
var seeProg = lang == 'en' ? 'See the program of this venue' : 'Voir le programme de ce lieu';
var loading = lang == 'en' ? 'loading' : 'chargement...';
function openInfoWindow(map, index, latitude, longitude, title, adresse, infos, url, markerArray) {
	if(newInfoWindow) {
		newInfoWindow.close();
	}
	if(myInfoWindow) {
		myInfoWindow.close();
	}
	for(var i=0; i < markerArray.length; i++) {
		markerArray[i].setZIndex(i+10);
	}
	var newCenter = new google.maps.LatLng(latitude[index], longitude[index]);
	newInfoWindow = new google.maps.InfoWindow({
		content: loading
	});
	newInfoWindow.setContent('<div class="marker-content"><h5 class="marker-title">' + title[index] + '</h5><p>' + infos[index] + '</p><p><a href="' + url[index] + '" class="marker-link" title=' + seeProg + '>' + seeProg + '</a></p></div>');
	map.panTo(newCenter);
	markerArray[index].setZIndex(300);
	newInfoWindow.open(map, markerArray[index]);
	$(document).trigger('filter-events');
}

function renderGoogleMap() {

	// Create a new StyledMapType object, passing it the array of styles,
	// as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(styles,
	{name: "Styled Map"});

	// Create a map object, and include the MapTypeId to add
	// to the map type control.
	var latitude = document.getElementById('google-map').getAttribute('data-latitude');
	var longitude = document.getElementById('google-map').getAttribute('data-longitude');
	var title = document.getElementById('google-map').getAttribute('data-title');
	var dataZoom = document.getElementById('google-map').getAttribute('data-zoom');
	var dataCenter = document.getElementById('google-map').getAttribute('data-center');
	var url = document.getElementById('google-map').getAttribute('data-url');
	var adresse = document.getElementById('google-map').getAttribute('data-adresse');
	var infos = document.getElementById('google-map').getAttribute('data-infos');
	// split latitude and longitude
	latitude = latitude.split('-');
	longitude = longitude.split('-');
	title = title.split('*');
	infos = infos.split('|');
	url = url.split('*');
	adresse = adresse.split('*');

	// define center
	var myLatlng;
	if(dataCenter == null) {
		var centerLat = 0;
		var centerLong = 0;
		for(var i = 0; i < latitude.length; i++) {
			centerLat = centerLat + parseFloat(latitude[i]);
			centerLong = centerLong + parseFloat(longitude[i]);
		}
		centerLat = centerLat / latitude.length;
		centerLong = centerLong / latitude.length;
		myLatlng = new google.maps.LatLng(centerLat, centerLong);
	}
	else {
		dataCenter = dataCenter.split('-');
		myLatlng = new google.maps.LatLng(dataCenter[0], dataCenter[1]);
	}

	var mapOptions = {
		zoom: parseInt(dataZoom),
		center: myLatlng,
		disableDefaultUI: false,
		scrollwheel: false,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		}
	};

	var map = new google.maps.Map(document.getElementById('google-map'),mapOptions);

	// CHANGE THE MARKER URL
	myInfoWindow = new google.maps.InfoWindow({
		content: 'chargement...'
	});
	var markerArray = [];
	var iconUrl = $('#google-map-wrapper').data('marker-url');
	for(var i = 0; i < latitude.length; i++) {
		var myNewLatLng = new google.maps.LatLng(latitude[i], longitude[i]);
		var marker = new google.maps.Marker({
			position: myNewLatLng,
			map: map,
			title: title[i],
			icon: iconUrl,
			zIndex: i+10
		});
		markerArray[i] = marker;
		// infowindow
		google.maps.event.addListener(marker, 'click', function(i) {
			return function() {
				window.location.hash = url[i];
				if(myInfoWindow) {
					myInfoWindow.close();
				}
				if(newInfoWindow) {
					newInfoWindow.close();
				}
			}
		}(i));
	}


	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');

	// center map on resize
	$(window).resize(function() {
		map.panTo(myLatlng);
	});

	openFromHash();
	$(window).bind('hashchange', openFromHash);

	function openFromHash(){
		var pageHash = window.location.hash;
		pageHash = pageHash.substring(1);
		$('.location-event').hide();
		if(pageHash.length){
			$('.location-event.'+pageHash).show();
			$('.location-link.active').removeClass('active');
			$('.location-link').each(function(i) {
				if($(this).attr('data-title') == pageHash) {
					$(this).addClass('active');
					openInfoWindow(map, i, latitude, longitude, title, adresse, infos, url, markerArray);
				}
			});
		}
	}
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBcuM3OXda6dyrsN4OKZulTznEW6DgTRk8&sensor=false&' +
      'callback=renderGoogleMap';
  document.body.appendChild(script);
}

$(document).ready(function(){
	if($('#google-map-wrapper').length){
		console.log("Thank you mirage for this code, couldn't be bothered to write it myself – the vbbros");
		loadScript();
	}
});
