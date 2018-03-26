angular.module('app').controller("RepoCtrl", function ($scope,$state,vertxEventBusService,ngDialog,$timeout) {
    console.log("enta en RepoCtrl");
    
   // $scope.cargaRepo = function(){
    //    console.log("llama a cargaRepo en RepoController y $scope.selectedRepo vale " + $scope.selectedRepo);
  /*      if($scope.repos === undefined){
            vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'select_all'});
        }*/
    //};
    
   
    
    // REPOSITORY RESULTS

    $scope.svSidOpts = [{value:"SERVICE"}, {value:"SID"}];
    $scope.tables = true;
    $scope.sendPassword = false;
                    $scope.$on('error', function(ev, args) {
                         $scope.Progress = false;
                            $scope.tables = true;
                         console.log("el error en repocontroller es " + args.error);
                         $scope.Error = args.error;
                         console.log("$scope.Error: " + $scope.Error);
                         //$scope.notTable=false;
                         if($scope.Error === "Repository deleted succesfully"){
                             console.log("entra en el if del error");
                               vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'select_all'});
                                 $scope.sendPassword = false;
                                 $scope.passOk = false;
                            //   $state.go("Login");
                               
                         }else if(args.error === "Repository added succesfully"){
                             //console.log("entra en el if del error");
                               $scope.sendPassword = false;
                               $scope.passOk = false;
                               vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'select_all'});
                             //  $state.go("Login");
                               
                         }
//                         else if(args.error === "Repository modified succesfully"){
//                             //console.log("entra en el if del error");
//                               $scope.sendPassword = false;
//                               $scope.passOk = false;
//                               console.log("se ha modificado correctamente");
//                               vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'select_all'});
//                            //   $state.go("Login");
//                               
//                         }
//                         else if(args.error === "Valid password"){
//                          //   console.log("entra en el if del error de valid password");
//                               if($scope.origen==='edit'){
//                                    //$scope.cargarDBtype();
//                                    vertxEventBusService.send('repository_actions', {VERTX_ACTION:"select_repodb"});
//                                }else if($scope.origen==='remove'){
//                                    $scope.seePopup('DeleteRepo','');
//                                }else if($scope.origen==='add'){
//                                    alert("el origen es add");
//                                    $scope.nuevoRepo();
//                                }
//                               $scope.sendPassword = false;
//                               $scope.passOk = false;
//                           }
                     });
    
    
    
