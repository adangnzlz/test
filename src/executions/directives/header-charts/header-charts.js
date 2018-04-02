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

        hcc.onClickChart3 = function (category, plan) {
            switch (category) {
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
            hcc.title = category + ' ' + plan;
            $scope.$emit('changeQuerys', { querys: hcc.querys, title: hcc.title });
        }

        hcc.onClickChart2 = function (category) {
            switch (category) {
                case 'OK':
                    hcc.querys = hcc.getQuerys(hcc.data.BODY.COINCIDENT.COINCIDENT_OK.QUERY)
                    hcc.title = 'Querys OK';
                    break;
                case 'Wrong':
                    hcc.querys = hcc.getQuerys(hcc.data.BODY.COINCIDENT.COINCIDENT_ERROR.QUERY)
                    hcc.title = 'Querys with errors';
                    break;
                default:
                    break;
            }
            $scope.$emit('changeQuerys', { querys: hcc.querys, title: hcc.title });
        }

        hcc.getQuerys = function (querys, type, planType) {
            var querysResult = [];
            if (!querys) {
                querys = [];
            }
            if (planType === 'Same plan') {
                querysResult = querys.filter((item) => {
                    result = false;
                    return (item.sql_id.binds.PLAN ? item.sql_id.binds.PLAN.SAME_PLAN === 'Y' : false);
                });
            } else if (planType === 'Diff plan') {
                querysResult = querys.filter((item) => {
                    return item.sql_id.binds.PLAN ? item.sql_id.binds.PLAN.SAME_PLAN !== 'Y' : false;
                });
            } else {
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

        hcc.createChart1 = function (data) {
            hcc.chart2 = {};
            hcc.chart2.labels = ["Snapshot 1", "Snapshot 2"];
            hcc.chart2.options = {
                title: { display: true, text: "Amount of ", fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontColor: "#000", fontSize: 17, fontStyle: 'normal' },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: function (label, index, labels) {
                                return label / 1000 + 'k';
                            }
                        },
                        scaleLabel: { display: true, labelString: 'Number of querys', fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontColor: "#000" }
                    }
                    ]
                },
                animation: chartFactory.animation
            };
        }


        hcc.createChart2 = function (data) {
            hcc.chart3 = {};
            hcc.chart3.labels = ["OK", "Wrong"];
            hcc.chart3.options = {
                title: { display: true, text: "Total queries", fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontColor: "#000", fontSize: 17, fontStyle: 'normal' },
                scales: {
                    yAxes: [{
                        ticks: { beginAtZero: true },
                        scaleLabel: { display: true, labelString: 'Number of querys', fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontColor: "#000" }
                    }]
                },
                hover: { onHover: function (e) { $("#canvas2").css("cursor", e[0] ? "pointer" : "default"); } },
                animation: chartFactory.animation,
                onClick: function (e, array) {
                    var element = this.getElementAtEvent(e);
                    if (element.length) {
                        hcc.onClickChart2(element[0]._model.label);
                    }

                }
            };
        }

        hcc.createChart3 = function (data) {

            hcc.chart1 = {};
            hcc.chart1.labels = ["Improved", "Unchangued", "Regressed"];
            hcc.chart1.options = {
                title: { display: true, text: "Queries OK", fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontColor: "#000", fontSize: 17, fontStyle: 'normal' },
                legend: {
                    display: true, text: "Queries OK", fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontColor: "#000", position: 'bottom'
                },
                scales: {
                    xAxes: [{ stacked: true }],
                    yAxes: [{ stacked: true, scaleLabel: { display: true, labelString: 'Number of querys', fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontColor: "#000" } }]
                },
                hover: { onHover: function (e) { $("#canvas3").css("cursor", e[0] ? "pointer" : "default"); } },
                animation: chartFactory.animation,
                onClick: function (e, array) {
                    var element = this.getElementAtEvent(e);
                    if (element.length) {
                        hcc.onClickChart3(element[0]._model.label, element[0]._model.datasetLabel);
                    }

                }
            };

        }



        hcc.createChart4 = function (data) {
            hcc.chart4 = {};
            hcc.chart4.labels = ["Snapshot 1", "Snapshot 2", "Both"];
            hcc.chart4.options = {
                title: { display: true, text: "Queries wrong", fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontColor: "#000", fontSize: 17, fontStyle: 'normal' },
                scales: {
                    yAxes: [{
                        ticks: { beginAtZero: true },
                        scaleLabel: { display: true, labelString: 'Number of querys', fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", fontColor: "#000" }
                    }]
                },
                animation: chartFactory.animation
            };

        }


        $scope.$watch('hcc.data', function (newVal, oldVal) {
            if (hcc.data) {
                var chartData1 = chartFactory.formatChartHeader1(hcc.data);
                hcc.chart1.data = chartData1.dataset;
                hcc.chart1.datasetOverride = chartData1.datasetOverride;


                var chartData2 = chartFactory.formatChartHeader2(hcc.data, hcc.chart2.options);
                hcc.chart2.data = chartData2.dataset;
                hcc.chart2.datasetOverride = chartData2.datasetOverride;
                hcc.chart2.options = chartData2.options;


                var chartData3 = chartFactory.formatChartHeader3(hcc.data);
                hcc.chart3.data = chartData3.dataset;
                hcc.chart3.datasetOverride = chartData3.datasetOverride;

                var chartData4 = chartFactory.formatChartHeader4(hcc.data);
                hcc.chart4.data = chartData4.dataset;
                hcc.chart4.datasetOverride = chartData4.datasetOverride;
            }
        });

        hcc.createChart1(hcc.data);
        hcc.createChart2(hcc.data);
        hcc.createChart3(hcc.data);
        hcc.createChart4(hcc.data);

    }
});