var map = L.map('map');

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var routingControl = L.Routing.control({
	waypoints: [
		L.latLng(57.74, 11.94),
		L.latLng(57.6792, 11.949)
	],
	geocoder: L.Control.Geocoder.nominatim(),
	router: L.Routing.graphHopper('your-api-key'),
	routeWhileDragging: false
}).addTo(map);

var router = routingControl.getRouter();
router.on('response',function(e){
  console.log('This request consumed ' + e.credits + ' credit(s)');
  console.log('You have ' + e.remaining + ' left');
});
