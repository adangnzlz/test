angular.module('app').controller('MainCtrl',function(
        $filter,
        $scope,
        $interval,
        $state,
        vertxEventBusService,
        $location,
        ngDialog,
        $timeout,
        $sce,
        $rootScope,
        $timeout,
        actionData,
        $stateParams,
        captureService,
        pageService,
        tableService,
        VertxBus){   
    console.log("Entra en el MainController");
	$scope.numWorks="-";
	$scope.repositorio = sessionStorage.repoName;
	$scope.jobpercent="-";
	$scope.jobdetails="No running jobs";
	//console.log("NumWorks: " + $scope.numWorks );
    
    console.log('el path en el main es: ' + window.location.pathname);
    //$scope.changeClass();
   // $scope.cambiaCSS = function(){
   //     console.log("llama a cambiaCSS y el path es " + location.hash);
        

   // };
     
   
  
        $scope.seePopup = function(popup,data){
            //alert("entra en seepopup");
              $scope.Error = "";
              $scope.data = data;
             
              if(popup==="DeleteRepo"){
                  $scope.data = sessionStorage.repoName;
                
                    console.log("data vale " + JSON.stringify($scope.data) + " el popup es " + popup);
                }
                
              /*if(data==="edit"){
                  $scope.edit=true;
              }*/
                else{
                    $scope.new_WORK_NAME = $scope.data.WORK_NAME;
                    $scope.new_WORK_DESCRIPTION = $scope.data.WORK_DESCRIPTION;
                    $scope.new_SNAPSHOT_DESCRIPTION = $scope.data.SNAPSHOT_DESCRIPTION;
                }

              
           ngDialog.open({ 
                template:'/templates/'+popup+'Template.html',
                controller: 'RepoCtrl',
                //controller: 'RepoCtrl',
                scope: $scope,
                data: data
              });
      };
     
if(sessionStorage.logado===undefined)
{
 $state.go("Login");
}
 $scope.origenRepo=function(origen){
        $scope.origen=origen;
        $scope.seePopup('RepoPass','');
    }; 
    
 $scope.changeClass=function(){
     console.log("llama a changeClass");
     
//            $scope.clasesCss={
//               pagewrapper:false,
//               nopagewrapper:false
//           };
//
//            if($scope.logado===true){
//               $scope.clasesCss.pagewrapper=true;
//              $scope.clasesCss.nopagewrapper=false;
//              }else if($scope.logado===false){
//               $scope.clasesCss.nopagewrapper=true;
//               $scope.clasesCss.pagewrapper=false;
//              }
//           
//          $scope.classPadding={
//              sipadding:false,
//              nopadding:false
//          };
//            if($scope.logado===true){
//                $scope.classPadding.sipadding=false;
//                $scope.classPadding.nopadding=true;
//            }else if($scope.logado===false){  
//                 $scope.classPadding.nopadding=false; 
//                 $scope.classPadding.sipadding=true;
//            }
         
          
            $scope.classNegritaHome={
                negrita:false,
                nonegrita:false
            };
            
            $scope.classNegritaWorks={
                negrita:false,
                nonegrita:false
            };
            
            $scope.classNegritaReports={
                negrita:false,
                nonegrita:false
            };
            
          $scope.url=$location.url();  
          //console.log('la url en changeclass es ' + $scope.url + ' y el path vale ' + $location.path());
          //console.log('busqueda' + location.search);
            
            if($scope.url==="/login"){
                document.getElementById('navMenu').style.display = 'none';
                $scope.pagew.pagewrapper = false;
                $scope.anteriorLogin =true;
            }else{
                document.getElementById('navMenu').style.display = 'block';
                $scope.pagew.pagewrapper = true;
            }
            
           if($scope.url==="/home"){
                      $scope.classNegritaHome.negrita=true;
                      //$scope.classNegrita.nonegrita=false;
            }else{
                     // $scope.classNegrita.nonegrita=true;
                      $scope.classNegritaHome.negrita=false;  
                      
            }
            
            if($scope.url!=="/login" && $scope.url!=="/home"){
                $scope.anteriorLogin = false;
            }
   
            if($scope.url==="/works" || $scope.url.toString().match(/works/)){
                      $scope.classNegritaWorks.negrita=true;
                     // $scope.classNegrita.nonegrita=false;
            }else{
                     // $scope.classNegrita.nonegrita=true;
                      $scope.classNegritaWorks.negrita=false;  
                      
            }
            
            if($scope.url==="/works/Reports/"){
                      $scope.classNegritaReports.negrita=true;
                      //$scope.classNegrita.nonegrita=false;
            }else{
                      //$scope.classNegrita.nonegrita=true;
                      $scope.classNegritaReports.negrita=false;  
                      
            }
           
        };

   
        
        
   
      /* $scope.changeActive=function(){   
        $scope.url = $location.url();
   
           if($scope.url==="/home"){
                      $scope.activeHome=true;
                      $scope.activeWorks=false;
                      $scope.activeReports=false;
            }else{
                      $scope.activeHome=false;
            }
            
            if($scope.url==="/works"){
                      $scope.activeWorks=true;
                      $scope.activeHome=false;
                      $scope.activeReports=false;
            }else{
                      $scope.activeWorks=false;
            }
            
            if($scope.url==="/works/Reports/"){
                      $scope.activeReports=true;
                      $scope.activeHome=false;
                      $scope.activeWorks=false;
            }else{
                      $scope.activeReports=false;
                      
            }
       };*/
       $scope.option=false;
       $scope.options=function(){
           $scope.option=!$scope.option;
       };


       
     init = function(){
         
        $scope.pagew={
               pagewrapper:false
           };

    
        if(location.hash === '#/login'){
            $scope.pagew.pagewrapper = false;
        }else{
            document.getElementById('navMenu').style.display = 'block';
            $scope.pagew.pagewrapper = true;
        }  
      //   $scope.cambiaCSS();
         
        if($scope.connectionOK !== true){
            $scope.connectionOK = false;
        }
          
           
         // LOGADO
        if(sessionStorage.logado)
        {
            $scope.user = sessionStorage.user;
            $scope.repositorio = sessionStorage.repoName;
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
        
         $scope.logout = function(){
             document.getElementById('navMenu').style.display = 'none';
            $scope.pagew.pagewrapper = false;
           //  $scope.changeClass();
            sessionStorage.removeItem("idSesion");
            sessionStorage.removeItem("logado");
            $scope.logado=false;
            //$state.go("Login",{logout: true});
           //lo que habia antes $state.go('Login', {logout:true});
           $location.path('/login');
           $scope.changeClass();
            //$state.go('Login',{},{reload: 'Login'});
            //vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'select_all'});
           // $state.reload();
            //vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'select_all'});
        };
        
          $scope.logOutCapture = function(){
             $scope.databaseHostname = "";
             $scope.databasePort = "";
             $scope.databaseName = "";
             $scope.databaseUsername = "";
             $scope.databasePassword = "";
             $scope.databaseService = "";

             captureService.setMethod($scope.selectedMethod);
             captureService.setHostname($scope.databaseHostname);
             captureService.setPort($scope.databasePort);
             captureService.setName($scope.databaseName);
             captureService.setUsername($scope.databaseUsername);
             captureService.setPassword($scope.databasePassword);
             captureService.setService($scope.databaseService);


              $scope.hostName = captureService.getHostname();
              $scope.databasePort = captureService.getPort();
              $scope.databaseName = captureService.getName();
              $scope.userName = captureService.getUsername();
              $scope.databaseService = captureService.getService();
             
              $scope.connectionOK = false;

              $scope.STSConnectionOK = false;
              $scope.AWRConnectionOK = false;
              $scope.memoryConnectionOK = false;
              $scope.snapshotsAwrPage = false;
              $scope.secondAWR = false;
              $scope.firstAWR = false;
              $scope.filters = false;
              $scope.selectedOption = false;
              $scope.resumeSnapshotCapture = false;
              $scope.existingSnapshotAWR = false;
              $scope.listSTS = false;
              $scope.workAllGpsql = false;
              $scope.snapAllGpsql = false; 
              $scope.workDestino = false;
              $scope.ficheroTraza = false;
              $scope.captureOK = false;
              $scope.AWRMethod = false;
              $scope.MemoryMethod = false;
              $scope.STSMethod = false;
              $scope.GpsqlMethod = false;
              $scope.TraceMethod = false;
              console.log("salida de la conexion");
         };
         
            $scope.no_logado = true;
           // $scope.info="Connecting with server...";
       //   $scope.changeClass();
          
            
            if (!$scope.$$phase && !$scope.$root.$$phase) {
                $scope.$digest();
            }    
         
        
            if($scope.page==="formupload"){
                //alert("formupload");
                $scope.TraceMethod = true;
                $scope.filters = true;
            }
          
            
         
         //FUCION CAMBIAREPO
                        $scope.cambiaRepo = function (selectedRepo){
                                 //alert("selectedrepo vale en cambiorepo " + JSON.stringify(selectedRepo));
                                  $scope.selectedRepo = null;
                                            $('#selectedRepo option').prop({selected: false});
                                       $.each($scope.repos, function(key,value) {

                                            if(selectedRepo ===null){
                                                //SELECTEDREPO ESTA VACIO
                                                if($scope.repos[key].DEFAULT_REPO === 'yes'){
                                                $scope.selectedRepo = $scope.repos[key];
                                                $scope.selectedRepoName = $scope.repos[key].CONNECTION_NAME;
                                                sessionStorage.repo = $scope.selectedRepo;
                                                sessionStorage.repoName = $scope.selectedRepoName;
                                               /* $scope.user = document.getElementById('user');
                                                $scope.user.value = 'user';*/
                                                
                                                }
                                                 $('#selectedRepo option:contains(' + $scope.repos[key].CONNECTION_NAME + ')').prop({selected: true});
                                            }
                                            else if(selectedRepo !==null){
                                                 //SELECTEDREPO NO ESTA VACIO
                                                 $scope.repos[key].DEFAULT_REPO = "yes";
                                                if($scope.repos[key].CONNECTION_NAME === selectedRepo.CONNECTION_NAME){
                                                   
                                                    $('#selectedRepo option:contains(' + $scope.repos[key].CONNECTION_NAME + ')').prop({selected: true});
                                                   
                                                    $scope.selectedRepo = $scope.repos[key];
                                                    $scope.selectedRepoName = $scope.repos[key].CONNECTION_NAME;
                                                    sessionStorage.repo = $scope.selectedRepo;
                                                    sessionStorage.repoName = $scope.selectedRepoName;

                                                }
                                            }
                                            
                                            
                                       });
                                      // alert("al final del each selectedrepo vale " + JSON.stringify($scope.selectedRepo)); 
                            };
                            
                          
                    // REPOSITORY RESULTS
                        vertxEventBusService.on('repository_results', function(messageRepository) {

                        if(Object.prototype.toString.call(messageRepository) === "[object Array]"){  
                            $scope.comprobacionError=messageRepository[0].VERTX_ERROR;
                          if(messageRepository[0].ACTION==="select_all"){             
                               $scope.repos=messageRepository;
                               $scope.repos.shift(); 
                               console.log(JSON.stringify($scope.repos));
                               for(var i=0; i<$scope.repos.length;i++){
                                    if($scope.repos[i].DEFAULT_REPO==='yes'){
                                        $scope.datosRepo = $scope.repos[i];
                                        console.log($scope.datosRepo.USER_NAME);
                                    }
                               }
                               $scope.cambiaRepo(null);       
                               
                           }else  if(messageRepository[0].ACTION==="delete_repo"){
                               setError(messageRepository[0].VERTX_ERROR,messageRepository[0].VERTX_MESSAGE,$scope,ngDialog,$timeout);
 
                           }else if(messageRepository[0].ACTION==="select_repo_data"){
                              $scope.datosRepo=messageRepository[1];
                             

                           }else if(messageRepository[0].ACTION==="modify_repo" || messageRepository[0].ACTION==="create_repo_tables" || messageRepository[0].ACTION==="test_conn" || messageRepository[0].ACTION==="add_repo"){
                                setError(messageRepository[0].VERTX_ERROR,messageRepository[0].VERTX_MESSAGE,$scope,ngDialog,$timeout);
                                
                                
                                
                               if(document.getElementById("DB_TYPE").value===""){
                                    $scope.error="Select a type  of database";
                                    $scope.message="Select a type  of database";
                                    setError($scope.error,$scope.message,$scope,ngDialog,$timeout);
                                }
                             }else if(messageRepository[0].ACTION==="verify_repo_pass" && messageRepository[0].VERTX_ERROR==="NO"){
                               // $scope.errorPass;
                                //if(messageRepository[0].VERTX_ERROR==="NO"){
                                    setError(messageRepository.VERTX_ERROR,messageRepository.VERTX_MESSAGE,$scope,ngDialog,$timeout);
                                    $scope.errorPass=false;
                                     $scope.$broadcast('errorPass', {errorPass: $scope.errorPass});
                                 //   alert("$scope.errorPass en verify_repo_pass "+$scope.errorPass);
                                   // sessionStorage.errorPass=$scope.errorPass;
                                  /* if(sessionStorage.errorPass){
                                       sessionStorage.removeItem('errorPass');
                                   }*/
                                   
                                     console.log("----------Genial---------"+$scope.errorPass);
                               // }
                            }
                       }
                       
                       if(Object.prototype.toString.call(messageRepository) === "[object Object]"){
                           $scope.comprobacionError=messageRepository.VERTX_ERROR;
                            if(messageRepository.ACTION==="modify_repo"){ 
                                setError(messageRepository.VERTX_ERROR,messageRepository.VERTX_MESSAGE,$scope,ngDialog,$timeout);
                               
                                if(document.getElementById("DB_TYPE").value===""){
                                    $scope.error="Select a type  of database";
                                    $scope.message="Select a type  of database";
                                    setError($scope.error,$scope.message,$scope,ngDialog,$timeout);
                                }
                                
                            }else if(messageRepository.ACTION==="create_repo_tables"){
                                setError(messageRepository.VERTX_ERROR,messageRepository.VERTX_MESSAGE,$scope,ngDialog,$timeout);
                               
                                if(document.getElementById("DB_TYPE").value===""){
                                    $scope.error="Select a type  of database";
                                    $scope.message="Select a type  of database";
                                    setError($scope.error,$scope.message,$scope,ngDialog,$timeout);
                                }
                                
                                if(messageRepository.VERTX_ERROR==="NO"){
                                    $scope.createRepo=true;
                                }else{
                                    $scope.createRepo=false;
                                }
                            }else if(messageRepository.ACTION==="test_conn"){
                                setError(messageRepository.VERTX_ERROR,messageRepository.VERTX_MESSAGE,$scope,ngDialog,$timeout);
                               
                                if(document.getElementById("DB_TYPE").value===""){
                                    $scope.error="Select a type  of database";
                                    $scope.message="Select a type  of database";
                                    setError($scope.error,$scope.message,$scope,ngDialog,$timeout);
                                }
                                
                                if(messageRepository.VERTX_ERROR==="NO"){
                                    $scope.test=true;
                                }else{
                                    $scope.test=false;
                                }
                                
                            }else if(messageRepository.ACTION==="add_repo"){
                                setError(messageRepository.VERTX_ERROR,messageRepository.VERTX_MESSAGE,$scope,ngDialog,$timeout);
                               
                                if(document.getElementById("DB_TYPE").value===""){
                                    $scope.error="Select a type  of database";
                                    $scope.message="Select a type  of database";
                                    setError($scope.error,$scope.message,$scope,ngDialog,$timeout);
                                }
                            }else if(messageRepository.ACTION==="verify_repo_pass" && messageRepository.VERTX_ERROR==="Wrong password"){
                                //$scope.errorPass;
                                
                               // if(messageRepository.VERTX_ERROR==="Wrong password"){
                                    setError(messageRepository.VERTX_ERROR,messageRepository.VERTX_MESSAGE,$scope,ngDialog,$timeout);
                                     $scope.errorPass=true;
                                     //sessionStorage.errorPass=true;
                                      $scope.$broadcast('errorPass', {errorPass: $scope.errorPass});
                                     
                                     console.log("----------errror en password---------"+$scope.errorPass);
                               // }
                            }
                            
                            
                        }
                        
                
                           
//                           if(Object.prototype.toString.call(messageRepository) === "[object Array]"){
//                                if(messageRepository[0].ACTION==="select_repodb"){
//                                    messageRepository.shift();
//                                   $scope.dbType=[];
//                                   
//                                     for(var i=0; i<messageRepository.length; i++){
//                                         $scope.dbType.push(messageRepository[i]);
//                                     }                               
//                               } 
//                           } //FIN DE SI ES UN ARRAY 
                        });
                            
                       
                     
                            //WORKS RESULTS
                             vertxEventBusService.on('work_results', function(messageWorks) {
                        //         console.log(JSON.stringify(messageWorks));
                                 
                                 
                                 
                            // $scope.WorksResults = messageWorks; 
                            console.log("Antes if is object");
                               if(Object.prototype.toString.call(messageWorks) === "[object Object]"){
                                   //console.log("es un object object: 1: " + messageWorks.VERTX_ERROR + " 2: " + messageWorks.ID_SES + " 3: " + sessionStorage.idSesion  + " 4: " + messageWorks.ID_CON + " 5: " + (actionData.getIdCon()).toString());
                                    if(messageWorks.VERTX_ERROR && messageWorks.ID_SES===sessionStorage.idSesion && messageWorks.ID_CON===(actionData.getIdCon()).toString()){
                                        console.log("Entra en el if error");
                                       // alert("el error es " + messageWorks.VERTX_ERROR);
                                        $scope.info = messageWorks.VERTX_ERROR;
                                        if(messageWorks.VERTX_ERROR==="No works found"){
											console.log("no works condition");
                                            $scope.noWorks = true;
											$scope.numWorks=0;
											$scope.repositorio = sessionStorage.repoName;
											$scope.WorksResults = undefined;
                                        }
                                    }
                                    
                               }
                             
                             console.log("sale de if object");
                             
                             if(Object.prototype.toString.call(messageWorks) === "[object Array]" ){
                                       if(messageWorks[0].ACTION ==="select_all"){
										   $scope.info = "";
                                           console.log('entra aqui en select all');
                                           $scope.WorksResults = messageWorks;
                                           $scope.WorksResults.shift();
                                           //console.log("La pagina "+$scope.page);
                                           
                                                    console.log("la pagina es ", $scope.page);
                                                if($scope.page==="Works" || $scope.page==="Home"){ 
                                                  //  console.log('entra en este if,la pagina es works y messageworks vale',messageWorks);
                                                     //$scope.generateNewTable(messageWorks,2,false);
                                                    
												$scope.numWorks=messageWorks.length;
												$scope.repositorio = sessionStorage.repoName;
												tableService.generateTable(messageWorks,false,$scope);
                                                    
                                                  
                                                }
//                                                if($scope.page==="Home"){
//                                                     
//                                                       console.log('entra en este if,la pagina es home y messageworks vale',messageWorks);   
//                                                       $scope.generateNewTable(messageWorks,2,false);
//                                                } 
                                           
                                           if($scope.page==="Select the source work"){ //   || $scope.page==="Database Connect"){
                                             $scope.gpsqlConnectionOK = true;
                                             $scope.workAllGpsql = true;
                                             console.log("$scope.gpsqlConnectionOK "+$scope.gpsqlConnectionOK);
                                             //$scope.generateNewTable(messageWorks,17,false);
											 tableService.generateTable(messageWorks,false,$scope);
                                           }
                                           if($scope.page==="Select the destination work" || $scope.page==="Filters"){
                                             $scope.snapAllGpsql = false;
                                             $scope.workDestino = true;
                                             //$scope.generateNewTable(messageWorks,19,false);
											 tableService.generateTable(messageWorks,false,$scope);
                                           }
                                       }
                                    if(messageWorks[0].detailed === "yes"){

                                        if(messageWorks[0].ACTION ==="select_detailname"){
                                          //  alert("select_detailname: " + JSON.stringify(messageWorks));
                                           
                                                $scope.currentWorkDetails = messageWorks;
                                                $scope.currentWorkDetails.shift();
                                                $scope.SeeDetails($scope.currentWorkDetails);
                                            
                                           //$scope.WorksResults = messageWorks;
                                       }
                                       else{
                                             console.log("si detail");
                                             $scope.DetailedWorks = messageWorks[1];
                                       }
                                      //  "VERTX_MESSAGE":"OK","ACTION":"select_detailname","detailed":"yes"
                                    }
                                     if(messageWorks[0].detailed === "no" && messageWorks[0].ID_SES===sessionStorage.idSesion && messageWorks[0].ID_CON===(actionData.getIdCon()).toString()){
                                        console.log("no detail");

                                        if(messageWorks[0].ACTION ==="add" || messageWorks[0].ACTION ==="modify"  || messageWorks[0].ACTION ==="delete"){
                                                        setError(messageWorks[0].VERTX_ERROR,messageWorks[0].VERTX_MESSAGE,$scope,ngDialog,$timeout);
                                                        vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString()});

                                        }
               
                                        
                                     }      
                                                
                                }else{
                                    if ( $scope.noWorks === true){
                                        console.log("no works");
										$scope.numWorks=0;
										$scope.repositorio = sessionStorage.repoName;
                                        tableService.generateTable(messageWorks,false,$scope);
                                    }
                                }
                                

                            });
                          
                            //BUS SNAPSHOT_RESULTS
                            vertxEventBusService.on('snapshot_results', function(messageSnapshots) {
                                console.log('llega a snapshot_results',messageSnapshots);
								if(Object.prototype.toString.call(messageSnapshots) === "[object Object]"){
									console.log('Es un objeto' + messageSnapshots.ID_SES);
									if(messageSnapshots.VERTX_ERROR ==="No snapshots for this work")
                                    {
                                        //NO HAY SNAPSHOTS
                                        $scope.HaveSnapshots = false;     
										$scope.info = "";										
                                        //$scope.info = messageSnapshots.VERTX_ERROR;
										//vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.SelectedIdWork, ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString()});
                                    }  
								}
								
							  if(Object.prototype.toString.call(messageSnapshots) === "[object Array]" ){
								  $scope.info = "";
                                if( messageSnapshots[0].ID_SES===sessionStorage.idSesion){
                                    console.log("entra en el filtro");
                                    
                                    $scope.isSnapshotDetailed = messageSnapshots[0].detailed;
                                    console.log('$scope.isSnapshotDetailed',$scope.isSnapshotDetailed);
                                    if($scope.isSnapshotDetailed==="no"){
                                    console.log("no es snapshot detailed");
                                    //si no es detallado (menu principal)
                                        if(messageSnapshots[0].ACTION==="select_all" ){ //&& $scope.page!=="Select a snapshot"){
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
                                                    $scope.SnapshotsResults = messageSnapshots;
                                                 
                                                    
                                                       //  $scope.generateNewTable(messageSnapshots,1,true);
													   if($scope.page==="Save snapshot" || $scope.page==="Select a snapshot"){
														    tableService.generateTable(messageSnapshots,true,$scope);
													   }else{
															tableService.generateTable(messageSnapshots,false,$scope);
													   }
                                                         console.log("No Capture");
                                                          $scope.$broadcast('SnapshotsResults', {SnapshotsResults: messageSnapshots}); 
                                                }
                                        }
										// delete/modify action
										if(messageSnapshots[0].ACTION ==="add" || messageSnapshots[0].ACTION ==="delete" || messageSnapshots[0].ACTION ==="modify"){
                                                        setError(messageSnapshots[0].VERTX_ERROR,messageSnapshots[0].VERTX_MESSAGE,$scope,ngDialog,$timeout);
                                                        //vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString()});
														vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.SelectedIdWork, ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString()});

											}
                                    }else{
                                        //si es detalle
                                        console.log("si es snapshot detailed");
                                        //cargo los datos del snapshot
                                         if(messageSnapshots[0].ACTION==="select_snapshot_detail"){ 
                                            console.log('entra en select_snapshot_detail');
                                            $scope.snapshotDetailLoaded = false;
                                             $scope.snapshotDescription = messageSnapshots[1].SNAPSHOT_DESCRIPTION;
                                             $scope.snapshotCreated = messageSnapshots[1].CREATED;
                                             $scope.SelectedIdWork = messageSnapshots[1].ID_WORK;
                                             $scope.idSnapshot = messageSnapshots[1].ID_SNAPSHOT;
                                             $scope.snapshotDetailLoaded = true;
                                            
                                        }    
                                        //DETALLES DE LA EJECUCION DE LOS SNAPSHOTS
                                          if(messageSnapshots[0].ACTION==="select_snapdet"){
                                                 if(messageSnapshots[0].VERTX_MESSAGE !=="No executions details for this snapshot"){
                                                     console.log('tiene detalles de la ejecucion');
                                                    //HAY DETALLES DE LA EJECUCION
                                                      $scope.HaveSnapshotsExecutionDetails = true;
                                                      //DETAILEDSNAPSHOT ES LA VARIABLE CON LA QUE LEE LOS DATOS PARA GENERAR LA TABLA
                                                      $scope.ExecutionDetailedSnapshot = messageSnapshots;
                                                      //GENERO LA TABLA CON LOS DETALLES DE LA EJECUCI�N DE LOS SNAPSHOTS
                                                      //$scope.generateTable(messageSnapshots);
                                                      $scope.page = "Snapshots Execution";
                                                      //$scope.generateNewTable(messageSnapshots,23,true);
                                                      tableService.generateTable(messageSnapshots,false,$scope);
                                                }else{
                                                    console.log('NO tiene detalles de la ejecucion');
                                                    //NO HAY DETALLES DE LA EJECUCION
                                                    $scope.infoExecutions = messageSnapshots[0].VERTX_MESSAGE;
                                                    console.log(' $scope.infoExecutions', $scope.infoExecutions);
                                                    $scope.HaveSnapshotsExecutionDetails = false;
                                                }  
                                          }
                                          //PAR�METROS DE BASES DE DATOS SNAPSHOTS
                                          if(messageSnapshots[0].ACTION==="select_snapparams"){

                                                //SI NO HAY PARAMETROS DE LA BASE DE DATOS
                                                console.log("$scope.infoParameters "+$scope.infoParameters);
                                                if(messageSnapshots[0].VERTX_MESSAGE ==="No parameters for this snapshot"){
                                                    console.log("entraaaaaaaaaaaaaa");
                                                    $scope.params = false;
                                                    $scope.HaveParameters = false;
                                                    $scope.noParameters = true;
                                                    $scope.infoParameters = messageSnapshots[0].VERTX_MESSAGE;
                                                   
                                                    if($scope.infoParameters === "Loading parameters..."){
                                                        $scope.noParameters = false;
                                                    }else{
                                                        $scope.noParameters = true;
                                                    }
                                                    console.log("$scope.infoParameters "+$scope.infoParameters);
                                                }
                                                //SI SI HAY PARAMETROS DE LA BASE DE DATOS
                                                if(messageSnapshots[0].VERTX_MESSAGE ==="OK"){
                                                     $scope.noParameters = false;
                                                    $scope.infoParameters = "Loading parameters...";
                                                     $scope.HaveParameters = true;
                                                     //$scope.generateTable(messageSnapshots);
                                                     $scope.page="Snapshots Parameters";
                                                    // $scope.generateNewTable(messageSnapshots,24,false);
                                                    tableService.generateTable(messageSnapshots,false,$scope);
                                                     $scope.params = messageSnapshots;
                                                     $scope.params.shift();
                                                }

                                            }
                                        
                                    } 
                                    
                                } //fin del filtro del idcon
							  }
                                
                            });
                               //BUS QUERY_RESULTS
                            vertxEventBusService.on('query_results', function(messageQuerys) {
                               
                                        if(messageQuerys[0].ACTION==="select_bg_list" && messageQuerys[0].ID_SES===sessionStorage.idSesion){
                                            $scope.bgList = messageQuerys;
                                            $scope.bgList.shift();
                                            $scope.generateTable($scope.bgList);
                                        } 
                                        
                                if(messageQuerys[0].detailed==="no"  && messageQuerys[0].ID_SES===sessionStorage.idSesion && messageQuerys[0].ID_CON===(actionData.getIdCon()).toString()){
                                        if(messageQuerys[0].ACTION==="select_all"){
												console.log("select all detailed no");
												console.log("message: " + messageQuerys[0].VERTX_MESSAGE);
                                                if(messageQuerys[0].VERTX_MESSAGE ==="No querys for this work")
                                                {
													console.log("scope info: " + $scope.info);
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
                                        
                                        
                                        
                                     if(messageQuerys[0].ACTION==="delete"){
                                           console.log("Estamos borrando una query");
                                           setError(messageQuerys[0].VERTX_ERROR,messageQuerys[0].VERTX_MESSAGE,$scope,ngDialog,$timeout);  
										   $scope.Progress = false;
                                         //REFRESCO LOS DATOS DE LOS SNAPSHOTS PARA QUE APAREZCAN REFLEJADOS LOS CAMBIOS
                                         vertxEventBusService.send('query_actions', {VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.SelectedIdWork, ID_SES:sessionStorage.idSesion, ID_CON:  actionData.setIdCon().toString()});
                                         
                                     }
                                     
                                };

                                if(messageQuerys[0].detailed==="yes"  && messageQuerys[0].ID_SES===sessionStorage.idSesion && messageQuerys[0].ID_CON===(actionData.getIdCon()).toString()){
                                        if(messageQuerys[0].ACTION==="select_detail"){
                                              $scope.DetailedQuery = messageQuerys[1];
                                              console.log("detailedquery:" + JSON.stringify(messageQuerys));
                                        }

                                        if(messageQuerys[0].ACTION==="select_bg_detail"){
                                        
                                              $scope.BGDetailResult = messageQuerys;
                                              $scope.BGDetailResult.shift();
                                           //   $scope.generateTable($scope.BGDetailResult);
                                        }                                        
                                        
                                        
                                };
                                
                                
                            });         
                            
                               //BUS oracle_capture_results
                            vertxEventBusService.on('oracle_capture_results', function(messageOracleCapture) {
                                console.log("oracle_capture_results:"+JSON.stringify(messageOracleCapture));
                               console.log("el tipo de datos de messageOracleCapture es " + Object.prototype.toString.call(messageOracleCapture)); 
                               console.log("messageOracleCapture "+JSON.stringify(messageOracleCapture));
                               
                               if(Object.prototype.toString.call(messageOracleCapture) === "[object Array]"){
                                   console.log("es un object array");
                                    if(messageOracleCapture[0].VERTX_ERROR === "NO" && messageOracleCapture[0].ACTION==="show_filters" && messageOracleCapture[0].ID_SES===sessionStorage.idSesion && messageOracleCapture[0].ID_CON===(actionData.getIdCon()).toString()){
                                    //alert("llega a show_filters: " + JSON.stringify(messageOracleCapture));
                                    $scope.filters = messageOracleCapture;
                                    $scope.filters.shift();
                                    console.log("hay " + $scope.filters.length + " filtros");
                                    //alert("los filtros son " + JSON.stringify($scope.filters));
                                    for(i=0;i < $scope.filters.length;i++){
                                       // console.log("filter i vale " + JSON.stringify($scope.filters[i]));
                                        if($scope.filters[i].FILTER_FIELD === "COMMAND_TYPE"){
                                            $scope.commandTypeFilter = $scope.filters[i];
                                            //$scope.commandTypeFilterValues = JSON.stringify($scope.filters[i].VALUES);
                                            //console.log("$scope.commandTypeFilterValues vale " + JSON.stringify($scope.commandTypeFilterValues))
                                           // console.log("commandTypeFilter vale " + JSON.stringify($scope.commandTypeFilter));
                                        }
                                        if($scope.filters[i].FILTER_FIELD === "PARSING_SCHEMA_NAME"){
                                            $scope.parsingSchemaNameFilter = $scope.filters[i];
                                            console.log("parsingSchemaNameFilter vale " + JSON.stringify($scope.parsingSchemaNameFilter));
                                        }
                                        if($scope.filters[i].FILTER_FIELD === "SQL_TEXT"){
                                            $scope.sqlTextFilter = $scope.filters[i];
                                            console.log("sqlTextFilter vale " + JSON.stringify($scope.sqlTextFilter));
                                        }
                                        if($scope.filters[i].FILTER_FIELD === "SQL_ID"){
                                            $scope.sqlIdFilter = $scope.filters[i];
                                            console.log("sqlIdFilter vale " + JSON.stringify($scope.sqlIdFilter));
                                        }
                                        if($scope.filters[i].FILTER_FIELD === "SQL_MODULE"){
                                            $scope.sqlModuleFilter = $scope.filters[i];
                                            console.log("sqlModuleFilter vale " + JSON.stringify($scope.sqlModuleFilter));
                                        }     
                                        if($scope.filters[i].FILTER_FIELD === "PLAN_HASH_VALUE"){
                                            $scope.planHashValueFilter = $scope.filters[i];
                                            console.log("planHashValueFilter vale " + JSON.stringify($scope.planHashValueFilter));
                                        }                                          
                                        if($scope.filters[i].FILTER_FIELD === "EXECUTIONS"){
                                            $scope.executionsFilter = $scope.filters[i];
                                            console.log("executionsFilter vale " + JSON.stringify($scope.executionsFilter));
                                        }          
                                        if($scope.filters[i].FILTER_FIELD === "DISK_READS"){
                                            $scope.diskReadsFilter = $scope.filters[i];
                                            console.log("diskReadsFilter vale " + JSON.stringify($scope.diskReadsFilter));
                                        }  
                                        if($scope.filters[i].FILTER_FIELD === "ROWS_PROCESSED"){
                                            $scope.rowsProcessedFilter = $scope.filters[i];
                                            console.log("rowsProcessedFilter vale " + JSON.stringify($scope.rowsProcessedFilter));
                                        }  
                                        if($scope.filters[i].FILTER_FIELD === "CPU_TIME"){
                                            $scope.cpuTimeFilter = $scope.filters[i];
                                            console.log("cpuTimeFilter vale " + JSON.stringify($scope.cpuTimeFilter));
                                        }  
                                        if($scope.filters[i].FILTER_FIELD === "ELAPSED_TIME"){
                                            $scope.elapsedTimeFilter = $scope.filters[i];
                                            console.log("elapsedTimeFilter vale " + JSON.stringify($scope.elapsedTimeFilter));
                                        }     
                                        if($scope.filters[i].FILTER_FIELD === "OPTIMIZER_COST"){
                                            $scope.optimizerCostFilter = $scope.filters[i];
                                            console.log("optimizerCostFilter vale " + JSON.stringify($scope.optimizerCostFilter));
                                        }                                           
                                        
                                    }

                                    }
                                    
                                    
                                   if(messageOracleCapture[0].VERTX_ERROR === "NO" && messageOracleCapture[0].ACTION==="test_oracle_conn" && messageOracleCapture[0].ID_SES===sessionStorage.idSesion && messageOracleCapture[0].ID_CON===(actionData.getIdCon()).toString()){
                                        $scope.errorCapture = messageOracleCapture[0].VERTX_MESSAGE;
                                        $scope.connectionOK = true;
                                        $scope.cambioClase = false;
                                        //sessionStorage.connectionOK = true;
                                        console.log("NO hay error en messageOracleCapture en el test_oracle_conn");
										console.log("Method: " + captureService.getMethod());
										$scope.method = captureService.getMethod();

                                        //alert("el metodo es " + captureService.getMethod());
                                        if(captureService.getMethod() ==="AWR"){
                                          /*  console.log("el metodo es " + captureService.getMethod());
                                            console.log("el hostname es " + captureService.getHostname());
                                            console.log("el puerto es " + captureService.getPort());
                                            console.log("el getName es " + captureService.getName());
                                            console.log("el getUsername es " + captureService.getUsername());
                                            console.log("el getPassword es " + captureService.getPassword());
                                            console.log("el getService es " + captureService.getService());
                                          */  
                                            vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"select_all_AWR",HOST_NAME:captureService.getHostname(),PORT:captureService.getPort(),DB_NAME:captureService.getName(),USER_NAME:captureService.getUsername(),PASSWD:captureService.getPassword(),ORACLE_SERVICE_SID:captureService.getService()}); 
                                                      /*     $timeout(function() { 
                                                                vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"show_filters",DB_TYPE:"Oracle"});        
                                                            }, 500);
                                                            */
                                            
                                        }
                                        
                                        if($scope.method ==="STS"){
                                            console.log("STS RESULT CONN ");
                                            vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"select_all_STS",HOST_NAME:captureService.getHostname(),PORT:captureService.getPort(),DB_NAME:captureService.getName(),USER_NAME:captureService.getUsername(),PASSWD:captureService.getPassword(),ORACLE_SERVICE_SID:captureService.getService()});                                             
                                            $scope.refreshPage(16);
                                            $scope.STSConnectionOK = true;
                                            $scope.listSTS = true;
                                            console.log("$scope.STSConnectionOK: " +$scope.STSConnectionOK+" $scope.listSTS: "+$scope.listSTS );
                                        }
                                        
                                        if($scope.method === "Memory"){
                                            $scope.memoryConnectionOK = true;
											 console.log("Enter memory method");
                                            $scope.filters = true;
                                            //$scope.refreshPage(12);
                                            //$scope.botonFilters = false;
                                        }
                                        
                                        if($scope.method === "GPSQL"){
                                            $scope.gpsqlConnectionOK = true;
											
                                        }
										
										if($scope.method === "WORK"){
											console.log("Entra metodo replay work");
                                            $scope.gpsqlConnectionOK = true;
											vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString()});
											//$scope.guardarDatosConexion();
											$scope.refreshPage(17); 
                                        }
										
										if($scope.method === "SNAPSHOT"){
											console.log("Entra metodo replay snapshot");
                                            $scope.gpsqlConnectionOK = true;
											vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString()});
											//$scope.guardarDatosConexion();
											$scope.refreshPage(17); 
                                        }
										
                                    }
                                    if(messageOracleCapture[0].VERTX_ERROR === "NO" && messageOracleCapture[0].VERTX_MESSAGE === "OK" && messageOracleCapture[0].ACTION==="select_all_AWR" && messageOracleCapture[0].ID_SES===sessionStorage.idSesion && messageOracleCapture[0].ID_CON===(actionData.getIdCon()).toString()){
                                        $scope.errorCapture = messageOracleCapture[0].VERTX_MESSAGE;
                                        $scope.connectionOK = true;
                                        $scope.AWRConnectionOK = true;
                                        captureService.setAWRConnectionOK(true);
                                        $scope.$broadcast('AWRConnectionOK', {AWRConnectionOK: true});
                                      //  $scope.page = "Select First AWR";
                                        
                                        $scope.generateTable(messageOracleCapture);    
                                    }
                                    
                                    if(messageOracleCapture[0].VERTX_ERROR === "NO" && messageOracleCapture[0].VERTX_MESSAGE === "OK" && messageOracleCapture[0].ACTION==="select_all_STS" && messageOracleCapture[0].ID_SES===sessionStorage.idSesion){
                                        $scope.errorCapture = messageOracleCapture[0].VERTX_MESSAGE;
                                        $scope.connectionOK = true;
                                        $scope.STSConnectionOK = true;
                                        $scope.listSTS = true;
                                        captureService.setSTSConnectionOK(true);
                                        $scope.$broadcast('STSConnectionOK', {STSConnectionOK: true});
                                        $scope.refreshPage(16);
                                        console.log("Estamos en la respuesta de select_all_sts");
                                        $scope.generateTable(messageOracleCapture);    
                                    }
                                    if(messageOracleCapture[0].VERTX_ERROR === "NO" && messageOracleCapture[0].VERTX_MESSAGE === "OK" && messageOracleCapture[0].ACTION==="show_filters" && messageOracleCapture[0].ID_SES===sessionStorage.idSesion && messageOracleCapture[0].ID_CON===(actionData.getIdCon()).toString()){
                                        $scope.filters = messageOracleCapture;
                                        $scope.filters.shift();
                                    }
                                    if(messageOracleCapture[0].VERTX_ERROR === "NO" && messageOracleCapture[0].ACTION==="load_querys_mem" || messageOracleCapture[0].ACTION==="load_querys_awr" ||  messageOracleCapture[0].ACTION === "load_querys_sts" ||  messageOracleCapture[0].ACTION === "load_querys_gpsql" || messageOracleCapture[0].ACTION === "load_querys_trace"){
                                        console.log("Entra en el main controller del capture");
                                        $scope.captureOK = true;
                                        $scope.$broadcast('captureOK', {captureOK: $scope.captureOK});
                                        $scope.idSnapshotURL = decodeURIComponent($stateParams.idSnapshot);
										$state.go("Home",{});
                                        /*if(messageOracleCapture[0].ID_SNAPSHOT){ 
											console.log("Si hay id_snapshot");										
                                            if(messageOracleCapture[0].ACTION === "load_querys_gpsql"){
                                              $timeout($state.go("SnapshotsDetails",{SelectedWorkName: sessionStorage.selectedWorkNameDestino,idSnapshot:messageOracleCapture[0].ID_SNAPSHOT}),3000);                                                 
                                            }else{
                                              $timeout($state.go("SnapshotsDetails",{SelectedWorkName:$scope.SelectedWorkName,idSnapshot:messageOracleCapture[0].ID_SNAPSHOT}),3000); 
                                            }  
                                                //$scope.refreshPage(5);
                                        }else if(!messageOracleCapture[0].ID_SNAPSHOT){
											console.log("No hay id_snapshot");	
                                            if(messageOracleCapture[0].ACTION === "load_querys_gpsql"){
                                                $timeout($state.go("SnapshotsDetails",{SelectedWorkName: sessionStorage.selectedWorkNameDestino,idSnapshot:sessionStorage.idSnapshot}),3000);                                                 
                                            }else{
                                                $timeout($state.go("SnapshotsDetails",{SelectedWorkName:$scope.SelectedWorkName,idSnapshot:sessionStorage.idSnapshot}),3000);
                                            }
                                             //$scope.refreshPage(5);
                                        }*/
                                        $scope.Progress = false;
                                        $scope.$broadcast('ProgressAWR', {progressAWR : $scope.Progress});  
                                        $scope.logOutCapture();
                                    }
                                  console.log("messageOracleCapture "+JSON.stringify(messageOracleCapture));
                                   /*if(messageOracleCapture[0].VERTX_ERROR === "NO" && messageOracleCapture[0].ACTION==="load_querys_mem"){
                                        console.log("Entra en el main controller del capture");
                                        $scope.captureOK = true;
                                        $scope.$broadcast('captureOK', {captureOK: $scope.captureOK});
                                        $scope.idSnapshotURL = decodeURIComponent($stateParams.idSnapshot);
                                        if(messageOracleCapture[0].ID_SNAPSHOT){  
                                              $timeout($state.go("SnapshotsDetails",{SelectedWorkName:$scope.SelectedWorkName,idSnapshot:messageOracleCapture[0].ID_SNAPSHOT}),3000);                                      
                                        }else if(!messageOracleCapture[0].ID_SNAPSHOT){
                                            $timeout($state.go("SnapshotsDetails",{SelectedWorkName:$scope.SelectedWorkName,idSnapshot:sessionStorage.idSnapshot}),3000);
                                        }
                                        $scope.Progress = false;
                                        $scope.$broadcast('ProgressAWR', {progressAWR : $scope.Progress});  
                                }*/
                                   
                               }
                               
                               
                               
                               if(Object.prototype.toString.call(messageOracleCapture) === "[object Object]"){
                                   
                                   console.log("messageOracleCapture "+JSON.stringify(messageOracleCapture));
                                 //  console.log("es un object object");
                                 $scope.cambioClase = true;
                                 console.log("$scope.cambioClase: "+$scope.cambioClase);
                                    if(messageOracleCapture.VERTX_ERROR && messageOracleCapture.ID_SES===sessionStorage.idSesion && messageOracleCapture.ID_CON===(actionData.getIdCon()).toString()){
                                        $scope.errorCapture = messageOracleCapture.VERTX_ERROR;
                                        $scope.connectionOK = false;
                                        
                                //        console.log("SI hay error en messageOracleCapture");
                                    }
                                   
                               }
                                
                            });        

				vertxEventBusService.on('tasks_results', function(messageCaptureTask) {
                                console.log("tasks_results:"+JSON.stringify(messageCaptureTask));
                               console.log("el tipo de datos de messageCaptureTask es " + Object.prototype.toString.call(messageCaptureTask)); 
                               console.log("messageCaptureTask "+JSON.stringify(messageCaptureTask));	

				if(Object.prototype.toString.call(messageCaptureTask) === "[object Object]"){
					$scope.jobdetails = messageCaptureTask.VERTX_MESSAGE + " " + messageCaptureTask.ADITIONAL_MESSAGE;
					if(messageCaptureTask.DONE==="0"){ 
						$scope.jobpercent="0%";
					}else{
						//converto to integer
						var initial = Number(messageCaptureTask.DONE);
						var total = Number(messageCaptureTask.TOTAL);
						var percent = Math.round(initial*100/total);	
						$scope.jobpercent=percent + "%";
						console.log("Done: " + initial + " Total: " + total + " percent: " + percent);
					}
					$scope.jobdetails=messageCaptureTask.ADITIONAL_MESSAGE;
					
				}
							   
				});  
                            
    
    //REFRESH PAGE
     $scope.refreshPage = function(page){
         console.log("llama a refreshpage en el MainController y la pagina es " + page);
         //alert("llama a refreshpage y la pagina es " + page);
                        // si la pagina no es ni la home ni works, env�a la petici�n de los works
                          if(sessionStorage.idSesion && page > 3){
                              console.log('entra aquiiiii');
                             //ENVIA LA PETICION PARA OBTENER TODOS LOS WORKS
                             vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString()});
                         }
                         if(page !== 5){
                             sessionStorage.removeItem("activeTabSnapshotsDetails");
                         }
             $scope.errorCapture = "";        
           //  $scope.info="Connecting with server...";
             $scope.HaveResults = false;
             $scope.currentPageData = pageService.getPage(page);
             $scope.page = $scope.currentPageData[0].title;
             $scope.helpText=$scope.currentPageData[0].helpText;
             console.log("currentPagedata vale ",$scope.currentPageData);
             $scope.changeClass();
         };

           
         
           
 }; //acaba el init
  
    window.onload = init;

