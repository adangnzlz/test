angular.module('app').directive('querysSection', function () {
    return {
        bindToController: true,
        controller: QuerysSectionController,
        controllerAs: 'qsc',
        restrict: 'E',
        scope: {
            data: '=',
            querys: '=',
            title: '='
        },
        templateUrl: function (elem, attr) {
            return './executions/directives/querys-section/querys-section.html';
        }
    };

    function QuerysSectionController($scope, $stateParams, $state) {

        var qsc = this;
        qsc.loaded = false;
        qsc.title = "Coincident ok (20 first querys)";

        $scope.$watch('qsc.data', function (newVal, oldVal) {
            if (qsc.data) {
            }
        });
        $scope.$watch('qsc.querys', function (newVal, oldVal) {
            if (qsc.querys) {
                qsc.loaded = true;
                if (newVal != oldVal) {
                    qsc.querys = newVal;
                }
            }
        });
        $scope.$watch('qsc.title', function (newVal, oldVal) {
            if (qsc.title) {
                qsc.title = newVal;
            }
        });
    }
});
