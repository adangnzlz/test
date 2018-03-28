angular.module('app').directive('executions', function () {
    return {
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

    function ExecutionsController($scope, $stateParams, $state, executionsService, chartFactory, lodash, $location, $anchorScroll) {

        var ec = this;
        ec.value = 1;

        ec.formatData = function (data) {
            var data = data.REPORT;
            data.HEADER = data.HEADER;
            data.HEADER.WORK = Object.entries(data.HEADER.WORK)
            data.BODY = data.BODY;
            data.FOOT = data.FOOT;
            return data
        }
        executionsService.getData().success(function (data) {
            ec.data = ec.formatData(data)
            $scope.value = 1;
            ec.querys = ec.data.BODY.COINCIDENT.COINCIDENT_OK.QUERY.slice(0, 20);
        });

        $scope.$on('changeQuerys', function (event, result) {
            ec.querys = result.querys;
            ec.title = result.title;
            $('html, body').animate({
                scrollTop: $("#querys-section").offset().top
            }, 500);
            $scope.$digest();

        });
    }
});