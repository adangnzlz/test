
angular.module('app').service('executionsService', ['$http', function ($http) {
    return {
        getData: function () {

            return $http({
                url: 'data/result.json',
                method: 'GET'
            });
        }
    }
}]);