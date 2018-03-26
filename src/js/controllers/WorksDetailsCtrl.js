angular.module('app').controller("WorksDetailsCtrl", function ($scope,$stateParams,vertxEventBusService,$state,$timeout,actionData) {
    console.log("enta en WorksDetailsCtrl");

           if(sessionStorage.logado===undefined)
                 {
                     $state.go("Login");
                 }
                 else{
                     
//                     $scope.$on('error', function(ev, args) {
//                         
//                         console.log("el error en snapshotscontroller es " + args.error);
//                         $scope.Error = args.error;
//                     });
                      //  $scope.refreshPage('','');
                      $scope.refreshPage(3);
                      //  $scope.SnapshotsPage = true;
                      //  $scope.Detailed = true;
 $scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);
                        console.log('$scope.SelectedWorkName vale ',$scope.SelectedWorkName);
                  //   vertxEventBusService.send('work_actions', {VERTX_ACTION: 'select_detailname', ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),WORK_NAME:$scope.SelectedWorkName});
                        $scope.ActiveTab = "Snapshots";               
                        $scope.tabSnapshots = false;
                        $scope.tabQuerys = false;
                        $scope.tabWorksDetails = true;
                       // console.log({VERTX_ACTION: "select_detail", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString(),ID_WORK: sessionStorage.SelectedIdWork});
                        vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_detail", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString(),ID_WORK: sessionStorage.SelectedIdWork});
                        
                        //{"VERTX_ACTION":"select_detail","ID_SES":"1","ID_CON":"1","ID_WORK":"4"}
                   
}

});
