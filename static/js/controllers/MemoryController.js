angular.module('app').controller("MemoryCtrl", function($scope,vertxEventBusService,actionData,$stateParams){
                     //$scope.idSnapshotURL = decodeURIComponent($stateParams.idSnapshot);
                     $scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);
                     vertxEventBusService.send('work_actions', {VERTX_ACTION: 'select_detailname', ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),WORK_NAME:$scope.SelectedWorkName});
        //HAGO LA SELECT DE TODOS LOS SNAPSHOTS
        vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.SelectedIdWork, ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString()});
        //vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'select_all'});

        console.log("entra en AWRCtrl");
});