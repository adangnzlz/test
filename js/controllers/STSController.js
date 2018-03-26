angular.module('app').controller("STSCtrl", function($scope,vertxEventBusService,actionData,$stateParams,$state){
                   if(sessionStorage.logado=== undefined)
                  {
                      $state.go("Login");
                  }
                  else{
                     //$scope.idSnapshotURL = decodeURIComponent($stateParams.idSnapshot);
                     $scope.refreshPage();
                     $scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);
                     vertxEventBusService.send('work_actions', {VERTX_ACTION: 'select_detailname', ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),WORK_NAME:$scope.SelectedWorkName});
                      $scope.databaseName = sessionStorage.databaseDbname;
                     
                                //vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.SelectedIdWork, ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString()});
                              // vertxEventBusService.send('repository_actions', {VERTX_ACTION:"select_repodb"}); 
                              
                             $scope.TestConnSTS = function(){
                                  $scope.SeeDetails($scope.SelectedWorkName);
                                 sessionStorage.databaseHostname = document.getElementById("HOST_NAME").value;
                                 sessionStorage.databasePort = document.getElementById("PORT").value;
                                 sessionStorage.databaseDbname = document.getElementById("DB_NAME").value;
                                  $scope.databaseName = sessionStorage.databaseDbname;
                                 sessionStorage.databaseUsername = document.getElementById("USER_NAME").value;
                                 sessionStorage.databasePassword = document.getElementById("PASSWD").value;
                                 sessionStorage.databaseService = document.getElementById("SERVICE").value;
                                 vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"test_oracle_conn",HOST_NAME:sessionStorage.databaseHostname,PORT:sessionStorage.databasePort,DB_NAME:sessionStorage.databaseDbname,USER_NAME:sessionStorage.databaseUsername,PASSWD:sessionStorage.databasePassword,ORACLE_SERVICE_SID:sessionStorage.databaseService}); 
                            //    console.log("AWRhostname vale " + $scope.AWRhostname);
                                 //oracle_capture_results
                                 
                                 //console.log("$scope.HOST_NAME vale " + $scope.HOST_NAME);
                                 //console.log("testconawr: " + JSON.stringify({ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"test_oracle_conn",HOST_NAME:document.getElementById("HOST_NAME").value,PORT:document.getElementById("PORT").value,DB_NAME:document.getElementById("DB_NAME").value,USER_NAME:document.getElementById("USER_NAME").value,PASSWD:document.getElementById("PASSWD").value,ORACLE_SERVICE_SID:document.getElementById("SERVICE").value}));
                                //{"ID_SES":"1", "ID_CON":"1", "VERTX_ACTION":"test_oracle_conn", "HOST_NAME":"192.168.1.254", "PORT":"1521", "DB_NAME":"ORCL1", "USER_NAME":"test2","PASSWD":"test2","ORACLE_SERVICE_SID":"SERVICE"}
                                 //vertxEventBusService.send('repository_actions', {VERTX_ACTION:"test_conn",DB_TYPE:document.getElementById("DB_TYPE").value,HOST_NAME:$scope.HOST_NAME,PORT:$scope.PORT,DB_NAME:$scope.DB_NAME,USER_NAME:$scope.USER_NAME,PASSWD:$scope.PASSWD,ORACLE_SERVICE_SID:document.getElementById("SERVICE").value,DEFAULT_REPO:$scope.DEFAULT}); 
                             };
                             
                             if(sessionStorage.connectionOK){
                                 console.log("est� logado en la bbdd");
                                 
                                 $scope.connectionOK = true;
                                 $scope.databasename = sessionStorage.AWRdbname;
                                 vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"select_all_STS",HOST_NAME:sessionStorage.databaseHostname,PORT:sessionStorage.databasePort,DB_NAME:sessionStorage.databaseDbname,USER_NAME:sessionStorage.databaseUsername,PASSWD:sessionStorage.databasePassword,ORACLE_SERVICE_SID:sessionStorage.databaseService}); 
                                //vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"select_all_STS",HOST_NAME:sessionStorage.AWRhostname,PORT:sessionStorage.AWRport,DB_NAME:sessionStorage.AWRdbname,USER_NAME:sessionStorage.AWRusername,PASSWD:sessionStorage.AWRpassword,ORACLE_SERVICE_SID:sessionStorage.AWRservice}); 
                                 // $scope.TestConnAWRsesStor();
                             }
//HAGO LA SELECT DE TODOS LOS SNAPSHOTS
        //vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.SelectedIdWork, ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString()});
        //vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'select_all'});

        console.log("entra en STSCtrl");
                  }
});