streetlightApp.controller('menuCtrl', ['$scope', 'persistentAppSettings',
  function ($scope, persistentAppSettings) {

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if(window.brightness && persistentAppSettings.getBoolean('autoAdjustBrightness')){
        if (toState.url == "/menu") 
            window.brightness.setBrightness(-1, function(){}, function(){}); // set brightness to original value
        else 
            window.brightness.setBrightness(1, function(){}, function(){});// set brightness to max
      }
    })

    if(persistentAppSettings.isUnset('fontSize'))
      persistentAppSettings.set('fontSize', 50)  

  	if(persistentAppSettings.isUnset('useMetricUnits'))
  		persistentAppSettings.set('useMetricUnits', true)

    if(persistentAppSettings.isUnset('autoAdjustBrightness'))
      persistentAppSettings.set('autoAdjustBrightness', true)   

    if(persistentAppSettings.isUnset('verticalFlip'))
      persistentAppSettings.set('verticalFlip', true)      	

     $scope.useMetricUnits = {checked : persistentAppSettings.getBoolean('useMetricUnits')}
     $scope.autoAdjustBrightness = { checked : persistentAppSettings.getBoolean('autoAdjustBrightness')}
     $scope.verticalFlip = { checked : persistentAppSettings.getBoolean('verticalFlip')}

     $scope.onUseMetricUnitsChange = function(){
     	persistentAppSettings.set('useMetricUnits', $scope.useMetricUnits.checked) 
     }

    $scope.onAutoAdjustBrightness = function(){
      persistentAppSettings.set('autoAdjustBrightness', $scope.autoAdjustBrightness.checked) 
     }  

    $scope.onVerticalFlipChange = function(){
      persistentAppSettings.set('verticalFlip', $scope.verticalFlip.checked) 
    }

     $scope.fontSize = {
       value: persistentAppSettings.get('fontSize'),
       min: 0,
       max: 100
     }; 

    $scope.onFontSizeChange = function(){
      persistentAppSettings.set('fontSize', $scope.fontSize.value) 
    }

  }])