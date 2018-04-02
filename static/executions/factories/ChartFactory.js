

angular.module('app').factory('chartFactory', function ($http) {
    var factory = {};

    var callback = function () {
        var chartInstance = this.chart, ctx = chartInstance.ctx;
        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        this.data.datasets.forEach(function (dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillStyle = "#fff";
                ctx.fillText(data, bar._model.x, bar._model.y + 20);
            });
        });
    }
    factory.animation = {
        onComplete: callback,
        onProgress: callback
    };

    factory.formatChartHeader1 = function (data) {
        var colorA = '#337ab7';
        var colorB = '#f0ad4e';
        var result = {};
        result.dataset = [
            [data.FOOT.COINCIDENT_OK.COINCIDENT_OK_IMPROVE_SAMEPLAN,
            data.FOOT.COINCIDENT_OK.COINCIDENT_OK_EQUAL_SAMEPLAN,
            data.FOOT.COINCIDENT_OK.COINCIDENT_OK_REGRET_SAMEPLAN],
            [data.FOOT.COINCIDENT_OK.COINCIDENT_OK_IMPROVE_DIFPLAN,
            data.FOOT.COINCIDENT_OK.COINCIDENT_OK_EQUAL_DIFPLAN,
            data.FOOT.COINCIDENT_OK.COINCIDENT_OK_REGRET_DIFPLAN]
        ];
        result.datasetOverride = [
            {
                label: "Same plan",
                backgroundColor: colorA,
                borderColor: 'rgba(0,0,0,0)',
                data: [data.FOOT.COINCIDENT_OK.COINCIDENT_OK_IMPROVE_SAMEPLAN,
                data.FOOT.COINCIDENT_OK.COINCIDENT_OK_EQUAL_SAMEPLAN,
                data.FOOT.COINCIDENT_OK.COINCIDENT_OK_REGRET_SAMEPLAN],
                stack: 1
            }, {
                label: "Diff plan",
                backgroundColor: colorB,
                borderColor: 'rgba(0,0,0,0)',
                data: [data.FOOT.COINCIDENT_OK.COINCIDENT_OK_IMPROVE_DIFPLAN,
                data.FOOT.COINCIDENT_OK.COINCIDENT_OK_EQUAL_DIFPLAN,
                data.FOOT.COINCIDENT_OK.COINCIDENT_OK_REGRET_DIFPLAN],
                stack: 2
            },
        ];


        return result;

    };
    factory.formatChartHeader2 = function (data, options) {
        var colorA = '#f0ad4e';
        var colorB = '#337ab7';
        var result = [];
        result.dataset = [[data.FOOT.COINCIDENT_OK.COINCIDENT_OK_SUM_SNAP1, data.FOOT.COINCIDENT_OK.COINCIDENT_OK_SUM_SNAP2]];
        result.datasetOverride = [
            {
                label: "Amount",
                backgroundColor: [colorA, colorB],
                borderColor: 'rgba(0,0,0,0)',
                hoverBackgroundColor: [colorA, colorB],
                data: [data.FOOT.COINCIDENT_OK.COINCIDENT_OK_SUM_SNAP1, data.FOOT.COINCIDENT_OK.COINCIDENT_OK_SUM_SNAP2]
            },
        ];
        options.title.text = "Amount of " + data.HEADER.COMPARE_METHOD.toLowerCase();
        options.scales.yAxes[0].scaleLabel.labelString = "Total " + data.HEADER.COMPARE_METHOD.toLowerCase();
        options.scales.yAxes[0].ticks.max = Math.max(data.FOOT.COINCIDENT_OK.COINCIDENT_OK_SUM_SNAP1, data.FOOT.COINCIDENT_OK.COINCIDENT_OK_SUM_SNAP2) + 5000;
        result.options = options;
        return result;
    };

    factory.formatChartHeader3 = function (data) {
        var colorA = 'green';
        var colorB = 'red';
        var result = [];

        var wrong = data.FOOT.NOCOINCIDENT_SQLID.NOCOINCIDENT_SQLID_SNAP2 +
            data.FOOT.NOCOINCIDENT_SQLID.NOCOINCIDENT_SQLID_SNAP2 +
            data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_SNAP2 +
            data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_BOTH +
            data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_SNAP1 +
            data.FOOT.NOCOINCIDENT_BIND.NOCOINCIDENT_BIND_SNAP1 +
            data.FOOT.NOCOINCIDENT_BIND.NOCOINCIDENT_BIND_SNAP2;


        result.dataset = [[data.FOOT.COINCIDENT_OK.COINCIDENT_OK_NUMBER, wrong]];
        result.datasetOverride = [
            {
                label: "Amount",
                backgroundColor: [colorA, colorB],
                borderColor: 'rgba(0,0,0,0)',
                hoverBackgroundColor: [colorA, colorB],
                data: [data.FOOT.COINCIDENT_OK.COINCIDENT_OK_NUMBER, wrong]
            },
        ];
        return result;
    };
    factory.formatChartHeader4 = function (data) {

        var colorA = '#f0ad4e';
        var colorB = '#337ab7';
        var result = [];
        result.dataset = [[data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_SNAP1, data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_SNAP2, data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_BOTH]];
        result.datasetOverride = [
            {
                label: "Amount",
                backgroundColor: [colorA, colorB, colorA],
                borderColor: 'rgba(0,0,0,0)',
                hoverBackgroundColor: [colorA, colorB, colorA],
                data: [data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_SNAP1, data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_SNAP2, data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_BOTH]
            },
        ];
        return result;

        // var colorA = '#337ab7';
        // return [{
        //     data: [{
        //         name: 'Snap 1',
        //         y: data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_SNAP1,
        //         color: colorA
        //     }, {
        //         name: 'Snap 2',
        //         y: data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_SNAP2,
        //         color: colorA
        //     }, {
        //         name: 'Both',
        //         y: data.FOOT.COINCIDENT_ERROR.COINCIDENT_ERROR_BOTH,
        //         color: colorA
        //     }]
        // }];
    };

    return factory;
});