

angular.module('app').factory('chartFactory', function ($http) {
    var factory = {};
    factory.formatChartHeader1 = function (data, colorA, colorB) {
        return [{
            name: 'Same plan',
            data: [data.FOOT.COINCIDENT_OK.COINCIDENT_OK_IMPROVE_SAMEPLAN,
            data.FOOT.COINCIDENT_OK.COINCIDENT_OK_EQUAL_SAMEPLAN,
            data.FOOT.COINCIDENT_OK.COINCIDENT_OK_REGRET_SAMEPLAN],
            color: colorA
        }, {
            name: 'Dif plan',
            data: [data.FOOT.COINCIDENT_OK.COINCIDENT_OK_IMPROVE_DIFPLAN,
            data.FOOT.COINCIDENT_OK.COINCIDENT_OK_EQUAL_DIFPLAN,
            data.FOOT.COINCIDENT_OK.COINCIDENT_OK_REGRET_DIFPLAN],
            color: colorB
        }];
    };
    factory.formatChartHeader2 = function (data) {
        var colorA = '#337ab7';
        var colorB = '#f0ad4e';
        return [{
            data: [{
                name: 'Total snap 1',
                y: 24000,
                color: colorA
            }, {
                name: 'Total snap 2',
                y: 25000,
                color: colorB
            }]
        }];
    };

    factory.formatChartHeader3 = function (data) {

        var wrong = data.FOOT.NOCOINCIDENT_SQLID.NOCOINCIDENT_SQLID_SNAP2 +
            data.FOOT.NOCOINCIDENT_SQLID.NOCOINCIDENT_SQLID_SNAP2 +
            data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_SNAP2 +
            data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_BOTH +
            data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_SNAP1 +
            data.FOOT.NOCOINCIDENT_BIND.NOCOINCIDENT_BIND_SNAP1 +
            data.FOOT.NOCOINCIDENT_BIND.NOCOINCIDENT_BIND_SNAP2;

        return [{
            name: 'Querys', colorByPoint: true,
            data: [{
                name: 'OK',
                y: data.FOOT.COINCIDENT_OK.COINCIDENT_OK_NUMBER,
                color: 'green'
            }, {
                name: 'Wrong',
                y: wrong,
                color: 'red'
            }]
        }];
    };
    factory.formatChartHeader4 = function (data) {
        var colorA = '#337ab7';
        return [{
            data: [{
                name: 'Snap 1',
                y: data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_SNAP1,
                color: colorA
            }, {
                name: 'Snap 2',
                y: data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_SNAP2,
                color: colorA
            }, {
                name: 'Both',
                y: data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_BOTH,
                color: colorA
            }]
        }];
    };
    factory.formatChartHeader5 = function (data) {
        var colorA = '#337ab7';
        return [{
            name: 'Querys', colorByPoint: true,
            data: [{
                name: 'Sqlid snap 1',
                y: data.FOOT.NOCOINCIDENT_SQLID.NOCOINCIDENT_SQLID_SNAP1,
                color: colorA
            }, {
                name: 'Sqlid snap 2',
                y: data.FOOT.NOCOINCIDENT_SQLID.NOCOINCIDENT_SQLID_SNAP2,
                color: colorA
            }, {
                name: 'Bind snap 1',
                y: data.FOOT.NOCOINCIDENT_BIND.NOCOINCIDENT_BIND_SNAP1,
                color: colorA
            }, {
                name: 'Bind snap 2',
                y: data.FOOT.NOCOINCIDENT_BIND.NOCOINCIDENT_BIND_SNAP2,
                color: colorA
            }]
        }];
    };


    return factory;
});