//var app = angular.module('app',['ui.bootstrap','ui.router','chart.js','angular-table', 'angular-tabs']);
var app = angular.module('app',[
    'ui.bootstrap',
    'ui.router',
    'chart.js',
    'angularUtils.directives.dirPagination',
    'knalli.angular-vertxbus',
    'ngDialog',
    'ngSanitize',
    'ngDragDrop',
    'ngAnimate',
    'ngLodash',
    'oc.lazyLoad']);

angular.module('app').config(function(vertxEventBusProvider) {
	  vertxEventBusProvider
	  .useDebug(true)
	  .useUrlServer(location.protocol + '//' + location.hostname + ':' + location.port);
	});
/*
app.config(function(vertxEventBusProvider) {
   //   var host = window.location.host;
  //    var protocol = window.location.protocol;
    vertxEventBusProvider
        .useDebug(true)
        .enable()
         .useReconnect()
      .useUrlServer(location.protocol + '//' + location.hostname + ':8080');
     // .useUrlServer('http://localhost:8080');
    //  .useUrlServer(protocol + "//" + host);
  });
  
 app.factory('VertxBus', ['vertxEventBus',
  function(vertxEventBus){
    return vertxEventBus;
  }]);
  */
 angular.module('app').directive('validNumber', function() {
      return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
          if(!ngModelCtrl) {
            return; 
          }

          ngModelCtrl.$parsers.push(function(val) {
            if (angular.isUndefined(val)) {
                var val = '';
            }
            
            var clean = val.replace(/[^-0-9\.]/g, '');
            var negativeCheck = clean.split('-');
			var decimalCheck = clean.split('.');
            if(!angular.isUndefined(negativeCheck[1])) {
                negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                clean =negativeCheck[0] + '-' + negativeCheck[1];
                if(negativeCheck[0].length > 0) {
                	clean =negativeCheck[0];
                }
                
            }
              
            if(!angular.isUndefined(decimalCheck[1])) {
                decimalCheck[1] = decimalCheck[1].slice(0,2);
                clean =decimalCheck[0] + '.' + decimalCheck[1];
            }

            if (val !== clean) {
              ngModelCtrl.$setViewValue(clean);
              ngModelCtrl.$render();
            }
            return clean;
          });

          element.bind('keypress', function(event) {
            if(event.keyCode === 32) {
              event.preventDefault();
            }
          });
        }
      };
    });