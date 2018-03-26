angular.module('app').controller("SnapshotsCtrl", function ($scope,$stateParams,vertxEventBusService,$state,actionData) {
    console.log("enta en SnapshotsCtrl");

           if(sessionStorage.logado===undefined)
                 {
                     $state.go("Login");
                 }
                 else{
                     $scope.$on('error', function(ev, args) {
                         $scope.Progress = false;
                         console.log("el error en snapshotscontroller es " + args.error);
                         $scope.Error = args.error;
                     });
                        //LLAMO AL REFRESHPAGE DEL MAIN
                        if($scope.refreshPage){
                            $scope.refreshPage(4);
                        }
                        
                        //COJO EL WORKNAME DE LA URL
                        $scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);
                      //  vertxEventBusService.send('work_actions', {VERTX_ACTION: 'select_detailname', ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),WORK_NAME:$scope.SelectedWorkName});
                        //HAGO LA SELECT DE TODOS LOS SNAPSHOTS
                        vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.SelectedIdWork, ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString()});
                   
                    //NEW SNAPSHOT 
                    $scope.NewSnapshot = function(){
                        //alert("Funcion de crear snapshot en snapshotController");
                          $scope.Progress = true;            
                          $scope.Error = "";
                        //console.log("Estamos en la funcion new Snapshot de snapshot Controller");
                        var new_snapshot_description = myTrim(document.getElementById("SNAPSHOT_DESCRIPTION").value);
						//console.log("new var");
                        validaVacio("Snapshots","add","",new_snapshot_description,$scope);
						//console.log("vallida vacio");
                            if($scope.SnapshotAddOK === true)
                            {
								  //console.log("send bus");
                                  vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'add',ID_WORK: sessionStorage.SelectedIdWork, SNAPSHOT_DESCRIPTION: new_snapshot_description,ID_SES:sessionStorage.idSesion, ID_CON: actionData.getIdCon().toString()});
								  //console.log("finish bus");
                                  $scope.Progress = false;
                                  $scope.SnapshotAddOK = false;
                           }
                   };  
                 //EDIT SNAPSHOT  
                    $scope.EditSnapshot = function(data){
                        $scope.Error="";     
                        $scope.Progress = true;                
                        var new_snapshot_description = myTrim(document.getElementById("new_SNAPSHOT_DESCRIPTION").value);
                        validaVacio("Snapshots","edit","",new_snapshot_description,$scope);

                         if($scope.SnapshotEditOK === true)
                         {
                            $scope.Progress = true; 
                            vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'modify', ID_WORK: sessionStorage.SelectedIdWork,ID_SNAPSHOT:data.ID_SNAPSHOT.toString(),  SNAPSHOT_DESCRIPTION: new_snapshot_description,ID_SES:sessionStorage.idSesion, ID_CON: actionData.getIdCon().toString()});
                            $scope.Progress = false;
                         }
                     };   
                   // DELETE SNAPSHOTS
                   $scope.DeleteSnapshot = function(data){                 
                        $scope.Progress = true;                   
                        vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'delete', ID_SNAPSHOT: data.ID_SNAPSHOT.toString(),ID_WORK:sessionStorage.SelectedIdWork,ID_SES:sessionStorage.idSesion, ID_CON: actionData.getIdCon().toString()});                 
                        $scope.Progress = false;
                    };
}

});
