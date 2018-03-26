angular.module('app').controller("WorksCtrl", function ($scope,$stateParams,vertxEventBusService,$state,ngDialog,$timeout,actionData,$location) {
    console.log("enta en WorksCtrl");
    
         if(sessionStorage.logado===undefined)
         {
             $state.go("Login");
         }
         else{
 /*
        $scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);
 if($scope.SelectedWorkName)
 {
     vertxEventBusService.send('work_actions', {VERTX_ACTION: 'select_detailname', ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),WORK_NAME:$scope.SelectedWorkName});
 }
       */              
            if($location.url()==="/works"){
                $scope.WorksPage = true;
                $scope.refreshPage(2);
                $scope.infoWorks = "Loading works...";
                 vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString()});
            }
            else{
                $scope.WorksPage = false;
                //$scope.refreshPage(1);
            }
            
            //$scope.refreshPage('','');
            $scope.Detailed = false;
            //$scope.WorksPage = true;
            sessionStorage.removeItem("SelectedIdWork");
            sessionStorage.removeItem("SelectedWorkName");
            //vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString()});
             console.log("entra en state works");
              $scope.Error = "";
                     /*$scope.$on('error', function(ev, args) {
                         
                         console.log("el error en workscontroller es " + args.error);
                         $scope.Error = args.error;
                     });*/
                     
                      $scope.$on('error', function(ev, args) {
                         $scope.Progress = false;
                         console.log("el error en repocontroller es " + args.error);
                         $scope.Error = args.error;
                        /* if($scope.Error === "Repository deleted succesfully"){
                             console.log("entra en el if del error");
                             
                               vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'select_all'});
                               $state.go("Login");
                         }*/
                     });
                     $scope.$on('noError', function(ev, args) {
                         $scope.Progress = false;
                         console.log("el error en repocontroller es " + args.error);
                         $scope.noError = args.error;
                        /* if($scope.Error === "Repository deleted succesfully"){
                             console.log("entra en el if del error");
                             
                               vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'select_all'});
                               $state.go("Login");
                         }*/
                     });
             $scope.NewWork = function(){
                                      //alert("llama a new work en workscontroller");
                          $scope.Progress = true;
                          //works.Error = "";
			console.log("entra newwork");
                        var name = myTrim(document.getElementById("WORK_NAME").value);
                       var description = myTrim(document.getElementById("WORK_DESCRIPTION").value);
						console.log("llama validavacio");
                        validaVacio("Works","add",name,description,$scope);
						console.log("sale validavacio: " + $scope.WorkAddOK);
                               if($scope.WorkAddOK === true)
                                {
                                      vertxEventBusService.send('work_actions', {VERTX_ACTION: 'add', WORK_NAME: name, WORK_DESCRIPTION: description,ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString()});
                                      $scope.Progress = false;
                                      $scope.WorkAddOK = false;
                               }
                   };   
                   
             $scope.EditWork = function(data){
                    $scope.Error="";     
                    $scope.Progress = true;                
                    var new_work_name = myTrim(document.getElementById("new_WORK_NAME").value);
                    var new_work_description = myTrim(document.getElementById("new_WORK_DESCRIPTION").value);
                     validaVacio("Works","edit",new_work_name,new_work_description,$scope);

                     if($scope.WorkEditOK === true)
                     {
                        $scope.Progress = true; 
                        vertxEventBusService.send('work_actions', {VERTX_ACTION: 'modify', ID_WORK: data.ID_WORK.toString(), WORK_NAME: new_work_name, WORK_DESCRIPTION: new_work_description,ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString()});
                        $scope.Progress = false;
                        $scope.WorkEditOK = false;
                    }

                                     
                };   
 
             $scope.DeleteWork = function(data){
                    $scope.Progress = true;                   
                    vertxEventBusService.send('work_actions', {VERTX_ACTION: 'delete', ID_WORK: data.ID_WORK.toString(),ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString()});               
                    $scope.Progress = false;
            };

        }

});
