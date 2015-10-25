streetlightApp = angular.module('streetlightApp', ['ionic', 'leaflet-directive'])

streetlightApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    ionic.Platform.fullScreen()
    if (typeof(window.plugins) !== 'undefined' && typeof(window.plugins.insomnia) !== 'undefined') 
       window.plugins.insomnia.keepAwake() // keep display on
  });
})


document.addEventListener('deviceready', function () {
    window.brightness = cordova.require("cordova.plugin.Brightness.Brightness");
})

streetlightApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('menu', {
      url: "/menu",
      controller: 'menuCtrl',
      templateUrl: "templates/menu.html"
    })

    .state('speed', {
      url: "/speed",
      templateUrl: "templates/speed.html",
      controller: 'speedCtrl',
      cache: false
    })

    .state('streetname', {
      url: "/streetname",
      templateUrl: "templates/streetname.html",
      controller: 'streetNameCtrl',
      cache: false
    })

    .state('map', {
      url: "/map",
      templateUrl: "templates/map.html",
      controller: 'mapCtrl'
    })

    .state('grid', {
      url: "/grid",
      templateUrl: "templates/grid.html",
      controller: 'gridCtrl'
    })

    .state('kitt', {
      url: "/kitt",
      templateUrl: "templates/kitt.html",
      controller: 'kittCtrl'
    })

    .state('matrix', {
      url: "/matrix",
      templateUrl: "templates/matrix.html",
      controller: 'matrixCtrl',
      cache: false
    })

    $urlRouterProvider.otherwise('/menu');

  });