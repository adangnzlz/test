angular.module('app').directive('headerInfo', function () {
    return {
        bindToController: true,
        controller: HeaderInfoExecutions,
        controllerAs: 'hic',
        restrict: 'E',
        scope: {
        },
        templateUrl: function (elem, attr) {
            return './executions/directives/header-info/header-info.html';
        }
    };

    function HeaderInfoExecutions($scope, $stateParams, $state, executionsService, chartFactory) {

        var hic = this;
        hic.formatData = function (data) {
            var data = data.REPORT;
            data.HEADER = data.HEADER;
            data.HEADER.WORK = Object.entries(data.HEADER.WORK)
            data.BODY = data.BODY;
            data.FOOT = data.FOOT;
            return data
        }
        executionsService.getData().success(function (data) {
            hic.data = hic.formatData(data)
            hic.querys = hic.data.BODY.COINCIDENT.COINCIDENT_OK.QUERY.slice(0, 20);
        });
    }
});