//             //FUCION CAMBIAREPO
//                        $scope.cambiaRepo = function (selectedRepo){
//                                 console.log("selectedrepo vale en cambiarepo " + JSON.stringify(selectedRepo));
//                                  $scope.selectedRepo = null;
//                                            $('#selectedRepo option').prop({selected: false});
//                                       $.each($scope.repos, function(key,value) {
//
//                                            if(selectedRepo ===null){
//                                                //SELECTEDREPO ESTA VACIO
//                                                if($scope.repos[key].DEFAULT_REPO === 'yes'){
//                                                $scope.selectedRepo = $scope.repos[key];
//                                                $scope.selectedRepoName = $scope.repos[key].CONNECTION_NAME;
//                                                sessionStorage.repo = $scope.selectedRepo;
//                                                sessionStorage.repoName = $scope.selectedRepoName;
//                                               /* $scope.user = document.getElementById('user');
//                                                $scope.user.value = 'user';*/
//                                                 $('#selectedRepo option:contains(' + $scope.repos[key].CONNECTION_NAME + ')').prop({selected: true});
//                                                }
//                                                
//                                            }
//                                            else if(selectedRepo !==null){
//                                                
//                                                 //SELECTEDREPO NO ESTA VACIO
//                                                 $scope.repos[key].DEFAULT_REPO = "yes";
//                                                if($scope.repos[key].CONNECTION_NAME === selectedRepo.CONNECTION_NAME){
//                                                   
//                                                    $('#selectedRepo option:contains(' + $scope.repos[key].CONNECTION_NAME + ')').prop({selected: true});
//                                                   
//                                                    $scope.selectedRepo = $scope.repos[key];
//                                                    $scope.selectedRepoName = $scope.repos[key].CONNECTION_NAME;
//                                                    sessionStorage.repo = $scope.selectedRepo;
//                                                    sessionStorage.repoName = $scope.selectedRepoName;
//                                                    vertxEventBusService.send('repository_actions', {VERTX_ACTION:"select_repo_data",REPO_NAME:$scope.selectedRepoName });
//                                                }
//                                            }
//                                            
//                                            
//                                       });
//                                      // alert("al final del each selectedrepo vale " + JSON.stringify($scope.selectedRepo)); 
//                            };
    
                        vertxEventBusService.on('repository_results', function(messageRepository) {

                        if(Object.prototype.toString.call(messageRepository) === "[object Array]"){  
                            $scope.comprobacionError=messageRepository[0].VERTX_ERROR;
                            
//                          if(messageRepository[0].ACTION==="select_all"){             
//                               $scope.repos=messageRepository;
//                               $scope.repos.shift(); 
//                               console.log('repos vale ',JSON.stringify($scope.repos));
//                               console.log('reposlength vale ',$scope.repos.length);
//                               for(var i=0; i<$scope.repos.length;i++){
//                                   console.log('entra en el for de repos');
//                                    if($scope.repos[i].DEFAULT_REPO==='yes'){
//                                   //     $scope.datosRepo = $scope.repos[i];
//                                        //console.log($scope.datosRepo.USER_NAME);
//                                          $scope.selectedRepo = $scope.repos[i];
//                                                $scope.selectedRepoName = $scope.repos[i].CONNECTION_NAME;
//                                                sessionStorage.repo = $scope.selectedRepo;
//                                                sessionStorage.repoName = $scope.selectedRepoName;
//                                               // $scope.user = document.getElementById('user');
//                                               // $scope.user.value = 'user'; --fin de comentario
//                                                 $('#selectedRepo option:contains(' + $scope.repos[i].CONNECTION_NAME + ')').prop({selected: true});
//                                        console.log('tiene el repositorio por defecto y llama a select_repo_data');
//                                      //  vertxEventBusService.send('repository_actions', {VERTX_ACTION:"select_repo_data",REPO_NAME:$scope.repos[i].CONNECTION_NAME });
//                                    }
//                               }
//                                        
//                             //  $scope.cambiaRepo(null);                                     
//                           }else  
                               if(messageRepository[0].ACTION==="delete_repo"){
                               setError(messageRepository[0].VERTX_ERROR,messageRepository[0].VERTX_MESSAGE,$scope,ngDialog,$timeout);
 
                           }else if(messageRepository[0].ACTION==="select_repo_data"){
                              $scope.datosRepo=messageRepository[1];
                              $scope.SERVICE = $scope.datosRepo.ORACLE_SERVICE_SID;
                              console.log("llama a select_repo_data y $scope.datosRepo vale " + JSON.stringify($scope.datosRepo));
                             

                           }else if(messageRepository[0].ACTION==="modify_repo" || messageRepository[0].ACTION==="create_repo_tables" || messageRepository[0].ACTION==="test_conn" || messageRepository[0].ACTION==="add_repo"){
                                
                              //  alert("entra en modify_repo y messageRepository vale " + JSON.stringify(messageRepository));
                                    
                                //    setError(messageRepository[0].VERTX_ERROR,messageRepository[0].VERTX_MESSAGE,$scope,ngDialog,$timeout);
                               // $scope.$broadcast('error', {error: messageRepository[0].VERTX_MESSAGE});
                                 $scope.Progress = false;
                                    $scope.tables = true;
                             //    console.log("el error en repocontroller es " + args.error);
                                 $scope.Error = messageRepository[0].VERTX_MESSAGE;
                                 
                                 
                                 if(messageRepository[0].ACTION==="test_conn"){
                                     console.log("entra en test_conn y messageRepository vale " + JSON.stringify(messageRepository));
                                     if(messageRepository[0].VERTX_MESSAGE ==="Repository tested succesfully" && $scope.origen==='edit'){
                                         console.log("repositorio OK");
                                         $scope.EditRepo();
                                     }
                                 }
                                 
                                 if(messageRepository[0].ACTION==="modify_repo"){
                                     console.log("entra en modify_repo y messageRepository vale " + JSON.stringify(messageRepository));
                                 }
                                 
                                if(messageRepository[0].VERTX_MESSAGE === "Repository modified succesfully"){
                                        //console.log("entra en el if del error");
                                          $scope.sendPassword = false;
                                          $scope.passOk = false;
                                          console.log("se ha modificado correctamente");
                                          vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'select_all'});
                                       //   $state.go("Login");

                                    }
                                
//                               if(document.getElementById("DB_TYPE").value===""){
//                                    $scope.Error="Select a type of database";
//                                    $scope.message="Select a type of database";
//                                 //   setError($scope.error,$scope.message,$scope,ngDialog,$timeout);
//                                 $scope.$broadcast('error', {error: $scope.message});
//                                }
                                
                                
                                
                             }else if(messageRepository[0].ACTION==="verify_repo_pass" && messageRepository[0].VERTX_ERROR==="NO" && messageRepository[0].VERTX_MESSAGE === "Valid password"){

                               //     $scope.$broadcast('error', {error: messageRepository[0].VERTX_MESSAGE});
                                    $scope.errorPass=false;
                                    $scope.Error="";
                                    $scope.passOk = true;                     
                          //   console.log("entra en el if del error de valid password");
                               if($scope.origen==='edit'){
                                    //$scope.cargarDBtype();
                                    console.log("entra en el if del edit");
                                    vertxEventBusService.send('repository_actions', {VERTX_ACTION:"select_repodb"});
                                }else if($scope.origen==='remove'){
                                    $scope.seePopup('DeleteRepo','');
                                }else if($scope.origen==='add'){
                                    alert("el origen es add");
                                    $scope.nuevoRepo();
                                }
                          //     $scope.sendPassword = false;
//                               $scope.passOk = false;
                           

//                                    if($scope.origen==='edit'){
//                                        $scope.cargarDBtype();
//                                    }
                                   //  $scope.$broadcast('errorPass', {errorPass: $scope.errorPass});
                                 //   alert("$scope.errorPass en verify_repo_pass "+$scope.errorPass);
                                   // sessionStorage.errorPass=$scope.errorPass;
//                                   if(sessionStorage.errorPass){
//                                       sessionStorage.removeItem('errorPass');
//                                   } --fin de comentario
                                   
                                     console.log("----------CLAVE CORRECTA---------"+$scope.errorPass);
                               // }
                            }
                       }
                       
                       if(Object.prototype.toString.call(messageRepository) === "[object Object]"){
                            alert("entra aqui y messageRepository vale " + JSON.stringify(messageRepository));
                           $scope.comprobacionError=messageRepository.VERTX_ERROR;
//                            if(messageRepository.ACTION==="modify_repo"){ 
//                               
//                               // setError(messageRepository.VERTX_ERROR,messageRepository.VERTX_MESSAGE,$scope,ngDialog,$timeout);
//                               $scope.$broadcast('error', {error: messageRepository[0].VERTX_MESSAGE});
//                               
//                                if(document.getElementById("DB_TYPE").value===""){
//                                    $scope.error="Select a type of database";
//                                    $scope.message="Select a type of database";
//                                    setError($scope.error,$scope.message,$scope,ngDialog,$timeout);
//                                }
//                                
//                            }
                             if(messageRepository.ACTION==="create_repo_tables"){
                               // setError(messageRepository.VERTX_ERROR,messageRepository.VERTX_MESSAGE,$scope,ngDialog,$timeout);
                               $scope.$broadcast('error', {error: messageRepository[0].VERTX_MESSAGE});
                               
                                if(document.getElementById("DB_TYPE").value===""){
                                    $scope.error="Select a type of database";
                                    $scope.message="Select a type of database";
                                    setError($scope.error,$scope.message,$scope,ngDialog,$timeout);
                                }
                                
                                if(messageRepository.VERTX_ERROR==="NO"){
                                    $scope.createRepo=true;
                                }else{
                                    $scope.createRepo=false;
                                }
                            }else if(messageRepository.ACTION==="test_conn"){
                               // setError(messageRepository.VERTX_ERROR,messageRepository.VERTX_MESSAGE,$scope,ngDialog,$timeout);
                            //    $scope.$broadcast('error', {error: messageRepository[0].VERTX_MESSAGE});
                               alert("entra en testConn y messageRepository vale " + JSON.stringify(messageRepository));
                               
//                                if(document.getElementById("DB_TYPE").value===""){
//                                    $scope.error="Select a type of database";
//                                    $scope.message="Select a type of database";
//                                 //   setError($scope.error,$scope.message,$scope,ngDialog,$timeout);
//                                }
                                
                                if(messageRepository.VERTX_ERROR==="NO"){
                                    console.log("no hay error en test_conn");
                                       $scope.EditRepo();
                                    //$scope.test=true;
                                }else{
                                    //$scope.test=false;
                                    console.log("SI hay error en test_conn: " + messageRepository.VERTX_ERROR);
                                        $scope.Progress=false;
                                        $scope.Error = true;
                                        $scope.Error = messageRepository.VERTX_ERROR;
                                        
                                }
                                
                            }else if(messageRepository.ACTION==="add_repo"){
                                setError(messageRepository.VERTX_ERROR,messageRepository.VERTX_MESSAGE,$scope,ngDialog,$timeout);
                               
                                if(document.getElementById("DB_TYPE").value===""){
                                    $scope.error="Select a type of database";
                                    $scope.message="Select a type of database";
                                 //   setError($scope.error,$scope.message,$scope,ngDialog,$timeout);
                                }
                            }else if(messageRepository.ACTION==="verify_repo_pass" && messageRepository.VERTX_ERROR==="Wrong password"){
                                //$scope.errorPass;
                                
                               // if(messageRepository.VERTX_ERROR==="Wrong password"){
                               //     setError(messageRepository.VERTX_ERROR,messageRepository.VERTX_MESSAGE,$scope,ngDialog,$timeout);
                                //     $scope.$broadcast('error', {error: messageRepository.VERTX_ERROR});
                                     $scope.progress = false;
                                     $scope.Error = messageRepository.VERTX_ERROR;
                                     $scope.errorPass=true;
                                     //sessionStorage.errorPass=true;
                                  //    $scope.$broadcast('errorPass', {errorPass: $scope.errorPass});
                                     
                                     console.log("----------errror en password---------"+$scope.errorPass);
                               // }
                            }
                            
                            
                        }

                           
                           if(Object.prototype.toString.call(messageRepository) === "[object Array]"){
                                console.log("messageRepository vale ",messageRepository);
                                //                                   messageRepository.shift();
                               //    $scope.jsonPartners=[];
//                                 
//                                // $scope.jsonPartners = [{"DB_TYPE":"Oracle"},{"DB_TYPE":"SQL Server"}];
//                               //  $scope.names = ["Emil", "Tobias", "Linus"];
////                                   
//                                     for(var i=0; i<messageRepository.length; i++){
//                                         $scope.jsonPartners.push(messageRepository[i].DB_TYPE);             
//                                         //$scope.dbType = messageRepository[i].DB_TYPE;
//                                    }    
                                if(messageRepository[0].ACTION==="select_repodb"){
                                    console.log("messageRepository vale en select_repodb",messageRepository);
                                    
                                    messageRepository.shift();
                                    
//                                    var sel = document.getElementById('tipo');
//                                    if(sel){
//                                        for(var i = 0; i < messageRepository[i].length; i++) {
//                                        var opt = document.createElement('option');
//                                        opt.innerHTML = messageRepository[i].DB_TYPE;
//                                        opt.value = messageRepository[i].DB_TYPE;
//                                        sel.appendChild(opt);
//                                    }
//                                    }
                                    
                                    
//                                  //var selectBox = document.getElementById('tipo');
//                                   if($("#tipo")){
//                                       console.log('tipo existe');
////                                        var option = '';
////
////                                        for (var i = 0; i < messageRepository.length; i++) {
////                                            console.log('entra en el for');
////                                          selectBox.append('<option value="' + messageRepository[i].DB_TYPE+ '">' + messageRepository[i].DB_TYPE + '</option>');
////                                           console.log('options vale: '+ '<option value="' + messageRepository[i].DB_TYPE+ '">' + messageRepository[i].DB_TYPE + '</option>');
////                                        }
//                                 
//                                   }
                                   // if($("#DB_TYPE")){
                                   setTimeout(function(){
                                   var selectBox = $("#DB_TYPE");
                                        for (var i = 0; i < messageRepository.length; i++) {
                                            console.log('entra en el for');
                                          selectBox.append('<option value="' + messageRepository[i].DB_TYPE+ '">' + messageRepository[i].DB_TYPE + '</option>');
                                           console.log('options vale: '+ '<option value="' + messageRepository[i].DB_TYPE+ '">' + messageRepository[i].DB_TYPE + '</option>');
                                        }
                                   // }
                                        
//                                             var selectBox = $("#tipo");
//                                        for (var prop in messageRepository) {
//                                            var option = document.createElement('option');
//                                            option.innerHTML = messageRepository[prop].DB_TYPE;
//                                            option.value = messageRepository[prop].DB_TYPE;
//                                            selectBox.append(option);
//                                        }
                                      //  $("#tipo").html(options);
//                                    for(var i = 0, l = messageRepository.length; i < l; i++){
//                                      var option = messageRepository[i].DB_TYPE;
//                                      console.log('option vale',option);
//                                        //selectBox.options.add( new Option(option.text, option.value, option.selected) );
//                                    }
                                    //$select = $('#tipo');
                                    
                                    // Get an object from a valid JSON string
//                                        var obj = JSON.parse(messageRepository);
//                                        console.log('obj vale',obj);
                                        // Loop through this object
//                                        for(var o in obj) {
//                                           console.log('o vale ' + obj);
//                                        }
//                                    $.each(messageRepository[i],function(key, value) 
//                                    {
//                                        console.log('la key es ' + key + 'y el value es ' + value);
//                                        //$select.append('<option value=' + key + '>' + value + '</option>');
//                                    });
                                    
                                //    $scope.jsonPartners=messageRepository;
//                                    
                                //    $scope.partner = $scope.jsonPartners[0];
//                                    $scope.place = $scope.partner;

//                                    $scope.onChange = function(partner){       
//                                        $scope.place = partner.partner_location[0];
//                                    }
                                    
//                                    for(var i=0; i<$scope.repos.length;i++){
//                                        if($scope.repos[i].DEFAULT_REPO==='yes'){
//                                            $scope.datosRepo = $scope.repos[i];
//                                            console.log($scope.datosRepo.USER_NAME);
//                                        }
//                                    }    
                                    
//                                    for(var i=0; i<$scope.jsonPartners.length; i++){
//                                         console.log('dbtype: ' + $scope.jsonPartners[i].DB_TYPE); //$scope.dbType.push(messageRepository[i]);
//                                         $scope.jsonPartners.push(messageRepository[i]);
//                                         
//                                    }   
                                    
                                     //   setTimeout(function(){
//                                            $("#DB_TYPE option").each(function(){
//                                                //alert('opcion '+$(this).text()+' valor '+ $(this).attr('value'));
//                                                if($(this).attr('value')=== $scope.datosRepo.DB_TYPE){
//                                                    console.log("seleccionado dbtype:" + $(this).attr('value'));
//                                                    $(this).prop("selected", true);
//                                                    
//                                                }
//                                             });    
//                                          //  console.log("se ha seleccionado como tipo de base de datos: " + $("#DB_TYPE option:selected").attr('value'));                 
//                                          if($("#DB_TYPE option:selected").attr('value') === "Oracle"){
//                                              console.log("entra en el if de oracle y $scope.datosRepo.ORACLE_SERVICE_SID vale " + $scope.datosRepo.ORACLE_SERVICE_SID);
//                                              //$("#SERVICE option:selected").attr('value') === $scope.datosRepo.ORACLE_SERVICE_SID;
//                                              $("#ORACLE_SERVICE_SID option").each(function(){
//                                                alert('opcion '+$(this).text()+' valor '+ $(this).attr('value'));
//                                                if($(this).attr('value')=== $scope.datosRepo.ORACLE_SERVICE_SID){
//                                                    console.log("seleccionado service/SID:" + $(this).attr('value'));
//                                                    $(this).prop("selected", true);
//                                                    
//                                                }
//                                             });
//                                          }
                                        }, 50);

                                  //  $scope.DB_TYPE = $scope.datosRepo.DB_TYPE;

//                                    $scope.names = ["Emil", "Tobias", "Linus"];
//                                    console.log('$scope.names vale ', $scope.names);

                               }
                     
                              // $scope.names = ["Emil", "Tobias", "Linus"];
                                    
                           }  
                        });
                        
    //$scope.repos = [];
    
      
    $scope.cancel = function(){
        console.log("llama a cancel");
        $scope.sendPassword = false;
        $scope.passOk = false;
        $scope.errorPass = true;
        $scope.Error="";
    };
    
     $scope.checkPass=function(){

        vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'verify_repo_pass', "REPO_PASS":$scope.repoPass});
        console.log({VERTX_ACTION: 'verify_repo_pass', "REPO_PASS":$scope.repoPass});
        $scope.sendPassword = true;
     };
     
