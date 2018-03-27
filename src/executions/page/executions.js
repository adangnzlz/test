angular.module('app').directive('executions', function () {
    return {
        bindToController: true,
        controller: ExecutionsController,
        controllerAs: 'ec',
        restrict: 'E',
        scope: {
            controller: '='
        },
        templateUrl: function (elem, attr) {
            return './executions/page/executions.html';
        }
    };

    function ExecutionsController($scope, $stateParams, $state) {

        var ec = this;

      


    }
});