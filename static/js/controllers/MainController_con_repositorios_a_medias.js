/* global messageRepository */

angular.module('app').controller('MainCtrl',function($scope,$interval,$state,vertxEventBusService,$location,ngDialog,$timeout,$sce,$rootScope,$timeout,actionData,$stateParams){   
    //console.log("Entra en el controlador de angular...");
                 
      $scope.seePopup = function(popup,data){
              $scope.Error = "";
              $scope.data = data;
              
              if(popup==="DeleteRepo"){
                  $scope.data = sessionStorage.repo;
              console.log("data vale " + $scope.data + " el popup es " + popup);
                }
                else{
                    $scope.new_WORK_NAME = $scope.data.WORK_NAME;
                    $scope.new_WORK_DESCRIPTION = $scope.data.WORK_DESCRIPTION;
                    $scope.new_SNAPSHOT_DESCRIPTION = $scope.data.SNAPSHOT_DESCRIPTION;
                }

              
           ngDialog.open({ 
                template:'/templates/'+popup+'Template.html',
                controller: 'MainCtrl',
                scope: $scope,
                data: data
              });
      };
      //$scope.AddRepo.onClick($scope.seePopup );
if(sessionStorage.logado===undefined)
{
 $state.go("Login");
}

 $scope.changeClass=function(){
            $scope.clasesCss={
               pagewrapper:false,
               nopagewrapper:false
           };
           /* alert($scope.clasesCss.page-wrapper);
            alert(JSON.stringify($scope.clasesCss[0]));*/

            if($scope.logado===true){
               $scope.clasesCss.pagewrapper=true;
              $scope.clasesCss.nopagewrapper=false;
              }else if($scope.logado===false){
               $scope.clasesCss.nopagewrapper=true;
               $scope.clasesCss.pagewrapper=false;
              }
        };
    
     init = function(){
         
             //SI ESTA LOGADO
        if(sessionStorage.logado)
        {
            
            $scope.user = sessionStorage.user;
            $scope.repositorio = sessionStorage.repo;
            $scope.idSesion = sessionStorage.idSesion;
            $scope.no_logado = false;
            $scope.logado = true;
        }
        else
        {
                //SI NO ESTA LOGADO
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("logado");
                $scope.user ="";
                $scope.password="";
               $scope.no_logado = true;
                $scope.logado = false;
              
        }
         
          
         
         
            $scope.no_logado = true;
            $scope.info="Connecting with server...";
          $scope.changeClass();
            
            
            if (!$scope.$$phase && !$scope.$root.$$phase) {
                $scope.$digest();
            }    
         var url = $location.url();
                        vertxEventBusService.on('repository_results', function(messageRepository) {
                            console.log("messageRepository: "+JSON.stringify(messageRepository));
                          if(messageRepository[0].ACTION==="select_all"){
                              console.log("el action es select_all");
                               $scope.repos=messageRepository;
                               $scope.repos.shift();  
                               console.log("repos vale en el select_all "+ JSON.stringify($scope.repos));
                                
                                for(var i=0; i<$scope.repos.length; i++){
                                    console.log("entra en el for");
                                    if($scope.repos[i].DEFAULT_REPO==="yes"){
                                        $scope.sel=true;
                                        sessionStorage.repo=$scope.repos[i].CONNECTION_NAME;
                                    }else{
                                        $scope.sel=false;
                                    }
                              
                                } 
                           }

                           if(messageRepository[0].ACTION==="delete"){
                              console.log("el action es delete");
                              //$scope.Error = messageRepository[0].VERTX_MESSAGE;
                               setError(messageRepository[0].VERTX_ERROR,messageRepository[0].VERTX_MESSAGE,$scope,ngDialog,$timeout);
                           }

                        });
                            
                            
                         if(sessionStorage.idSesion){
                             vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString()});
                         }
                     
                             vertxEventBusService.on('work_results', function(messageWorks) {
                                 console.log(JSON.stringify(messageWorks));
                             
                                    if(messageWorks[0].detailed === "yes"){
                                        console.log("si detail");
                                        $scope.DetailedWorks = messageWorks[1];
                                    }
                                     if(messageWorks[0].detailed === "no" && messageWorks[0].ID_SES===sessionStorage.idSesion && messageWorks[0].ID_CON===(actionData.getIdCon()).toString()){
                                        console.log("no detail");
                                        
                                        $scope.WorksResults = messageWorks;    
                                        $scope.WorksResults.shift();  
                                        
                                    if(messageWorks[0].ACTION ==="add" || messageWorks[0].ACTION ==="modify"  || messageWorks[0].ACTION ==="delete")
                                                    setError(messageWorks[0].VERTX_ERROR,messageWorks[0].VERTX_MESSAGE,$scope,ngDialog,$timeout);
                                              }
                                              
                                                if($scope.page==="Works" || $scope.page==="Home"){
                                                    $scope.generateTable(messageWorks);          
                                                }                                              
                                            
                            });
                          
                            //BUS SNAPSHOT_RESULTS
                            vertxEventBusService.on('snapshot_results', function(messageSnapshots) {
                                 //console.log("messageSnapshots vale " + JSON.stringify(messageSnapshots));
                                 //CARGO LOS DETALLES DEL SNAPSHOT
                                    if(messageSnapshots[0].ACTION==="select_snapshot_detail" && messageSnapshots[0].ID_SES===sessionStorage.idSesion){
                                          console.log("EL ACTION ES select_snapshot_detail");
                                         $scope.snapshotDescription = messageSnapshots[1].SNAPSHOT_DESCRIPTION;
                                         $scope.snapshotCreated = messageSnapshots[1].CREATED;
                                         $scope.SelectedIdWork = messageSnapshots[1].ID_WORK;
                                         $scope.idSnapshot = messageSnapshots[1].ID_SNAPSHOT;
                                       
                                      }


                                if(messageSnapshots[0].detailed==="no"  && messageSnapshots[0].ID_SES===sessionStorage.idSesion && messageSnapshots[0].ID_CON===(actionData.getIdCon()).toString()){
                                     //SNAPSHOTS RESULTS
                                     
                                     if(messageSnapshots[0].ACTION==="select_all"){
                                                if(messageSnapshots[0].VERTX_MESSAGE ==="No snapshots for this work")
                                                {
                                                     //NO HAY SNAPSHOTS
                                                    $scope.HaveSnapshots = false;                                                         
                                                    $scope.info = messageSnapshots[0].VERTX_MESSAGE;
                                                }  
                                                else{
                                                    //SI HAY SNAPSHOT
                                                    $scope.info = "";
                                                    $scope.HaveSnapshots = true;         
                                                    $scope.generateTable(messageSnapshots);
                                                    $scope.$broadcast('SnapshotsResults', {SnapshotsResults: messageSnapshots}); 
                                                }
                                     }
                                     //ACTIONS SNAPSHOT
                                    if(messageSnapshots[0].ACTION ==="add" || messageSnapshots[0].ACTION ==="modify"  || messageSnapshots[0].ACTION ==="delete")
                                    {
                                         //ENVIO LOS DATOS A LA FUNCION SETERROR, QUE SE ENCARGA DE MOSTRAR EL MENSAJE EN EL POPUP Y POSTERIORMENTE CERRARLO. SE ENCUENTRA EN FUNCTION.JS
                                         setError(messageSnapshots[0].VERTX_ERROR,messageSnapshots[0].VERTX_MESSAGE,$scope,ngDialog,$timeout);       
                                         //REFRESCO LOS DATOS DE LOS SNAPSHOTS PARA QUE APAREZCAN REFLEJADOS LOS CAMBIOS
                                         vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.SelectedIdWork, ID_SES:sessionStorage.idSesion, ID_CON:  actionData.setIdCon().toString()});
                                    } 
                                }       
                                 if(messageSnapshots[0].detailed==="yes"  && messageSnapshots[0].ID_SES===sessionStorage.idSesion && messageSnapshots[0].ID_CON===(actionData.getIdCon()).toString()){                                           
                                    //SNAPSHOTS DETAILS   
                                    console.log("es detailed");
                                    $scope.infoParameters = messageSnapshots[0].VERTX_MESSAGE;
                                          //PARAMETROS DE LA BASE DE DATOS  
                                      if(messageSnapshots[0].ACTION==="select_snapparams"){
                                          console.log("EL ACTION ES select_snapparams");
                                          
                                          //SI NO HAY PARAMETROS DE LA BASE DE DATOS
                                          if(messageSnapshots[0].VERTX_MESSAGE ==="No parameters for this snapshot"){
                                              console.log("no hay parametros");
                                              $scope.params = false;
                                              $scope.HaveParameters = false;
                                              $scope.infoParameters = messageSnapshots[0].VERTX_MESSAGE;
                                          }
                                          //SI SI HAY PARAMETROS DE LA BASE DE DATOS
                                          if(messageSnapshots[0].VERTX_MESSAGE ==="OK"){
                                              console.log("si hay parametros");
                                              $scope.infoParameters = "Loading parameters...";
                                               $scope.HaveParameters = true;
                                               $scope.generateTable(messageSnapshots);
                                               $scope.params = messageSnapshots;
                                               $scope.params.shift();
                                          }

                                      }
                                      //DETALLES DE LA EJECUCION DE LOS SNAPSHOTS
                                      if(messageSnapshots[0].ACTION==="select_snapdet"){
                                             if(messageSnapshots[0].VERTX_MESSAGE !=="No executions details for this snapshot"){
                                                //HAY DETALLES DE LA EJECUCION
                                                  $scope.HaveSnapshotsExecutionDetails = true;
                                                  //DETAILEDSNAPSHOT ES LA VARIABLE CON LA QUE LEE LOS DATOS PARA GENERAR LA TABLA
                                                  $scope.ExecutionDetailedSnapshot = messageSnapshots;
                                                  //GENERO LA TABLA CON LOS DETALLES DE LA EJECUCI�N DE LOS SNAPSHOTS
                                                  $scope.generateTable(messageSnapshots);
                                            }
                                            
                                            else{
                                                //NO HAY DETALLES DE LA EJECUCION
                                                $scope.info = messageSnapshots[0].VERTX_MESSAGE;
                                                $scope.HaveSnapshotsExecutionDetails = false;
                                            }  
                                      }
                                        
                                            

                                 }

                            });
                               //BUS QUERY_RESULTS
                            vertxEventBusService.on('query_results', function(messageQuerys) {
                                console.log("MesaggeQuerys:"+JSON.stringify(messageQuerys));
                                        if(messageQuerys[0].ACTION==="select_bg_list" && messageQuerys[0].ID_SES===sessionStorage.idSesion){
                                            console.log("el action es select_bg_list y llega" + JSON.stringify(messageQuerys));
                                            $scope.bgList = messageQuerys;
                                            $scope.bgList.shift();
                                            $scope.generateTable($scope.bgList);
                                           // $scope.bgList.shift()
                                              //$scope.BGDetailResult = messageQuerys[1];
                                        } 
                                if(messageQuerys[0].detailed==="no"  && messageQuerys[0].ID_SES===sessionStorage.idSesion && messageQuerys[0].ID_CON===(actionData.getIdCon()).toString()){
                                        if(messageQuerys[0].ACTION==="select_all"){
                                                if(messageQuerys[0].VERTX_MESSAGE ==="No querys for this work")
                                                {
                                                     //NO HAY QUERYS
                                                    $scope.HaveQuerys = false;                                                         
                                                    $scope.info = messageQuerys[0].VERTX_MESSAGE;
                                                }  
                                                else{
                                                    //SI HAY QUERYS
                                                    $scope.info = "";
                                                    $scope.HaveQuerys = true;         
                                                    $scope.generateTable(messageQuerys);
                                                   // $scope.$broadcast('SnapshotsResults', {SnapshotsResults: messageSnapshots}); 
                                                }
                                     }

//                                        if(messageQuerys[0].ACTION==="select_bg_list"){
//                                            console.log("el action es select_bg_list y llega" + JSON.stringify(messageQuerys));
//                                              //$scope.BGDetailResult = messageQuerys[1];
//                                        }  
                                };
//                                if(messageQuerys[0].detailed==="no"  && messageQuerys[0].ID_SES===sessionStorage.idSesion && messageQuerys[0].ID_CON===(actionData.getIdCon()).toString()){
//                                        if(messageQuerys[0].ACTION==="select_all"){
//                                                if(messageQuerys[0].VERTX_MESSAGE ==="No querys for this work")
//                                                {
//                                                     //NO HAY QUERYS
//                                                    $scope.HaveQuerys = false;                                                         
//                                                    $scope.info = messageQuerys[0].VERTX_MESSAGE;
//                                                }  
//                                                else{
//                                                    //SI HAY QUERYS
//                                                    $scope.info = "";
//                                                    $scope.HaveQuerys = true;         
//                                                    $scope.generateTable(messageQuerys);
//                                                   // $scope.$broadcast('SnapshotsResults', {SnapshotsResults: messageSnapshots}); 
//                                                }
//                                        }
//                                        
//                                };
                                if(messageQuerys[0].detailed==="yes"  && messageQuerys[0].ID_SES===sessionStorage.idSesion && messageQuerys[0].ID_CON===(actionData.getIdCon()).toString()){
                                        if(messageQuerys[0].ACTION==="select_detail"){
                                              $scope.DetailedQuery = messageQuerys[1];
                                              //console.log("detailedquery:" + JSON.stringify(messageQuerys));
                                        }

                                        if(messageQuerys[0].ACTION==="select_bg_detail"){
                                            console.log("el action es select_bg_detail y llega" + JSON.stringify(messageQuerys));
                                              $scope.BGDetailResult = messageQuerys;
                                              $scope.BGDetailResult.shift();
                                           //   $scope.generateTable($scope.BGDetailResult);
                                        }                                        
                                        
                                        
                                };
                                
                                
                            });                           