$scope.generateTable=function(datos){
    //vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString()});
                       
                  //alert("llama a generatetable y la pagina es " + $scope.page);
                        $scope.sort = function(keyname){
                            $scope.updown = false; 
                            $scope.sortKey = keyname;   //set the sortKey to the param passed
                            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
                            
                        };
                        
                        $scope.Results = datos;
                       // $scope.itemsPerPage = 10;
                        $scope.HaveResults = true;
            switch($scope.page){
                 case "Home":
                     $scope.Works = datos;
                     $scope.Works.shift();
                     $scope.WorksPage = false;
                     console.log("$scope.Works: "+$scope.Works.length);
                     $scope.sortKey = "ID_WORK"; 
                     $scope.currentPageWorks=1;
                     $scope.itemsPerPageWorks=5;
                     $scope.totalWorks=$scope.Works.length;
                     $scope.currentPage=1;
                     $scope.itemsPerPage=$scope.itemsPerPageWorks;
                     $scope.total=$scope.totalWorks;
                     sessionStorage.currentPageWorks=1;
                 break;
                 
                 case "Works":
                     $scope.Works = datos;
                     $scope.Works.shift();
                     $scope.sortKey = "ID_WORK"; 
                    //$scope.currentPageWorks=1;
                     $scope.itemsPerPageWorks=10;
                     $scope.totalWorks=$scope.Works.length;
                     $scope.currentPage=sessionStorage.currentPageWorks;
                     $scope.itemsPerPage=$scope.itemsPerPageWorks;
                     $scope.total=$scope.totalWorks;
                 break;
                
                 case "Snapshots":
                     $scope.SnapshotsResults = datos;
                     $scope.SnapshotsResults.shift(); 
                     $scope.sortKey = "ID_SNAPSHOT";   
                     $scope.currentPageSnap=1;
                     $scope.itemsPerPageSnap=10;
                     $scope.totalSnap=$scope.SnapshotsResults.length;
                     $scope.currentPage=sessionStorage.currentPageSnapshots;
                     $scope.itemsPerPage=$scope.itemsPerPageSnap;
                     $scope.total=$scope.totalSnap;                     
                 break;
                      
                 case "Querys":
                     $scope.QueryResults = datos;
                     $scope.QueryResults.shift(); 
                     $scope.sortKey = "ID_QUERY"; 
                     $scope.currentPageQuerys=1;
                     $scope.itemsPerPageQuerys=10;
                     $scope.totalQuerys=$scope.QueryResults.length;
                     $scope.currentPage=sessionStorage.currentPageQuerys;
                     $scope.itemsPerPage=$scope.itemsPerPageQuerys;
                     $scope.total=$scope.totalQuerys;
                 break;
                 
                 case "Query Details":
                     $scope.QueryResultsDetails = datos;
                     $scope.sortKey = "ID_QUERY"; 
                     $scope.currentPageQuerysDetails=1;
                     $scope.itemsPerPageQuerysDetails=10;
                     $scope.totalQuerysDetails=$scope.QueryResultsDetails.length;
                     $scope.currentPage=sessionStorage.currentPageQuerysDetails;
                     $scope.itemsPerPage=$scope.itemsPerPageQuerysDetails;
                     $scope.total=$scope.totalQuerysDetails;
                 break;
                 
                 case "Snapshots Details":
                     $scope.ExecutionResults = datos;
                     $scope.ExecutionResults.shift(); 
                     $scope.sortKey = "ID_SNAPSHOT";   
                     $scope.currentPageExecution=1;
                     $scope.itemsPerPageExecution=10;
                     $scope.totalExecution=$scope.ExecutionResults.length;
                     $scope.currentPage=sessionStorage.currentPageExecution;
                     $scope.itemsPerPage=$scope.itemsPerPageExecution;
                     $scope.total=$scope.totalExecution;    
                 break;
                 
                 case "Snapshots Parameters":
                     $scope.ParametersResults = datos;
                     $scope.ParametersResults.shift(); 
                     $scope.sortKey = "ID_SNAPSHOT";   
                     $scope.currentPageParameters=1;
                     $scope.itemsPerPageParameters=10;
                     $scope.totalParameters=$scope.ParametersResults.length;
                     $scope.currentPage=sessionStorage.currentPageParameters;
                     $scope.itemsPerPage=$scope.itemsPerPageParameters;
                     $scope.total=$scope.totalParameters;
                 break; 
                 
                 case "Snapshots Execution":
                     $scope.ExecutionResults = datos;
                     $scope.ExecutionResults.shift(); 
                     $scope.sortKey = "ID_SNAPSHOT";   
                     $scope.currentPageExecution=1;
                     $scope.itemsPerPageExecution=10;
                     $scope.totalExecution=$scope.ExecutionResults.length;
                     $scope.currentPage=sessionStorage.currentPageExecution;
                     $scope.itemsPerPage=$scope.itemsPerPageExecution;
                     $scope.total=$scope.totalExecution;    
                 break;
                 
                 case "Select First AWR":
                     
                     $scope.allAWR = datos;
                    
                     $scope.allAWR.shift(); 
                     $scope.$broadcast('allAWR', {allAWR: $scope.allAWR});
                    //  alert(JSON.stringify($scope.allAWR));
                     $scope.sortKey = "SNAP_ID"; 
                     $scope.currentPageAllAWR=1;
                     $scope.itemsPerPageAllAWR=10;
                     $scope.totalAllAWR=$scope.allAWR.length;
                     $scope.currentPage=sessionStorage.currentPageAllAWR;
                     $scope.itemsPerPage=$scope.itemsPerPageAllAWR;
                     $scope.total=$scope.totalAllAWR;
                 break;

                 case "Select Second AWR":
                     $scope.secondAWRlist = datos;
                    
                    // $scope.allAWR.shift(); 
                     //$scope.$broadcast('allAWR', {allAWR: $scope.allAWR});
                    //  alert(JSON.stringify($scope.allAWR));
                     $scope.sortKey = "SNAP_ID"; 
                     $scope.currentPageAllAWR=1;
                     $scope.itemsPerPageAllAWR=10;
                     $scope.totalAllAWR=$scope.allAWR.length;
                     $scope.currentPage=sessionStorage.currentPageAllAWR;
                     $scope.itemsPerPage=$scope.itemsPerPageAllAWR;
                     $scope.total=$scope.totalAllAWR;
                 break;
             
                 case "Select the source work":
                     $scope.allWorkGpsql = datos;
                     $scope.allWorkGpsql.shift(); 
                    //alert("work de origen");
                     $scope.sortKey = "SNAP_ID"; 
                     $scope.currentPageallWorkGpsql=1;
                     $scope.itemsPerPageallWorkGpsql=10;
                     $scope.totalallWorkGpsql=$scope.allWorkGpsql.length;
                     $scope.currentPage=sessionStorage.currentPageallWorkGpsql;
                     $scope.itemsPerPage=$scope.itemsPerPageallWorkGpsql;
                     $scope.total=$scope.totalallWorkGpsql;
                 break;
                 
                case "Select STS":
                     $scope.allSTS = datos;
                    
                     $scope.allSTS.shift(); 
                    
                     $scope.sortKey = "BDID"; 
                     $scope.currentPageAllSTS=1;
                     $scope.itemsPerPageAllSTS=10;
                     $scope.totalAllSTS=$scope.allSTS.length;
                     $scope.currentPage=sessionStorage.currentPageAllSTS;
                     $scope.itemsPerPage=$scope.itemsPerPageAllSTS;
                     $scope.total=$scope.totalAllSTS;
                 break;
                  
                 default:
                     $scope.currentPage=1;
                     $scope.itemsPerPage=10;
                     $scope.total=$scope.Results.length;
             }
                             
                        $scope.numvalues = [3,5,10,20,50];  
                        
                        $scope.maxRange = ($scope.currentPage * $scope.itemsPerPage);
                        $scope.minRange = ($scope.maxRange-$scope.itemsPerPage)+1;
                        if($scope.total < $scope.maxRange){
                                $scope.maxRange = $scope.total;
                        }
                            
                        $scope.refreshItemsPerPage = function(new_value){
                            $scope.itemsPerPage = new_value;
                           // $scope.currentPage = 1;
                        };
                             
                          $scope.setRange= function(currentPage){
                            $scope.currentPage = currentPage;
                                if($scope.page==="Home"){
                                    sessionStorage.currentPageHome=$scope.currentPage;
                                }else if($scope.page === "Works"){
                                    sessionStorage.currentPageWorks=$scope.currentPage;
                                }else if($scope.page==="Querys"){
                                    sessionStorage.currentPageQuerys=$scope.currentPage;
                                }else if($scope.page === "Query Details"){
                                    sessionStorage.currentPageQuerysDetails=$scope.currentPage;
                                }else if($scope.page==="Snapshots"){
                                    sessionStorage.currentPageSnapshots=$scope.currentPage;
                                }else if($scope.page === "Snapshots Parameters"){
                                    sessionStorage.currentPageParameters=$scope.currentPage;
                                }else if($scope.page === "Snapshots Execution"){
                                    sessionStorage.currentPageExecution=$scope.currentPage;
                                }else if($scope.page === "Select First AWR"){
                                    sessionStorage.currentPageAllAWR=$scope.currentPage;
                                }else if($scope.page === "Select the source work"){
                                    sessionStorage.currentPageworkGpsql=$scope.currentPage;
                                }
                            
                           // sessionStorage.currentPage = $scope.currentPage;
                            $scope.maxRange = ($scope.currentPage * $scope.itemsPerPage);
                            $scope.minRange = ($scope.maxRange-$scope.itemsPerPage)+1;
                            if($scope.total < $scope.maxRange){
                                $scope.maxRange = $scope.total;
                            }
                        };   
    }; 

    $scope.generateNewTable=function(datos,idxpage,cortado,$scope){
    //vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString()});
                       $scope.HaveResults = true;
                  //alert("llama a generateNewTable y la pagina es " + $scope.page + ",el idxpage vale " + idxpage + " y cortado vale " + cortado);
                        $scope.sort = function(keyname){
                            $scope.updown = false; 
                            $scope.sortKey = keyname;   //set the sortKey to the param passed
                            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
                            
                        };
                        
                        if(cortado === true){   
                             $scope.Results = datos;
                             $scope.Results.shift();
                             
                        }
                        else{
                             $scope.Results = datos;
                        }
                        $scope.total=$scope.Results.length;
                        $scope.tableData = tableService.getTable(idxpage);
                        $scope.sortKey = $scope.tableData[0].sortKey;
                        
                        if($scope.page === "Home"){
                            $scope.itemsPerPage = $scope.tableData[0].itemsPerPageHome;
                        } 
                        else if($scope.page === "Works"){
                            $scope.itemsPerPage = $scope.tableData[0].itemsPerPageWorks;
                        }
                        else if($scope.page === "Select the source work"){
                            $scope.itemsPerPage = $scope.tableData[0].itemsPerPageWorksGpsql;
                        }else if($scope.page === "Select a snapshot"){
                            $scope.itemsPerPage = $scope.tableData[0].itemsPerPageSnapshotsGpsql;
                        }else if($scope.page === "Select the destination work"){
                            $scope.itemsPerPage = $scope.tableData[0].itemsPerPageworkDestino;
                        }else if($scope.page === "snapshotDestino"){
                            $scope.itemsPerPage = $scope.tableData[0].itemsPerPageSnapshotDestino;
                        }else if($scope.page === "Snapshots Execution"){
                            //console.log('entra en snapshot execution en generate new table');
                            $scope.itemsPerPage = $scope.tableData[0].itemsPerPageExecution;
                            $scope.totalExecution = $scope.total;
                        }else if($scope.page === "Snapshots Parameters"){
                           // console.log('entra en Snapshots Parameters en generate new table');
                            $scope.itemsPerPage = $scope.tableData[0].itemsPerPageParameters;
                            $scope.totalParameters = $scope.total;
                        }
                        
//                                         case "Snapshots Details":
//                   //  console.log
//                     $scope.ExecutionResults = datos;
//                     $scope.ExecutionResults.shift(); 
//                     $scope.sortKey = "ID_SNAPSHOT";   
//                     $scope.currentPageExecution=1;
//                     $scope.itemsPerPageExecution=10;
//                     $scope.totalExecution=$scope.ExecutionResults.length;
//                     $scope.currentPage=sessionStorage.currentPageExecution;
//                     $scope.itemsPerPage=$scope.itemsPerPageExecution;
//                     $scope.total=$scope.totalExecution;    
//                 break;
                        else{
                            $scope.itemsPerPage = $scope.tableData[0].itemsPerPage;
                        }
                          validateCurrentPage = function(page){
                            //alert("llama a validatecurrentpage y la page es " + page);  
                                if(page===1){
                                    if(sessionStorage.currentPageSnapshots){
                                        return sessionStorage.currentPageSnapshots;
                                    }
                                    
                                }
                                else{
                                    return 1;
                                }
                          };
                         
                         $scope.currentPage = validateCurrentPage(idxpage);
                         
                       // $scope.itemsPerPage = 10;
                      //  $scope.HaveResults = true;

                
             //    case "Snapshots":
                    // $scope.SnapshotsResults = datos;
                    // $scope.SnapshotsResults.shift(); 
                   //  $scope.sortKey = "ID_SNAPSHOT";   
                    // $scope.currentPageSnap=1;
                    // $scope.itemsPerPageSnap=10;
                     //$scope.totalSnap=$scope.SnapshotsResults.length;
//                     $scope.currentPage=sessionStorage.currentPageSnapshots;
//                     $scope.itemsPerPage=$scope.itemsPerPageSnap;
//                     $scope.total=$scope.totalSnap;                     
          //       break;
                             
                        $scope.numvalues = [3,5,10,20,50];  
                        
                        $scope.maxRange = ($scope.currentPage * $scope.itemsPerPage);
                        $scope.minRange = ($scope.maxRange-$scope.itemsPerPage)+1;
                        if($scope.total < $scope.maxRange){
                                $scope.maxRange = $scope.total;
                        }
                            
                        $scope.refreshItemsPerPage = function(new_value){
                            $scope.itemsPerPage = new_value;
                           // $scope.currentPage = 1;
                        };
                             
                          $scope.setRange= function(currentPage){
                            $scope.currentPage = currentPage;
                                if($scope.page==="Home"){
                                    sessionStorage.currentPageHome=$scope.currentPage;
                                }else if($scope.page === "Works"){
                                    sessionStorage.currentPageWorks=$scope.currentPage;
                                }else if($scope.page==="Querys"){
                                    sessionStorage.currentPageQuerys=$scope.currentPage;
                                }else if($scope.page === "Query Details"){
                                    sessionStorage.currentPageQuerysDetails=$scope.currentPage;
                                }else if($scope.page==="Snapshots"){
                                    sessionStorage.currentPageSnapshots=$scope.currentPage;
                                }else if($scope.page === "Snapshots Parameters"){
                                    sessionStorage.currentPageParameters=$scope.currentPage;
                                }else if($scope.page === "Snapshots Execution"){
                                    console.log("estable el sessionstorage de snapashots execution");
                                    sessionStorage.currentPageExecution=$scope.currentPage;
                                }else if($scope.page === "Select First AWR"){
                                    sessionStorage.currentPageAllAWR=$scope.currentPage;
                                }
                                
                            
                           // sessionStorage.currentPage = $scope.currentPage;
                            $scope.maxRange = ($scope.currentPage * $scope.itemsPerPage);
                            $scope.minRange = ($scope.maxRange-$scope.itemsPerPage)+1;
                            if($scope.total < $scope.maxRange){
                                $scope.maxRange = $scope.total;
                            }
                        };   
    };     

      $scope.SeeDetails = function(SelectedWork) {
		  console.log("Llega a seedetails");
          console.log("llega a seedetails" + JSON.stringify(SelectedWork));
        //  alert("el idwork en seedetails vale " + JSON.stringify(SelectedWork[0].ID_WORK));
			console.log("SelectedWork: " + SelectedWork.WORK_NAME);
            if(Object.prototype.toString.call(SelectedWork) === "[object Object]"){
				console.log("es object");
                $scope.SelectedIdWork = SelectedWork.ID_WORK;
                $scope.SelectedWorkName = SelectedWork.WORK_NAME;
                $scope.SelectedWorkCreated = SelectedWork.CREATED;
            }
            if(Object.prototype.toString.call(SelectedWork) === "[object Array]"){
				console.log("es array");
                $scope.SelectedIdWork = SelectedWork[0].ID_WORK;
                $scope.SelectedWorkName = SelectedWork[0].WORK_NAME;
                $scope.SelectedWorkCreated = SelectedWork[0].CREATED;
            }
            if($scope.pages < $scope.currentPage){
                $scope.currentPage = $scope.pages;
                console.log($scope.currentPage);
             }
            sessionStorage.SelectedIdWork = $scope.SelectedIdWork;
            sessionStorage.SelectedWorkName = $scope.SelectedWorkName;
            sessionStorage.SelectedWorkCreated = $scope.SelectedWorkCreated;
            //sessionStorage.currentPage = 1;
            sessionStorage.currentPageHome=1;
            if($scope.page==="Works" || $scope.page==="Works Details"){
                //console.log("sessionStorage.currentPageWorks: reseteando");
           //    vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString()});
				console.log("Entre currentpage 1");
                sessionStorage.currentPageWorks=1;
            }
    //        else{
    //            console.log("la pagina es works o works details en seedetails");
    //           // sessionStorage.currentPageWorks = sessionStorage.currentPageWorks;
    //        }
            sessionStorage.currentPageSnapshots=1;
            sessionStorage.currentPageQuerys=1;
            sessionStorage.currentPageQuerysDetails=1;
            sessionStorage.currentPageParameters=1;
            sessionStorage.currentPageExecution=1;
            sessionStorage.currentPageAllAWR=1;
            sessionStorage.currentPageAllSTS=1;
        
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
        
        // $scope.logado = sessionStorage.logado;
         
           
        if(sessionStorage.logado)
        {
            //console.log("entra en el interval de sessionstorage logado");
         //   $scope.changeClass();
            $scope.logado=true;
            $scope.user = sessionStorage.user;
            $scope.no_logado = false;
            $scope.url=$location.url();
        }

      },100);
   
    //LOGIN             
