angular.module('app').controller("SnapshotsParametersCtrl", function ($scope,$stateParams,vertxEventBusService,$state,actionData) {
    console.log("entra en ParametersCtrl");

           if(sessionStorage.logado===undefined)
                 {
                     //si no esta logado, redirige al login.
                     $state.go("Login");
                 }
                 else{
                     if($scope.refreshPage){
                         $scope.refreshPage(5);
                        $scope.SelectedWorkNameURL = decodeURIComponent($stateParams.SelectedWorkName);
                         $scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);
                      //  vertxEventBusService.send('work_actions', {VERTX_ACTION: 'select_detailname', ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),WORK_NAME:sessionStorage.SelectedWorkName});
                           //$scope.SeeSnapshotsParameters = function(){
                            //   $scope.currentPage = num;
                               $scope.Parameter="YES";
                               $scope.Execution="NO";
                               $scope.idSnapshotURL = decodeURIComponent($stateParams.idSnapshot);
                               vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: "select_snapshot_detail", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString(), ID_WORK: sessionStorage.SelectedIdWork, ID_SNAPSHOT: $scope.idSnapshotURL});

                              // Lanza la llamada para los parametros de los snapshots
                           //   console.log("ID_SNAPSHOT: "+$scope.idSnapshotURL);
                               vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: "select_snapparams", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString(), ID_WORK: sessionStorage.SelectedIdWork, ID_SNAPSHOT: $scope.idSnapshotURL});
                         //      console.log('snapshot_actions', {VERTX_ACTION: "select_snapparams", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString(), ID_WORK: sessionStorage.SelectedIdWork, ID_SNAPSHOT: $scope.idSnapshotURL});
                       //};

                      // $scope.SeeSnapshotsParameters();
                        }
                     
                 }
});


