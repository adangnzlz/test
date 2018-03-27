
angular.module('app').service('ejecucionesService', ['$http', function ($http) {
    return {
        getData: function () {

            return $http({
                url: 'data/result.json',
                method: 'GET'
            });
        }
    }
}]);