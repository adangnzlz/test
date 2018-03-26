angular.module('app').controller("bgDetailsCtrl", function ($scope,$stateParams,vertxEventBusService,$state,actionData) {
    console.log("enta en bgDetailsCtrl");

           if(sessionStorage.logado===undefined)
                 {
                     $state.go("Login");
                 }
                 else{
                       console.log("enta en bgDetailsCtrl");
                        $scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);
                     vertxEventBusService.send('work_actions', {VERTX_ACTION: 'select_detailname', ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),WORK_NAME:$scope.SelectedWorkName});
                        $scope.$on('numBG', function(ev, args) {
                         
                         
                         $scope.totalBindGroups = args.numBG;
                         
                         console.log("totalBindGroups "+ $scope.totalBindGroups)

                     });
                    }
                
});
