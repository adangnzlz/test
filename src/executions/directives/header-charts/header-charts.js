angular.module('app').directive('headerCharts', function () {
    return {
        bindToController: true,
        controller: HeaderChartsController,
        controllerAs: 'hcc',
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: function (elem, attr) {
            return './executions/directives/header-charts/header-charts.html';
        }
    };

    function HeaderChartsController($scope, $stateParams, $state, chartFactory) {

        var hcc = this;

        hcc.createChartHeader1 = function (data) {
            var colorA = '#337ab7';
            var colorB = '#f0ad4e';
            var series = chartFactory.formatChartHeader1(data, colorA, colorB);
            var style = data.FOOT.COINCIDENT_OK.COINCIDENT_OK_SUM > 0 ? 'fa-arrow-up' : 'fa-arrow-down';
            var color = data.FOOT.COINCIDENT_OK.COINCIDENT_OK_SUM > 0 ? 'green' : 'red';
            Highcharts.chart('header-chart-1', {
                chart: { type: 'column' },
                title: { text: 'Coincident ok' },
                xAxis: {
                    categories: ['Improved', 'Unchangued', 'Regressed'], title: {
                        text: '<p>Total number of querys : <b>' + data.FOOT.COINCIDENT_OK.COINCIDENT_OK_NUMBER +
                            '</b></i></p><p>Total sum : <b class="' + color + '">' + data.FOOT.COINCIDENT_OK.COINCIDENT_OK_SUM +
                            '</b><i class="fa ' + style + '"></p>', useHTML: true
                    }
                },
                yAxis: {
                    title: { text: 'Number of querys' },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    } },
                tooltip: { formatter: function () { return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + this.y + '<br/>' + 'Total: ' + this.point.stackTotal; } },
                plotOptions: {
                    column: {
                        stacking: 'normal', cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    hcc.onClickChart1(this, colorA, colorB);
                                }
                            }
                        }
                    }
                },
                series: series
            });
        }
        hcc.createChartHeader2 = function (data) {
            var data = chartFactory.formatChartHeader2(data);
            Highcharts.chart('header-chart-2', {
                chart: { type: 'column' },
                title: { text: 'Total snapshots' },
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
        hcc.createChartHeader3 = function (data) {
            var data = chartFactory.formatChartHeader3(data);
            Highcharts.chart('header-chart-3', {
                chart: { type: 'column' },
                title: { text: 'Ok/Wrong' },
                xAxis: { type: 'category' },
                yAxis: {
                    title: { text: 'Number of querys' },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }},
                legend: { enabled: false },
                plotOptions: {
                    column: {
                        stacking: 'normal', cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    hcc.onClickChart3(this);
                                }
                            }
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b><br/>'
                },
                series: data
            });
        }
        hcc.createChartHeader4 = function (data) {
            var data = chartFactory.formatChartHeader4(data);
            Highcharts.chart('header-chart-4', {
                chart: { type: 'column' },
                title: { text: 'Error by type' },
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
        hcc.createChartHeader5 = function (data) {
            var data = chartFactory.formatChartHeader5(data);
            Highcharts.chart('header-chart-5', {
                chart: { type: 'column' },
                title: { text: 'No coincident' },
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

        hcc.onClickChart1 = function (event, colorA, colorB) {
            var plan = event.color === colorA ? 'Same plan' : 'Diff plan';
            switch (event.category) {
                case 'Improved':
                    hcc.querys = hcc.getQuerys(hcc.data.BODY.COINCIDENT.COINCIDENT_OK.QUERY, 'IMPROVED', plan)
                    break;
                case 'Unchangued':
                    hcc.querys = hcc.getQuerys(hcc.data.BODY.COINCIDENT.COINCIDENT_OK.QUERY, 'UNCHANGUED', plan)
                    break;
                case 'Regresed':
                    hcc.querys = hcc.getQuerys(hcc.data.BODY.COINCIDENT.COINCIDENT_OK.QUERY, 'REGRESSED', plan)
                    break;
                default:
                    break;
            }
            hcc.title = event.category + ' ' + plan;
            $scope.$emit('changeQuerys', { querys: hcc.querys, title: hcc.title });
        }

        hcc.onClickChart3 = function (event) {
            switch (event.category) {
                case 0:
                    hcc.querys = hcc.getQuerys(hcc.data.BODY.COINCIDENT.COINCIDENT_OK.QUERY)
                    hcc.title = 'Coincident OK (excluded errors)';
                    break;
                case 1:
                    hcc.querys = hcc.getQuerys(hcc.data.BODY.COINCIDENT.COINCIDENT_ERROR.QUERY)
                    hcc.title = 'Coincident error';
                    break;
                default:
                    break;
            }
           
            console.log(hcc.title)
            console.log(hcc.querys.length);
            $scope.$emit('changeQuerys', { querys: hcc.querys, title: hcc.title });
        }

        hcc.getQuerys = function (querys, type, planType) {
            var querysResult = [];
            if (!querys){
                querys = [];
            }
            if (planType === 'Same plan') {
                querysResult = querys.filter((item) => {
                    result = false;
                    return (item.sql_id.binds.PLAN ? item.sql_id.binds.PLAN.SAME_PLAN === 'Y' : false);
                });
            } else if (planType === 'Diff plan'){
                querysResult = querys.filter((item) => {
                    return item.sql_id.binds.PLAN ? item.sql_id.binds.PLAN.SAME_PLAN !== 'Y' : false;
                });
            }else{
                querysResult = querys;
            }
            querysResult = querysResult.filter((item) => {
                result = false;
                if (!type) {
                    result = true;
                } else {
                    switch (type) {
                        case 'IMPROVED':
                            result = (item.sql_id.binds.STATS.stats_compare.impact_sql > 0);
                            break;
                        case 'UNCHANGUED':
                            result = (item.sql_id.binds.STATS.stats_compare.impact_sql === 0);
                            break;
                        case 'REGRESSED':
                            result = (item.sql_id.binds.STATS.stats_compare.impact_sql < 0);
                            break;
                        default:
                            break;
                    }
                }

                return result;
            });
            return querysResult;
        }

        hcc.getDifPlan = function (type) {
            var difPlan = ec.data.BODY.COINCIDENT.COINCIDENT_OK.QUERY.filter((item) => {
                return item.sql_id.binds.PLAN ? item.sql_id.binds.PLAN.SAME_PLAN !== 'Y' : false;
            });
            return difPlan;
        }

        hcc.formatData = function (data) {
            var data = data.REPORT;
            data.HEADER = data.HEADER;
            data.HEADER.WORK = Object.entries(data.HEADER.WORK)
            data.BODY = data.BODY;
            data.FOOT = data.FOOT;
            return data
        }


        $scope.$watch('hcc.data', function (newVal, oldVal) {
            if (hcc.data) {
                hcc.createChartHeader1(hcc.data);
                hcc.createChartHeader2(hcc.data);
                hcc.createChartHeader3(hcc.data);
                hcc.createChartHeader4(hcc.data);
                hcc.createChartHeader5(hcc.data);
            }
        });

    }
});