angular.module('app').controller("AWRCtrl", function($scope,vertxEventBusService,actionData,$stateParams,$state,$filter){
            alert("entra en AWRCtrl");
                   if(sessionStorage.logado=== undefined)
                  {
                      $state.go("Login");
                  }
                  else{
                      
//                             $('.flexdatalist').flexdatalist({
//                                    minLength: 1
//                               });  
                      
                       $scope.$on('AWRConnectionOK', function(ev, args) {                       
                         $scope.AWRConnectionOK = true;
                        $state.go("CaptureAWR",{SelectedWorkName: $scope.SelectedWorkName});
                     });
                      
                      $scope.$on('allAWR', function(ev, args) {
                          //alert("entra aqui");
                         //$scope.Progress = false;
                        // console.log("el error en snapshotscontroller es " + args.error);
                         $scope.allAWR = args.allAWR;

                     });

                   
                  }
});