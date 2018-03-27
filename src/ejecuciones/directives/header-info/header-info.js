angular.module('app').directive('headerInfo', function () {
    return {
        bindToController: true,
        controller: HeaderInfoEjecuciones,
        controllerAs: 'hic',
        restrict: 'E',
        scope: {
        },
        templateUrl: function (elem, attr) {
            return './ejecuciones/directives/header-info/header-info.html';
        }
    };

    function HeaderInfoEjecuciones($scope, $stateParams, $state, ejecucionesService, chartFactory) {

        var hic = this;
        hic.formatData = function (data) {
            var data = data.REPORT;
            data.HEADER = data.HEADER;
            data.HEADER.WORK = Object.entries(data.HEADER.WORK)
            data.BODY = data.BODY;
            data.FOOT = data.FOOT;
            return data
        }
        ejecucionesService.getData().success(function (data) {
            hic.data = hic.formatData(data)
            hic.querys = hic.data.BODY.COINCIDENT.COINCIDENT_OK.QUERY.slice(0, 20);
        });
    }
});