//                            //BUS QUERY_RESULTS
//                            vertxEventBusService.on('query_results', function(messageQuerys) {
//                                console.log("MesaggeQuerys:"+JSON.stringify(messageQuerys));
//                                //SI SE HA BORRADO LA QUERY
//                                if(messageQuerys[0].VERTX_MESSAGE === "Query deleted succesfully" && messageQuerys[0].ID_SES===sessionStorage.idSesion && messageQuerys[0].ID_CON===(actionData.getIdCon()).toString()){  
//                                    $scope.Progress = false;
//                                    $scope.Error = messageQuerys[0].VERTX_MESSAGE;
//                                    setError(messageQuerys[0].VERTX_ERROR,messageQuerys[0].VERTX_MESSAGE,$scope,ngDialog,$timeout);
//                                }
//                                //SI NO TIENE QUERYS  
//                                if(messageQuerys[0].VERTX_MESSAGE ==="No querys for this work" && messageQuerys[0].ID_SES===sessionStorage.idSesion && messageQuerys[0].ID_CON===(actionData.getIdCon()).toString())
//                                {
//                                    $scope.HaveResults = false;
//                                    $scope.info="No querys for this work";
//                                }
//                                    
//                                else{
//                                       if(messageQuerys[0].VERTX_MESSAGE !=="No querys for this work" && messageQuerys[0].ID_SES===sessionStorage.idSesion  && messageQuerys[0].ID_CON===(actionData.getIdCon()).toString())
//                                        {
//                                         //SI TIENE QUERYS
//
//                                            if(messageQuerys[0].VERTX_MESSAGE !=="No querys for this work" && messageQuerys[0].detailed ==="no" && messageQuerys[0].ID_SES===sessionStorage.idSesion && messageQuerys[0].ID_CON===(actionData.getIdCon()).toString())
//                                            {
//                                                //LISTADO DE QUERYS
//                                                $scope.generateTable(messageQuerys);
//                                            }
//
//
//                                            if(messageQuerys[0].VERTX_MESSAGE !=="No querys for this work" && messageQuerys[0].detailed ==="yes" && messageQuerys[0].ID_SES===sessionStorage.idSesion && messageQuerys[0].ID_CON===(actionData.getIdCon()).toString())
//                                            {
//                                                //QUERY DETAILS
//                                                $scope.DetailedQuery = messageQuerys[1];
//                                                $scope.SQLidQuery = messageQuerys[1].SQL_ID;
//                                            }    
//                                            if(messageQuerys[0].VERTX_MESSAGE !=="No querys for this work" && messageQuerys[1].BIND_PRECISION  && messageQuerys[0].ID_SES===sessionStorage.idSesion && messageQuerys[0].ID_CON===(actionData.getIdCon()).toString()){
//                                                //QUERY RESULTS
//                                                $scope.QueryResults = messageQuerys;
//                                                $scope.generateTable($scope.QueryResults);
//                                                $scope.QueryResults.shift();
//                                            }
//                                        }
//
//                                }
//                            });
          
