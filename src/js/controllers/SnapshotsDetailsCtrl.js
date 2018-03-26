angular.module('app').controller("SnapshotsDetailsCtrl", function ($scope,$stateParams,vertxEventBusService,$state,$timeout,actionData) {
    //console.log("entra en SnapshotsDetailsCtrl");

	console.log("$sessionStorage.gohome: " + sessionStorage.gohome);
           if(sessionStorage.logado===undefined)
                 {
                     //si no esta logado, redirige al login.
                     $state.go("Login");
					 
                 }
            else{
					  if (sessionStorage.gohome===true){
						  console.log("enter if gohome");
						  sessionStorage.gohome=false;
						 $state.go("Home",{});
					 }else{
						 $scope.setActiveSnapTab = function(activeTab){
                           console.log('llega a setActiveSnapTab' , activeTab);
                       // $('#' + activeTab).addClass("active");
                       // $('#' + disabledTab).removeClass("active");
                       if(activeTab === 'ExecutionDetails'){
                           
                           $('#ExecutionDetails').addClass("active");
                           $('#tabSnapshotsExecutions').addClass("active");
                           $('#DatabaseParameters').removeClass("active");
                           $('#tabSnapshotsParams').removeClass("active");
                       }else if(activeTab === 'DatabaseParameters'){
                           
                           $('#tabSnapshotsExecutions').removeClass("active");
                            $('#ExecutionDetails').removeClass("active");
                           $('#DatabaseParameters').addClass("active");
                           $('#tabSnapshotsParams').addClass("active");
                       }
                           sessionStorage.activeTabSnapshotsDetails = activeTab;
                          // $scope.activeSnapTab = activeTab;
                        
                     };
                     
                    $scope.checkInitActiveTab = function(){
                        console.log('llama a checkInitActiveTab y sessionStorage.activeTabSnapshotsDetails vale ' + sessionStorage.activeTabSnapshotsDetails);
                        if(sessionStorage.activeTabSnapshotsDetails===undefined){
                            $scope.setActiveSnapTab('ExecutionDetails');
                        }else{
                            $scope.setActiveSnapTab(sessionStorage.activeTabSnapshotsDetails);
                        }
                  };
                
                      $scope.checkInitActiveTab();
                
                    
                     //$scope.refreshPage(5);
                     
                     
                   //  $scope.info = "";
                        
                     //cojo los parametros de la url
                     $scope.idSnapshotURL = decodeURIComponent($stateParams.idSnapshot);
                     $scope.SelectedWorkNameURL = decodeURIComponent($stateParams.SelectedWorkName);
                      $scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);

                     //hago la select de los detalles del snaphot(created,id_work,etc)
                     vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: "select_snapshot_detail", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString(), ID_WORK: sessionStorage.SelectedIdWork, ID_SNAPSHOT: $scope.idSnapshotURL});
                    //Cargo los parámetros ya que es la primera pestaña
                     //$scope.SeeSnapshotsParameters();
                     
                    
                     $scope.SeeSnapshotsExecutionDetails = function(){
                    //     console.log("parent.location.hash: ",parent.location.hash);
                        // parent.location.hash = "hello";
                          //  $scope.currentPage = num;
                            $scope.Execution="YES";
                            $scope.Parameter="NO";
                           sessionStorage.activeTabSnapshotsDetails = 'ExecutionDetails';
                            $scope.pageNumber = 1;
                             $scope.infoExecutions = "Loading executions details...";
                            //Lanza la llamada para los detalles de la ejecucion
                            vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: "select_snapdet", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString(), ID_WORK: sessionStorage.SelectedIdWork, ID_SNAPSHOT: $scope.idSnapshotURL});
                           // $scope.info = "Loading executions details...";
                       };
                       
                        $scope.SeeSnapshotsParams = function(){
                         console.log("llama a SeeSnapshotsParams");
                         sessionStorage.activeTabSnapshotsDetails = 'DatabaseParameters';
                       //  console.log("parent.location.hash: ",parent.location.hash);
                          //  $scope.currentPage = num;
                            $scope.Execution="NO";
                            $scope.Parameter="YES";
                            $scope.pageNumber = 1;
                            $scope.infoParameters = "Loading database parameters...";
                            //Lanza la llamada para obtener los parámetros de ejecución
                            vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: "select_snapparams", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString(), ID_WORK: sessionStorage.SelectedIdWork, ID_SNAPSHOT: $scope.idSnapshotURL});
                      //      $scope.infoParameters = "Loading database parameters...";
                       };
                       $scope.ocultar = function(btn){
                           $('#'+btn).hide();
                       };
					 }
                     
                       
}

});