$scope.login = function(){
    
   var userVal = document.getElementById('user').value;
    var passwordVal = document.getElementById('passwordLogin').value;
   // var repoVal = document.getElementById('selectedRepo').value;
       
    if (vacio(userVal) === false) {
        $scope.errorLogin = "Please, fill the user";
    }
    else if (vacio(passwordVal) === false) {
        $scope.errorLogin = "Please, fill the password";
    }
    else{
        document.getElementById('navMenu').style.display = 'block';
        $scope.pagew.pagewrapper = true;
        $scope.infoLogin="Connecting with server...";
        $scope.errorLogin = "";
        $scope.logado=true;
        sessionStorage.logado = $scope.logado;
        sessionStorage.user = userVal;
        //sessionStorage.repo = repoVal;
        sessionStorage.idSesion = uniqueID();
        $scope.user = sessionStorage.user;
        $scope.repositorio = sessionStorage.repoName;
        $scope.idSesion = sessionStorage.idSesion;
        $scope.infoLogin="";
    //    $state.go("Home",{});
       
       // vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  actionData.setIdCon().toString()});
    }
    console.log("logado: "+$scope.logado);
    //$scope.changeClass();
};

                       
$scope.t = function(){
    $scope.logado=false;
    $scope.connectionOK = false;
   $state.go("Login",{});
   // $scope.changeClass();
};


