streetlightApp.controller('fixedStreetNameCtrl', ['$scope', '$http',  'persistentAppSettings',
  function ($scope, $http, persistentAppSettings) {
$scope.fontSize = parseInt(persistentAppSettings.get('fontSize'))/100.0
alert(fontSize)
}]);