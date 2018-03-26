/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('app').controller("SnapshotsExecutionsCtrl", function ($scope,$stateParams,vertxEventBusService,$state,actionData) {
    

           if(sessionStorage.logado===undefined)
                 {
                     //si no esta logado, redirige al login.
                     $state.go("Login");
                 }
                 else{
                     $scope.refreshPage(5);
                      $scope.idSnapshotURL = decodeURIComponent($stateParams.idSnapshot); //Lanza la llamada para los detalles de la ejecucion
                     vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: "select_snapshot_detail", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString(), ID_WORK: sessionStorage.SelectedIdWork, ID_SNAPSHOT: $scope.idSnapshotURL});
                     // console.log({VERTX_ACTION: "select_snapshot_detail", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString(), ID_WORK: sessionStorage.SelectedIdWork, ID_SNAPSHOT: $scope.idSnapshotURL});
                    //$scope.SelectedWorkNameURL = decodeURIComponent($stateParams.SelectedWorkName);
                      $scope.SelectedWorkNameURL = sessionStorage.SelectedWorkName;
                      $scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);
                     vertxEventBusService.send('work_actions', {VERTX_ACTION: 'select_detailname', ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),WORK_NAME:$scope.SelectedWorkName});
                     //console.log({VERTX_ACTION: 'select_detailname', ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),WORK_NAME:$scope.SelectedWorkName});
  //$scope.SeeSnapshotsExecutionDetails = function(){
                          //  $scope.currentPage = num;
                            $scope.Execution="YES";
                            $scope.Parameter="NO";
                            $scope.pageNumber = 1;
                           
                            vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: "select_snapdet", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString(), ID_WORK: sessionStorage.SelectedIdWork, ID_SNAPSHOT: $scope.idSnapshotURL});
                         //   console.log({VERTX_ACTION: "select_snapdet", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString(), ID_WORK: sessionStorage.SelectedIdWork, ID_SNAPSHOT: $scope.idSnapshotURL});
                        //};
                    
                  //  $scope.SeeSnapshotsExecutionDetails();
                 }
});





 