//          vertxEventBusService.on('query_bg_results', function(BGmessage) {
//                         //BIND GROUPS
//                             $scope.BGResults = BGmessage;
//                             $scope.BgGroupName = BGmessage[1];
//                             $scope.BGdetails = BGmessage[2];
//                             $scope.generateTable($scope.BgGroupName);
//                             console.log(" $scope.BGResults :"+ JSON.stringify($scope.BGResults));
//                        //     console.log(" $scope.BgGroupName :"+ JSON.stringify($scope.BgGroupName));
//                         //    console.log(" $scope.BGdetails :"+ JSON.stringify($scope.BGdetails));
//                            });
    
    //REFRESH PAGE
     $scope.refreshPage = function(){
             $scope.info="Connecting with server...";
             $scope.HaveResults = false;
             sessionStorage.currentPageWorks = 1;
             switch($location.path()){
                 case "/home":
                 $scope.page = "Home";
                 $scope.helpText="Texto de ayuda de la pagina principal";
                 break;
                 
                 case "/works":
                 $scope.page = "Works";
                 $scope.helpText="Texto de ayuda de la pagina Works";
                 break;
                 
                 case "/works/"+ $stateParams.SelectedWorkName:
                 $scope.page = "Works Details";
                 $scope.helpText="Texto de ayuda de la pagina Works Details";
                 break;
                 
                 case "/works/"+ $stateParams.SelectedWorkName +"/Snapshots":
                 $scope.page = "Snapshots";
                 $scope.helpText="Texto de ayuda de la pagina Snapshots";
                 break;
                 
                 case "/works/"+ $stateParams.SelectedWorkName +"/Snapshots/details/"+ $stateParams.idSnapshot:
                 $scope.page = "Snapshots Details";
                 $scope.helpText="Texto de ayuda de la pagina Snapshots Details";
                 break;   
             
                 case "/works/"+ $stateParams.SelectedWorkName +"/Querys":
                 $scope.page = "Querys";
                 $scope.helpText="Texto de ayuda de la pagina Querys";
                 break;
                 
                 case "/works/Reports":
                 $scope.page = "Reports";
                 $scope.helpText="Texto de ayuda de la pagina Reports";
                 break;
                 
                 case "/works/"+ $stateParams.SelectedWorkName +"/Querys/details/" + $stateParams.idQuery:
                 $scope.page = "Query Details";
                 $scope.helpText="Query details idquery " + $stateParams.idQuery;
                 break;
             }
        };

           
         
           
 }; //acaba el init
  
    window.onload = init;

