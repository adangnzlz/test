angular.module('app').controller("QuerysCtrl", function ($scope,$stateParams,vertxEventBusService,$state,actionData) {
    console.log("enta en QuerysCtrl");

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
                     
                $scope.refreshPage(6);
                 $scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);
              //   vertxEventBusService.send('work_actions', {VERTX_ACTION: 'select_detailname', ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),WORK_NAME:$scope.SelectedWorkName});
                 vertxEventBusService.send('query_actions', {VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.SelectedIdWork, ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString()});
                 
                 
                $scope.DeleteQuery = function(data){

                        $scope.Progress = true;                   
                        vertxEventBusService.send('query_actions', {VERTX_ACTION: 'delete', ID_QUERY: data.ID_QUERY.toString(),ID_WORK:sessionStorage.SelectedIdWork,ID_SES:sessionStorage.idSesion, ID_CON: actionData.getIdCon().toString()});                 
                        console.log({VERTX_ACTION: 'delete', ID_QUERY: data.ID_QUERY.toString(),ID_WORK:sessionStorage.SelectedIdWork,ID_SES:sessionStorage.idSesion, ID_CON: actionData.getIdCon().toString()});
                       

                };
        }
});