/*
    vertxEventBusService.on('repository_results', function(messageRepository) {
                            console.log("entra en repository_results y el mensaje es " + messageRepository);
                        if(Object.prototype.toString.call(messageRepository) === "[object Array]"){  
                            $scope.comprobacionError=messageRepository[0].VERTX_ERROR;
                          if(messageRepository[0].ACTION==="select_all"){  
                              console.log("el mensaje es select_all");
                               $scope.repos=messageRepository;
                               $scope.repos.shift(); 
                               
                               $scope.selectedRepo = JSON.search($scope.repos,'//*[DEFAULT_REPO="yes"]')[0];
                               
                              //  sessionStorage.repo = $scope.selectedRepo;
                                sessionStorage.repoName = $scope.selectedRepo.CONNECTION_NAME;
                               
                                $('#selectedRepo option:contains(' + $scope.selectedRepo.CONNECTION_NAME + ')').prop({selected: true});          
                                
                                vertxEventBusService.send('repository_actions', {VERTX_ACTION:"select_repo_data",REPO_NAME:$scope.selectedRepo.CONNECTION_NAME });
                                   
                             //  $scope.cambiaRepo(null);                                     
                           }
                           if(messageRepository[0].ACTION==="select_repo_data"){
                                console.log("el mensaje es select_repo_data");
                              $scope.datosRepo=messageRepository[1];
                              $scope.SERVICE = $scope.datosRepo.ORACLE_SERVICE_SID;
                              console.log("llama a select_repo_data y $scope.datosRepo vale " + JSON.stringify($scope.datosRepo));
                             

                           }
                             //var json = JSON.parse($scope.repos);
                                 
                }
            });
                            
           */                    
                               
                              //  var defecto = JSON.search( $scope.repos, '//*[DEFAULT_REPO="yes"]' );
                              //  console.log('defecto vale ', defecto);
//ACABA EL CONTROLADOR DE ANGULAR
});
