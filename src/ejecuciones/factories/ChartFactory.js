

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
        return [{
            name: 'Querys', colorByPoint: true,
            data: [{
                name: 'TOTAL SNAP_1',
                y: 24000
            }, {
                name: 'TOTAL SNAP_2',
                y: 25000
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
                name: 'WRONG',
                y: wrong,
                color: 'red'
            }]
        }];
    };
    factory.formatChartHeader4 = function (data) {

        return [{
            name: 'Querys', colorByPoint: true,
            data: [{
                name: 'SNAP_1',
                y: data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_SNAP1
            }, {
                name: 'SNAP_2',
                y: data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_SNAP2
            }, {
                name: 'BOTH',
                y: data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_BOTH
            }]
        }];
    };
    factory.formatChartHeader5 = function (data) {

        return [{
            name: 'Querys', colorByPoint: true,
            data: [{
                name: 'SQLID_SNAP_1',
                y: data.FOOT.NOCOINCIDENT_SQLID.NOCOINCIDENT_SQLID_SNAP1
            }, {
                name: 'SQLID_SNAP_2',
                y: data.FOOT.NOCOINCIDENT_SQLID.NOCOINCIDENT_SQLID_SNAP2
            }, {
                name: 'BIND_SNAP_1',
                y: data.FOOT.NOCOINCIDENT_BIND.NOCOINCIDENT_BIND_SNAP1
            }, {
                name: 'BIND_SNAP_2',
                y: data.FOOT.NOCOINCIDENT_BIND.NOCOINCIDENT_BIND_SNAP2
            }]
        }];
    };
    return factory;
});