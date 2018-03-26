angular.module('app').controller("PieCtrl", function ($scope) {
  $scope.labels = ["Mejoran", "No Mejoran", "Empeoran"];
  $scope.data = [300, 500, 100];
  $scope.labels2 = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data2 = [3, 5, 80];
});