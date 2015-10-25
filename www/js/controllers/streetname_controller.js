streetlightApp.controller('streetNameCtrl', ['$scope', '$http',  'persistentAppSettings',
  function ($scope, $http, persistentAppSettings) {

    var streetNameUpdatedAt = 0

    $scope.fontSize = parseInt(persistentAppSettings.get('fontSize'))/100.0
    $scope.flipScreenVertically = persistentAppSettings.getBoolean('verticalFlip')

    var onPositionUpdated = function(position){
      var currentLat = position.coords.latitude
      var currentLon = position.coords.longitude

      var millisSinceLastStreetUpdate = Date.now() - streetNameUpdatedAt
      if(millisSinceLastStreetUpdate > 2000){ // do not query osm too frequently due to http://wiki.openstreetmap.org/wiki/Nominatim_usage_policy
        var osmUrl =  'http://nominatim.openstreetmap.org/reverse?format=json&lat='+currentLat+'&lon='+currentLon+'&zoom=18&addressdetails=1&email=info@streetlight.mobi'
        $http.get(osmUrl).success(function(data) {
          streetNameUpdatedAt = Date.now()
          var streetName = data['address']['road'] || data['address']['pedestrian'] || 'N/A'
          $scope.streetName = streetName.toUpperCase()
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
}]);