$scope.generateTableNew=function(datos){
                        $scope.sort = function(keyname){
                            $scope.sortKey = keyname;   //set the sortKey to the param passed
                            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
                        };
                        $scope.Results = datos;
                        $scope.itemsPerPage = 10;
                        $scope.HaveResults = true;
                      
                        if($scope.page==="Home"){
                            $scope.itemsPerPage = 5;
                            $scope.Works = datos;
                            $scope.sortKey = "ID_WORK"; 
                        }else if($scope.page === "Works"){
                            $scope.Works = datos;
                            $scope.sortKey = "ID_WORK"; 
                        }else if($scope.page === "Querys"){
                            $scope.QueryResults = datos;
                            $scope.QueryResults.shift(); 
                            $scope.sortKey = "ID_QUERY"; 
                        }else if($scope.page === "Snapshots"){
                            $scope.SnapshotsResults = datos;
                            $scope.SnapshotsResults.shift(); 
                            $scope.sortKey = "ID_SNAPSHOT";   
                        }   
                        else if($scope.page === "Snapshots Details"){
                            $scope.DetailedSnapshot = datos;
                            $scope.DetailedSnapshot.shift(); 
                            $scope.sortKey = "STATS_ELAPSED_TIME";   
                        }

                        $scope.numvalues = [3,5,10,20,50];                     
                        $scope.total = $scope.Results.length;
                        $scope.currentPage = 1;
      
                        $scope.maxRange = ($scope.currentPage * $scope.itemsPerPage);
                        $scope.minRange = ($scope.maxRange-$scope.itemsPerPage)+1;
                        if($scope.total < $scope.maxRange){
                                $scope.maxRange = $scope.total;
                            }
                        $scope.refreshItemsPerPage = function(new_value){
                            $scope.itemsPerPage = new_value;
                        };
                             
                          $scope.setRange= function(currentPage){
                            $scope.currentPage = currentPage;
                            sessionStorage.currentPage = $scope.currentPage;
                            $scope.maxRange = ($scope.currentPage * $scope.itemsPerPage);
                            $scope.minRange = ($scope.maxRange-$scope.itemsPerPage)+1;
                            if($scope.total < $scope.maxRange){
                                $scope.maxRange = $scope.total;
                            }
                        };   
    };

