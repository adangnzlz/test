angular.module('app').controller("EjecucionesCtrl", function ($scope, $stateParams, $state, ejecucionesService, chartFactory) {

    var ec = this;


    ec.formatData = function (data) {
        var data = data.REPORT;
        data.HEADER = data.HEADER;
        data.HEADER.WORK = Object.entries(data.HEADER.WORK)
        data.BODY = data.BODY;
        data.FOOT = data.FOOT;
        return data
    }

    $scope.left = "bsdfasfsadf";

    $scope.right = "asdfasfsadf";

    ec.createChartHeader1 = function (data) {
        var series = chartFactory.formatChartHeader1(data);
        Highcharts.chart('header-chart-1', {
            chart: { type: 'column' },
            title: { text: 'COINCIDENT OK' },
            xAxis: {
                categories: ['IMPROVED', 'UNCHANGUED', 'REGRESSED'], title: {
                    text: '<p>Total number of querys : <b>' + data.FOOT.COINCIDENT_OK.COINCIDENT_OK_NUMBER +
                        '</b></p><p>Total sum : <b>' + data.FOOT.COINCIDENT_OK.COINCIDENT_OK_SUM +
                        '</b></p>', useHTML: true
                }
            },

            yAxis: { title: { text: 'Number of querys' } },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },

            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },

            series: series


        });
    }
    ec.createChartHeader2 = function (data) {
        var data = chartFactory.formatChartHeader2(data);
        Highcharts.chart('header-chart-2', {
            chart: { type: 'column' },
            title: { text: 'TOTAL SNAPSHOTS' },
            xAxis: { type: 'category' },
            yAxis: { title: { text: 'Number of querys' } },
            legend: { enabled: false },
            plotOptions: { series: { borderWidth: 0, dataLabels: { enabled: true } } },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b><br/>'
            },
            series: data
        });
    }
    ec.createChartHeader3 = function (data) {
        var data = chartFactory.formatChartHeader3(data);
        Highcharts.chart('header-chart-3', {
            chart: { type: 'column' },
            title: { text: 'OK/WRONG' },
            xAxis: { type: 'category' },
            yAxis: { title: { text: 'Number of querys' } },
            legend: { enabled: false },
            plotOptions: { series: { borderWidth: 0, dataLabels: { enabled: true } } },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b><br/>'
            },
            series: data
        });
    }
    ec.createChartHeader4 = function (data) {
        var data = chartFactory.formatChartHeader4(data);
        Highcharts.chart('header-chart-4', {
            chart: { type: 'column' },
            title: { text: 'ERROR BY TYPE' },
            xAxis: { type: 'category' },
            yAxis: { title: { text: 'Number of querys' } },
            legend: { enabled: false },
            plotOptions: { series: { borderWidth: 0, dataLabels: { enabled: true } } },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b><br/>'
            },
            series: data
        });
    }
    ec.createChartHeader5 = function (data) {
        var data = chartFactory.formatChartHeader5(data);
        Highcharts.chart('header-chart-5', {
            chart: { type: 'column' },
            title: { text: 'NO COINCIDENT' },
            xAxis: { type: 'category' },
            yAxis: { title: { text: 'Number of querys' } },
            legend: { enabled: false },
            plotOptions: { series: { borderWidth: 0, dataLabels: { enabled: true } } },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b><br/>'
            },
            series: data
        });
    }



    ejecucionesService.getData().success(function (data) {
        ec.data = ec.formatData(data)
        ec.createChartHeader1(ec.data);
        ec.createChartHeader2(ec.data);
        ec.createChartHeader3(ec.data);
        ec.createChartHeader4(ec.data);
        ec.createChartHeader5(ec.data);
        // var one = ec.data.BODY.COINCIDENT.COINCIDENT_OK.QUERY[0].sql_id.binds.PLAN.plan_snapshot1.plan_lines.plan_lines.toString().split(",").join("\n");
        // other = ec.data.BODY.COINCIDENT.COINCIDENT_OK.QUERY[0].sql_id.binds.PLAN.plan_snapshot1.plan_lines.plan_lines.toString().split(",").join("\n");
        // other = other.replace("Id", "Id2");
        // color = '', span = null;
        // var diff = JsDiff.diffLines(one, other),
        //     display = document.getElementById('display'),
        //     fragment = document.createDocumentFragment();

        // diff.forEach(function (part) {
        //     // green for additions, red for deletions
        //     // grey for common parts
        //     color = part.added ? 'green' :
        //         part.removed ? 'red' : 'grey';
        //     span = document.createElement('span');
        //     span.style.color = color;
        //     span.appendChild(document
        //         .createTextNode(part.value));
        //     fragment.appendChild(span);
        // });

        // display.appendChild(fragment);
    });


});