//     $scope.cambioRepo=function(){
//            vertxEventBusService.send('repository_actions', {VERTX_ACTION:"select_repo_data",REPO_NAME:$scope.selectedRepoName });
//            console.log({VERTX_ACTION:"select_repo_data",REPO_NAME:$scope.selectedRepoName});
//     };
//      
     
     $scope.valorOracle=function(){
        // valorOra
         console.log("llama a valorOracle en repocontroller y DB_TYPE vale " + document.getElementById("DB_TYPE").value);
//         console.log("llama a valorOracle en repocontroller y DB_TYPE vale " + document.getElementById("DB_TYPE").value);
        if(document.getElementById("DB_TYPE").value==="Oracle"){
            $scope.oracle=true;
        }else if(document.getElementById("DB_TYPE").value===""){
            $scope.oracle=false;
        }else{
            $scope.oracle=false;
        }

     };
       if($scope.DEFAULT_REPO===true){
                $scope.DEFAULT="yes";
        }else{
                $scope.DEFAULT="no";
        }     
        
      $scope.cargarDBtype=function(){
          vertxEventBusService.send('repository_actions', {VERTX_ACTION:"select_repodb"}); 
      };
      
      $scope.TestConnModify = function(){
       $scope.Error ="";
       $scope.Progress = true;
      //  vertxEventBusService.send('repository_actions', {VERTX_ACTION:"test_conn",DB_TYPE:document.getElementById("DB_TYPE").value,HOST_NAME:document.getElementById("HOST_NAME").value,PORT:document.getElementById("PORT").value,DB_NAME:document.getElementById("DB_NAME").value,USER_NAME:document.getElementById("USER_NAME").value,PASSWD:document.getElementById("PASSWD").value,ORACLE_SERVICE_SID:document.getElementById("ORACLE_SERVICE_SID").value,DEFAULT_REPO:$scope.DEFAULT}); 
        vertxEventBusService.send('repository_actions', {VERTX_ACTION:"test_conn",DB_TYPE:document.getElementById("DB_TYPE").value,HOST_NAME:document.getElementById("HOST_NAME").value,PORT:document.getElementById("PORT").value,DB_NAME:document.getElementById("DB_NAME").value,USER_NAME:document.getElementById("USER_NAME").value,PASSWD:document.getElementById("PASSWD").value,ORACLE_SERVICE_SID:$scope.oracleService,DEFAULT_REPO:$scope.DEFAULT}); 


       
      //   $scope.EditRepo();
        
      };
       
      $scope.EditRepo = function(){
        $scope.Error="";     
        $scope.Progress = true; 
        if($scope.DEFAULT_REPO===true){
                $scope.DEFAULT="yes";
        }else{
                $scope.DEFAULT="no";
        }
         // console.log("ORACLE_SERVICE_SID vale en editrepo:" + document.getElementById("ORACLE_SERVICE_SID").value);
          console.log({VERTX_ACTION:"modify_repo",
          CONNECTION_NAME_ORI:$scope.selectedRepoName,
          CONNECTION_NAME:document.getElementById("CONNECTION_NAME").value,
          DB_TYPE:document.getElementById("DB_TYPE").value,
          HOST_NAME:document.getElementById("HOST_NAME").value,
          PORT:document.getElementById("PORT").value,
          DB_NAME:document.getElementById("DB_NAME").value,
          USER_NAME:document.getElementById("USER_NAME").value,
          PASSWD:document.getElementById("PASSWD").value,
          ORACLE_SERVICE_SID:document.getElementById("ORACLE_SERVICE_SID").value,
          DEFAULT_REPO:$scope.DEFAULT}); 
          
                                if(document.getElementById("DB_TYPE").value==="?"){
                                    console.log("falta el db type");
                                    $scope.Progress = false;
                                    $scope.Error="Select a type of database";
                                    //$scope.message="Select a type of database";
                                 //   setError($scope.error,$scope.message,$scope,ngDialog,$timeout);
                                //   $scope.$broadcast('error', {error: $scope.message});
                                }
                                
                                else if(document.getElementById("ORACLE_SERVICE_SID").value==="?"){
                                    console.log("falta el service sid");
                                    $scope.Progress = false;
                                    $scope.Error="Select if is a SERVICE or SID";
                                  //  $scope.message="Select a type of database";
                                 //   setError($scope.error,$scope.message,$scope,ngDialog,$timeout);
                                //   $scope.$broadcast('error', {error: $scope.message});
                                }
                                else{
                                    vertxEventBusService.send('repository_actions', {VERTX_ACTION:"modify_repo",CONNECTION_NAME_ORI:$scope.selectedRepoName,CONNECTION_NAME:document.getElementById("CONNECTION_NAME").value,DB_TYPE:document.getElementById("DB_TYPE").value,HOST_NAME:document.getElementById("HOST_NAME").value,PORT:document.getElementById("PORT").value,DB_NAME:document.getElementById("DB_NAME").value,USER_NAME:document.getElementById("USER_NAME").value,PASSWD:document.getElementById("PASSWD").value,ORACLE_SERVICE_SID:document.getElementById("ORACLE_SERVICE_SID").value,DEFAULT_REPO:$scope.DEFAULT}); 
                                }
          
                    
      };  
      
