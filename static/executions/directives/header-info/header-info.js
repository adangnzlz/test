angular.module('app').directive('headerInfo', function () {
    return {
        bindToController: true,
        controller: HeaderInfoExecutions,
        controllerAs: 'hic',
        restrict: 'E',
        scope: {
            data : '='
        },
        templateUrl: function (elem, attr) {
            return './executions/directives/header-info/header-info.html';
        }
    };

    function HeaderInfoExecutions($scope, $stateParams, $state) {

        var hic = this;
        hic.loaded = false;

        $scope.$watch('hic.data', function (newVal, oldVal) {
            if (hic.data) {
                hic.loaded = true;
            }
        });  

        hic.firstUppercase = function (str) {
            str = str.toLowerCase();
            str = str.charAt(0).toUpperCase() + str.slice(1);
            str = str.split('_').join(' ');
            return str;
        }
    }
});