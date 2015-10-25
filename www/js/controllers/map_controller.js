streetlightApp.controller('mapCtrl', ['$scope', 'leafletData', 'persistentAppSettings',
  function ($scope, leafletData, persistentAppSettings) {

    $scope.map = {
          defaults: {
            tileLayer: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
            maxZoom: 18,
            zoomControlPosition: 'bottomleft',
          },
          markers : {},
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            }
          }
    };

    $scope.map.center  = {
          lat : 48.1518,
          lng : 17.1577,
          zoom : 17
    };

    leafletData.getMap().then(function(map) {
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
    })

    var arrowMarkerIcon = L.icon({
        iconUrl: 'img/marker-icon.png',
        iconSize:     [48, 48], // size of the icon
        iconAnchor:   [24, 24], // point of the icon which will correspond to marker's location
    });

    var marker = null

    var mapCenterMovedAt = 0
    var onPositionUpdated = function(position){
      if(marker == null){
        marker = L.marker([position.coords.latitude, position.coords.longitude], {icon: arrowMarkerIcon});
        leafletData.getMap().then(function(map) {
          marker.addTo(map)
        });
      }

      marker.setLatLng([position.coords.latitude, position.coords.longitude])
      $scope.angle = position.coords.heading

      if(Date.now() - mapCenterMovedAt > 8000){
        mapCenterMovedAt = Date.now()
        leafletData.getMap().then(function(map) {
          map.panTo(marker.getLatLng());
        });
      }
    }

    var onPositionGatheringFailed = function(error){console.log('watchPosition error: '+error)}

    var geoOptions = {
      enableHighAccuracy: true, 
      timeout           : 300
    };

    var watchPositionID = navigator.geolocation.watchPosition(onPositionUpdated, onPositionGatheringFailed, geoOptions)

    $scope.$on('$destroy',function(){
      navigator.geolocation.clearWatch(watchPositionID)
    });
  }])