$scope.generateTable=function(datos){
                        $scope.sort = function(keyname){
                            $scope.sortKey = keyname;   //set the sortKey to the param passed
                            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
                        };
                        $scope.Results = datos;
                        $scope.itemsPerPage = 10;
                        $scope.HaveResults = true;
                      $scope.currentPage = 1;
                        if($scope.page==="Home"){
                            $scope.itemsPerPage = 5;
                            $scope.Works = datos;
                            $scope.sortKey = "ID_WORK"; 
                        }else if($scope.page === "Works"){
                            $scope.Works = datos;
                            $scope.sortKey = "ID_WORK"; 
                            if(sessionStorage.currentPageWorks !== undefined){
                                $scope.currentPage = sessionStorage.currentPageWorks;
                            }
                        }else if($scope.page === "Querys"){
                            $scope.QueryResults = datos;
                            $scope.QueryResults.shift(); 
                            $scope.sortKey = "ID_QUERY"; 
                        }else if($scope.page === "Snapshots"){
                            $scope.SnapshotsResults = datos;
                            $scope.SnapshotsResults.shift(); 
                            $scope.sortKey = "ID_SNAPSHOT";   
                        }   
                        else if($scope.page === "Snapshots Details"){
                            $scope.DetailedSnapshot = datos;
                            $scope.DetailedSnapshot.shift(); 
                            $scope.sortKey = "STATS_ELAPSED_TIME";   
                        }

                        $scope.numvalues = [3,5,10,20,50];                     
                        $scope.total = $scope.Results.length;
                      //  $scope.currentPage = 1;
                        
                        
      
                        $scope.maxRange = ($scope.currentPage * $scope.itemsPerPage);
                        $scope.minRange = ($scope.maxRange-$scope.itemsPerPage)+1;
                        if($scope.total < $scope.maxRange){
                                $scope.maxRange = $scope.total;
                            }
                        $scope.refreshItemsPerPage = function(new_value){
                            $scope.itemsPerPage = new_value;
                        };
                             
                          $scope.setRange= function(currentPage){
                            $scope.currentPage = currentPage;
                            if($scope.page === "Works"){
                                sessionStorage.currentPageWorks = $scope.currentPage;
                            }
                            
                            $scope.maxRange = ($scope.currentPage * $scope.itemsPerPage);
                            $scope.minRange = ($scope.maxRange-$scope.itemsPerPage)+1;
                            if($scope.total < $scope.maxRange){
                                $scope.maxRange = $scope.total;
                            }
                        };   
    }; 

