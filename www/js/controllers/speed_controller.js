streetlightApp.controller('speedCtrl', ['$scope', 'persistentAppSettings', function ($scope, persistentAppSettings) {

  $scope.fontSize = parseInt(persistentAppSettings.get('fontSize'))/100.0
  
  if(persistentAppSettings.getBoolean('useMetricUnits')){
    var unitMultiplier = 3.6 // m/s -> kmh
    $scope.unit = 'KM/H'
  }
  else{
    var unitMultiplier = 2.23 // m/s -> mph
    $scope.unit = 'MPH'
  }

    var onPositionUpdated = function(position){
      $scope.$apply(function(){
        $scope.speed = ((position.coords.speed || .0) * unitMultiplier).toFixed(0)
        $scope.relativeSpeed = $scope.speed / 30.0 * 100
        if($scope.relativeSpeed > 100.0)
          $scope.relativeSpeed = 100
      })
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
