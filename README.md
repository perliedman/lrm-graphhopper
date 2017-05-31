Leaflet Routing Machine / GraphHopper
=====================================

[![npm version](https://img.shields.io/npm/v/lrm-graphhopper.svg)](https://www.npmjs.com/package/lrm-graphhopper)

Extends [Leaflet Routing Machine](https://github.com/perliedman/leaflet-routing-machine) with support for [GraphHopper](https://graphhopper.com/).

Some brief instructions follow below, but the [Leaflet Routing Machine tutorial on alternative routers](http://www.liedman.net/leaflet-routing-machine/tutorials/alternative-routers/) is recommended.

## Installing

Go to the [releases page](https://github.com/perliedman/lrm-graphhopper/releases) to get the script to include in your page. Put the script after Leaflet and Leaflet Routing Machine has been loaded.

To use with for example Browserify:

```sh
npm install --save lrm-graphhopper
```

## Using

There's a single class exported by this module, `L.Routing.GraphHopper`. It implements the [`IRouter`](http://www.liedman.net/leaflet-routing-machine/api/#irouter) interface. Use it to replace Leaflet Routing Machine's default OSRM router implementation:

```javascript
var L = require('leaflet');
require('leaflet-routing-machine');
require('lrm-graphhopper'); // This will tack on the class to the L.Routing namespace

L.Routing.control({
    router: new L.Routing.GraphHopper('your GraphHopper API key'),
}).addTo(map);
```

Note that you will need to pass a valid GraphHopper API key to the constructor.

To keep track of the GraphHopper credits consumption, the application may listen to the `response` event fired by the Router object. This event holds the values from [GraphHopper's response HTTP headers](https://graphhopper.com/api/1/docs/#http-headers):
* `status`: The HTTP status code (see [GraphHopper error codes](https://graphhopper.com/api/1/docs/#http-error-codes))
* `limit`: The `X-RateLimit-Limit` header
* `remaining`: The `X-RateLimit-Remaining` header
* `reset`: The `X-RateLimit-Reset` header
* `credits`: The `X-RateLimit-Credits` header

```javascript
var router = myRoutingControl.getRouter();
router.on('response',function(e){
  console.log('This routing request consumed ' + e.credits + ' credit(s)');
  console.log('You have ' + e.remaining + ' left');
});
```