// $scope.generateTable=function(datos){
//                    console.log("llama a generatetable");
//                        $scope.sort = function(keyname){
//                            $scope.sortKey = keyname;   //set the sortKey to the param passed
//                            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
//                        };
//                        $scope.Results = datos;
//                        $scope.itemsPerPage = 10;
//                        $scope.HaveResults = true;
//                      
//                        /*if($scope.page==="Home"){
//                            $scope.itemsPerPage = 5;
//                            $scope.Works = datos;
//                            $scope.sortKey = "ID_WORK"; 
//                        }else if($scope.page === "Works"){
//                            $scope.Works = datos;
//                            $scope.sortKey = "ID_WORK"; 
//                        }else if($scope.page === "Querys"){
//                            $scope.QueryResults = datos;
//                            $scope.QueryResults.shift(); 
//                            $scope.sortKey = "ID_QUERY"; 
//                        }else if($scope.page === "Snapshots"){
//                            $scope.SnapshotsResults = datos;
//                            $scope.SnapshotsResults.shift(); 
//                            $scope.sortKey = "ID_SNAPSHOT";   
//                        }   
//                        else if($scope.page === "Snapshots Details"){
//                            $scope.DetailedSnapshot = datos;
//                            $scope.DetailedSnapshot.shift(); 
//                            //console.log("$scope.Execution: "+$scope.Execution+" $scope.Parameter: "+$scope.Parameter);
//                            $scope.sortKey = "STATS_ELAPSED_TIME"; 
//                            $scope.sortKey = "PARAMENTER_NAME";
//                            
//                        }*/
//                           
//            switch($scope.page){
//                 case "Home":
//                     console.log("el page es home");
//                    $scope.itemsPerPage = 5;
//                    $scope.Works = datos;
//                    $scope.sortKey = "ID_WORK"; 
//                    $scope.totalWorks=$scope.Works.length;
//                    $scope.total=$scope.totalWorks;
//                 break;
//                 
//                 case "Works":
//                    $scope.Works = datos;
//                    $scope.sortKey = "ID_WORK";
//                    $scope.totalWorks=$scope.Works.length;
//                    $scope.total=$scope.totalWorks;
//                 break;
//                 
//                 case "Querys":
//                    $scope.QueryResults = datos;
//                    $scope.QueryResults.shift(); 
//                    $scope.sortKey = "ID_QUERY";
//                    $scope.totalQuery=$scope.QueryResults.length;
//                    $scope.total=$scope.totalQuery;
//                 break;
//                 
//                 case "Query Details":
//                   /* $scope.DetailedQuery = datos;
//                    $scope.DetailedQuery.shift(); */
//                    $scope.totalOne=$scope.Results.length;                       
//                    $scope.sortKey = "ID_QUERY";
//                    $scope.totalQueryDetails=$scope.Results.length;
//                    $scope.total=$scope.totalQueryDetails;
//                 break;
//                 
//                 case "Snapshots":
//                    $scope.SnapshotsResults = datos;
//                    $scope.SnapshotsResults.shift(); 
//                    $scope.sortKey = "ID_SNAPSHOT"; 
//                    $scope.totalSnapshots=$scope.SnapshotsResults.length;
//                    $scope.total=$scope.totalSnapshots;
//                 break;
//                 
//                 case "Snapshots Details":
//                    $scope.DetailedSnapshot = datos;
//                    $scope.DetailedSnapshot.shift(); 
//                    //console.log("$scope.Execution: "+$scope.Execution+" $scope.Parameter: "+$scope.Parameter);
//                    $scope.sortKey = "STATS_ELAPSED_TIME"; 
//                    $scope.sortKey = "PARAMENTER_NAME";
//                    $scope.totalSnapshotsDetails=$scope.DetailedSnapshot.length;
//                    $scope.total=$scope.totalSnapshotsDetails;
//                 break;   
//             }
//
//                        $scope.numvalues = [3,5,10,20,50];                     
//                        
//                        
//                       
//                        $scope.maxRange = ($scope.currentPage * $scope.itemsPerPage);
//                        $scope.minRange = ($scope.maxRange-$scope.itemsPerPage)+1;
//                        if($scope.total < $scope.maxRange){
//                                $scope.maxRange =$scope.total;
//                            }
//                        $scope.refreshItemsPerPage = function(new_value){
//                            $scope.itemsPerPage = new_value;
//                        };
//                             
//                          $scope.setRange= function(currentPage){
//                            
//                            $scope.currentPage = currentPage;
//                            $scope.maxRange = ($scope.currentPage * $scope.itemsPerPage);
//                            $scope.minRange = ($scope.maxRange-$scope.itemsPerPage)+1;
//                            if($scope.total < $scope.maxRange){
//                                $scope.maxRange = $scope.total;
//                            }
//                      console.log("currentPage: "+currentPage);
//                       
//                        };   
//    }; 

    $scope.SeeDetails = function(SelectedWork) {
        $scope.SelectedIdWork = SelectedWork.ID_WORK;
        $scope.SelectedWorkName = SelectedWork.WORK_NAME;
        $scope.SelectedWorkCreated = SelectedWork.CREATED;
        sessionStorage.SelectedIdWork = $scope.SelectedIdWork;
        sessionStorage.SelectedWorkName = $scope.SelectedWorkName;
        sessionStorage.SelectedWorkCreated = $scope.SelectedWorkCreated;
     };
               
      //CONTROLA SI SE PUEDE O NO TENER VARIOS ACORDEONES ABIERTOS            
      $scope.oneAtATime = false;
