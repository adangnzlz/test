angular.module('app').controller("QueryDetailsCtrl", function ($scope,$stateParams,vertxEventBusService,$state,$log,actionData) {
    console.log("enta en QueryDetailsCtrl");

           if(sessionStorage.logado===undefined)
                 {
                     $state.go("Login");
                 }
                 else{
                      $scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);
                     vertxEventBusService.send('work_actions', {VERTX_ACTION: 'select_detailname', ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),WORK_NAME:$scope.SelectedWorkName});
                     $scope.refreshPage(7);
                      $scope.seeBindGroups = false;
                       $scope.open=false;
                      $scope.idQuery = decodeURIComponent($stateParams.idQuery);
                      //                          $scope.cargarDetalles = function(){
                            vertxEventBusService.send('query_actions', {ID_SES:sessionStorage.idSesion,ID_CON:(actionData.setIdCon()).toString(),VERTX_ACTION:"select_detail",ID_WORK:sessionStorage.SelectedIdWork.toString(),ID_QUERY:$scope.idQuery.toString()});
                           
                        // };
                    // $scope.cargarDetalles();
                      $scope.numvaluesBG = [3,5,10,20,50];
                        //$scope.refreshPage($scope.idQuery);
                        $scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);
                        
//                        $scope.$on('bindType', function(ev, args) {
//                            $scope.bindType=args.bindType;
//                         });
//                         
                         $scope.SeeBGDetails=function(idBG){                           
                             vertxEventBusService.send('query_actions', {ID_SES:sessionStorage.idSesion,ID_CON:(actionData.setIdCon()).toString(),VERTX_ACTION:"select_bg_detail",ID_WORK:sessionStorage.SelectedIdWork.toString(),ID_QUERY:$scope.idQuery.toString(), ID_BG:idBG});
                             $scope.open = true;
                         };

                          $scope.isCollapsed = true;
                          $scope.isClose=true;
                          $scope.isOpen=false;
                          
                         $scope.setClass = function(){
                           console.log("$scope.isClose vale " + $scope.isClose);
                           console.log("$scope.isCollapsed vale " + $scope.isCollapsed);
                             if($scope.isClose===true){
                                 $scope.isOpen=true;
                                 $scope.isClose=false;
                             }else if($scope.isOpen===true){
                                  $scope.isOpen=false;
                                  $scope.isClose=true;
                             }
                             
                             console.log("llama a funcion setClass");
                         };   
                            $scope.ver=false;
                            $scope.listarBinds = function(){
                                 vertxEventBusService.send('query_actions', {ID_SES:sessionStorage.idSesion,ID_CON:(actionData.setIdCon()).toString(),VERTX_ACTION:"select_bg_list",ID_WORK:sessionStorage.SelectedIdWork.toString(),ID_QUERY:$scope.idQuery.toString()});
                                 $scope.seeBindGroups = !$scope.seeBindGroups;
                                 $scope.ver=true;
                            };
                            
                             $scope.esconderBinds = function(){
                                $scope.seeBindGroups = !$scope.seeBindGroups;
                                $scope.ver=false;
                            };
                    }
                
});

