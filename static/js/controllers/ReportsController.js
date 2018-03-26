angular.module('app').controller("ReportsCtrl", function ($scope,$stateParams,$state) {
    console.log("enta en ReportsCtrl");
                   
           if(sessionStorage.logado===undefined)
                 {
                     $state.go("Login");
                 }
                 else{   
                     console.log("entra en reportsctrl");
//                    //$scope.refreshPage('','');
                    $scope.refreshPage(20);
//                    //$scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);
//                    $scope.ActiveTab = "Reports";               
//                        $scope.tabSnapshots = false;
//                        $scope.tabQuerys = false;
//                        $scope.tabReports = true;
                        
                 }
});
