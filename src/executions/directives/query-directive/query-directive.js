angular.module('app').directive('queryDirective', function () {
    return {
        bindToController: true,
        controller: QuerysController,
        controllerAs: 'qc',
        restrict: 'E',
        scope: {
            query: '='
        },
        templateUrl: function (elem, attr) {
            return './executions/directives/query-directive/query-directive.html';
        }
    };

    function QuerysController($scope, $stateParams, $state) {

        var qc = this;
        qc.showBinds = false;
        $scope.$watch('qc.query', function (newVal, oldVal) {
            qc.query = newVal;
            qc.binds = qc.getBinds();
            qc.bindsVars = qc.getBindVars(qc.binds);
            qc.getPlans();
        });

        qc.getBinds = function () {
            var result = [];
            if (!Array.isArray(qc.query.sql_id.binds)) {
                result = [qc.query.sql_id.binds];
            } else {
                result = qc.query.sql_id.binds
            }
            return result;
        }

        qc.getBindVars = function (binds) {
            var result = [];
            for (let i = 0; i < binds.length; i++) {
                if (binds[i].bind_children) {
                    result[i] = binds[i];
                    if (!Array.isArray(binds[i].bind_children)) {
                        binds[i].bind_children = [binds[i].bind_children];
                    }
                } else {
                    binds[i].bind_children = false;
                }
            }
            for (let i = 0; i < result.length; i++) {
                qc['showBinds' + i] = false;
            }
            return result;
        }
        qc.getPlans = function () {
            if (qc.query.sql_id.binds.bind_children) {
                qc.binds = qc.query.sql_id.binds.bind_children;
                if (!Array.isArray(qc.binds)) {
                    qc.binds = [qc.binds];
                }
            } else {
                qc.binds = false;
            }
        }

        qc.toggleShowBinds = function (index) {
            qc['showBinds' + index] = !qc['showBinds' + index]
        }
        qc.isVisible = function (index) {
            return qc['showBinds' + index];
        }

        qc.getRound = function(data, executions){
            return Math.floor((data / executions) * 100) / 100;
        }
    }
});