//      $scope.InfoRepo = function(){
//          alert("llama a inforepo y el repositorio es " + $scope.selectedRepoName);
//           console.log("repoName:"+$scope.selectedRepoName);
//
//           vertxEventBusService.send('repository_actions', {VERTX_ACTION:"select_repo_data",REPO_NAME:$scope.selectedRepoName});
//           console.log('repository_actions', {VERTX_ACTION:"select_repo_data", REPO_NAME:$scope.selectedRepoName});
//           $scope.seePopup('InfoRepo','');
//      }; 
      
    $scope.nuevoRepo=function(){ 
       vertxEventBusService.send('repository_actions', {VERTX_ACTION:"select_repodb"}); 
       $scope.seePopup('NewRepo',''); 
       console.log("funcion nuevo repositororio");
       console.log("DB_TYPE: "+JSON.stringify($scope.DB_TYPE));
       //console.log("DB_TYPE: "+$scope.DB_TYPE.DB_TYPE);
    }; 
      $scope.TestConn = function(){

        vertxEventBusService.send('repository_actions', {VERTX_ACTION:"test_conn",DB_TYPE:document.getElementById("DB_TYPE").value,HOST_NAME:$scope.HOST_NAME,PORT:$scope.PORT,DB_NAME:$scope.DB_NAME,USER_NAME:$scope.USER_NAME,PASSWD:$scope.PASSWD,ORACLE_SERVICE_SID:$scope.oracleService,DEFAULT_REPO:$scope.DEFAULT}); 
       // console.log({VERTX_ACTION:"test_conn", CONNECTION_NAME:$scope.CONNECTION_NAME,DB_TYPE:document.getElementById("DB_TYPE").value,HOST_NAME:$scope.HOST_NAME,PORT:$scope.PORT,DB_NAME:$scope.DB_NAME,USER_NAME:$scope.USER_NAME,PASSWD:$scope.PASSWD,ORACLE_SERVICE_SID:$scope.Oracle,DEFAULT_REPO:$scope.DEFAULT});

        $scope.Error ="";
        $scope.Progress = true;

             $scope.CreateRepo();
        
    }; 
    $scope.CreateRepo = function(){
      
        if($scope.DEFAULT_REPO===true){
             $scope.DEFAULT="yes";
         }else{
            $scope.DEFAULT="no";
         }
         
       vertxEventBusService.send('repository_actions', {VERTX_ACTION:"create_repo_tables",DB_TYPE:document.getElementById("DB_TYPE").value,HOST_NAME:$scope.HOST_NAME,PORT:$scope.PORT,DB_NAME:$scope.DB_NAME,USER_NAME:$scope.USER_NAME,PASSWD:$scope.PASSWD,ORACLE_SERVICE_SID:$scope.oracleService,DEFAULT_REPO:$scope.DEFAULT}); 
       console.log({VERTX_ACTION:"create_repo_tables", CONNECTION_NAME:$scope.CONNECTION_NAME,DB_TYPE:document.getElementById("DB_TYPE").value,HOST_NAME:$scope.HOST_NAME,PORT:$scope.PORT,DB_NAME:$scope.DB_NAME,USER_NAME:$scope.USER_NAME,PASSWD:$scope.PASSWD,ORACLE_SERVICE_SID:$scope.oracleService,DEFAULT_REPO:$scope.DEFAULT});  
    //   console.log("$scope.busTest: "+$scope.busTest +" $scope.busAdd :"+$scope.busAdd);
       $scope.Error ="";
       $scope.Progress = true;
       
       //if($scope.createRepo===true){
          $scope.AddRepo();
       //}
    };
    
   
    
    $scope.CreateRepoNotTables = function(){
        
        if($scope.DEFAULT_REPO===true){
             $scope.DEFAULT="yes";
         }else{
            $scope.DEFAULT="no";
         }
         
       vertxEventBusService.send('repository_actions', {VERTX_ACTION:"create_repo_tables",DB_TYPE:document.getElementById("DB_TYPE").value,HOST_NAME:$scope.HOST_NAME,PORT:$scope.PORT,DB_NAME:$scope.DB_NAME,USER_NAME:$scope.USER_NAME,PASSWD:$scope.PASSWD,ORACLE_SERVICE_SID:$scope.oracleService,DEFAULT_REPO:$scope.DEFAULT}); 
       
       $scope.Error ="";
       $scope.Progress = true;

    };

    $scope.AddRepo = function(){
      
        vertxEventBusService.send('repository_actions', {VERTX_ACTION:"add_repo", CONNECTION_NAME:$scope.CONNECTION_NAME,DB_TYPE:document.getElementById("DB_TYPE").value,HOST_NAME:$scope.HOST_NAME,PORT:$scope.PORT,DB_NAME:$scope.DB_NAME,USER_NAME:$scope.USER_NAME,PASSWD:$scope.PASSWD,ORACLE_SERVICE_SID:$scope.oracleService,DEFAULT_REPO:$scope.DEFAULT}); 

        $scope.Error ="";
        $scope.Progress = true;

     }; 
     
    $scope.DeleteRepo = function(repo){
                   
                    $scope.Error ="";
                    $scope.Progress = true;

                    vertxEventBusService.send('repository_actions', {VERTX_ACTION:"delete_repo", CONNECTION_NAME: repo});

           }; 

});

angular.module('app').$inject = ['$scope'];