//JSON DE PRUEBA PARA LA PAGINA DE REPORTS
      $scope.Snapshots = [
        {
          title: 'Snapshot 1',
          templateUrl: '/templates/SnapshotsDetailsTemplate.html'
        },
        {
          title: 'Snapshot 2',
          templateUrl: 'templates/SnapshotsDetailsTemplate.html'     
        }
      ];
   //FUNCION PARA VOLVER A LA ULTIMA PAGINA VISTA         
    $scope.volver = function()
                {
                    window.history.go(-1);
                };

//COMPRUEBA CADA SEGUNDO SI EST� LOGADO
     $interval(function(){
        
         $scope.logado = sessionStorage.logado;
         
           
        if(sessionStorage.logado)
        {
            $scope.user = sessionStorage.user;
            $scope.no_logado = false;
        }

      },1000);
   
    //LOGIN             
$scope.login = function(){

   var userVal = document.getElementById('user').value;
    var passwordVal = document.getElementById('password').value;
   // var repoVal = document.getElementById('selectedRepo').value;
       
    if (vacio(userVal) === false) {
        $scope.errorLogin = "Please, fill the user";
    }
    else if (vacio(passwordVal) === false) {
        $scope.errorLogin = "Please, fill the password";
    }
    else{
        $scope.infoLogin="Connecting with server...";
        $scope.errorLogin = "";
        $scope.logado=true;
        sessionStorage.logado = $scope.logado;
        sessionStorage.user = userVal;
        //sessionStorage.repo = repoVal;
        sessionStorage.idSesion = uniqueID();
        $scope.user = sessionStorage.user;
        $scope.repositorio = sessionStorage.repo;
        $scope.idSesion = sessionStorage.idSesion;
        $scope.infoLogin="";
        $state.go("Home",{});
       
        vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  actionData.setIdCon().toString()});
    }
    console.log("logado: "+$scope.logado);
    $scope.changeClass();
};

                        
$scope.logout = function(){
    $scope.logado=false;
   $state.go("Login",{});
    $scope.changeClass();
};


//ACABA EL CONTROLADOR DE ANGULAR
});