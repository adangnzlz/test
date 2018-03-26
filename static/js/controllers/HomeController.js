angular.module('app').controller("HomeCtrl", function($scope,$state,$ocLazyLoad,vertxEventBusService,actionData){
                  if(sessionStorage.logado=== undefined)
                  {
                      $state.go("Login");
                  }
                  else{
                    //  $ocLazyLoad.load('/static/js/controllers/WorksController.js');
                      //$scope.refreshPage('','');
                      if($scope.refreshPage){
                        $scope.refreshPage(1);
                      }
                      
                      
                      vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  actionData.setIdCon().toString()});
                      $scope.infoWorks = "Loading works...";
                      //
//$scope.page = "Home";
                      //$scope.helpText="Texto de ayuda de la pagina principal";
                      console.log("entra en HomeCtrl");
                    }
         });