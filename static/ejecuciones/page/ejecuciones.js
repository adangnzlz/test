angular.module('app').directive('ejecuciones', function () {
    return {
        bindToController: true,
        controller: EjecucionesController,
        controllerAs: 'ec',
        restrict: 'E',
        scope: {
            controller: '='
        },
        templateUrl: function (elem, attr) {
            return './ejecuciones/page/ejecuciones.html';
        }
    };

    function EjecucionesController($scope, $stateParams, $state) {

        var ec = this;

      


    }
});