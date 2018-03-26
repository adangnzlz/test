'use strict';

/* Controllers */

var angularVertxControllers = angular.module('angularVertxControllers', []);

angularVertxControllers.controller('VertxCtrl', ['$scope', 'VertxBus',
 function($scope, VertxBus) {
     console.log('entra en VertxCtrl');
     
	if (VertxBus.readyState() !== VertxBus.EventBus.OPEN) {
		VertxBus.onopen = function(){
			console.log('onopen');
			VertxBus.registerHandler('repository_results', function(res){
				console.log('receiveResponse',res);
				$scope.receiveResponse = res;
				$scope.$apply();
			});
		};
                
	}
	
	$scope.message = "";
	$scope.receiveResponse = {};
	$scope.sendResponse = {};
	
	$scope.send = function() {
            console.log("llama a send");
            /*	VertxBus.send('angularjs.send', {message:$scope.message}, function(res) {
			console.log('sendResponse');
			$scope.sendResponse = res;
		});
                */
	}
	
	$scope.$on('$destroy', function iVeBeenDismissed() {
		VertxBus.unregisterHandler('angularjs.receive', function(){
			console.log('unregistered handler');
		});
	})
 }]);