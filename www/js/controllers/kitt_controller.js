streetlightApp.controller('kittCtrl', ['$scope', function ($scope) {

    if(ionic.Platform.isAndroid()){
	    window.setTimeout( function(){
	    	var successCallback = function(msg){window.plugins.NativeAudio.loop( 'kittMp3' )}
	    	var errorCallback = function(msg){alert( 'audio error: ' + msg );}
		    window.plugins.NativeAudio.preloadComplex( 'kittMp3', 'sound/kitt.mp3', 1, 1, 0, successCallback, errorCallback);
	    }, 1500 );

	    $scope.$on('$destroy',function(){
        	window.plugins.NativeAudio.stop( 'kittMp3' );
			window.plugins.NativeAudio.unload( 'kittMp3' );
    	});
	}
}]);
