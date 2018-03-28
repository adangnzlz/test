angular.module('app').directive('query', function () {
    return {
        bindToController: true,
        controller: QuerysController,
        controllerAs: 'qc',
        restrict: 'E',
        scope: {
            query: '='
        },
        templateUrl: function (elem, attr) {
            return './executions/directives/query/query.html';
        }
    };

    function QuerysController($scope, $stateParams, $state) {

        var qc = this;
        $scope.$watch('qc.query', function (newVal, oldVal) {
            if (newVal != oldVal) {
                qc.query = newVal;
            }
        });
    }
});
