angular.module('app').controller("CaptureTraceCtrl", function($scope,vertxEventBusService,actionData,$stateParams,$state,$filter){
            console.log("entra en CaptureTraceCtrl");
                   if(sessionStorage.logado=== undefined)
                  {
                      $state.go("Login");
                  }
                  else{
                      
                             $('.flexdatalist').flexdatalist({
                                    minLength: 1
                               });  
                      
                      $scope.$on('allAWR', function(ev, args) {
                          //alert("entra aqui");
                         //$scope.Progress = false;
                        // console.log("el error en snapshotscontroller es " + args.error);
                         $scope.allAWR = args.allAWR;

                     });
                     $scope.setSecondAWRList = function(firstAWR){
                         console.log("firstAWR en setSecondAWRList vale " + firstAWR);
                         $scope.firstAWR = firstAWR;
                         $scope.secondAWRlist = $scope.allAWR.filter(function(el){
                            // console.log("el.SNAP_ID vale " + el.SNAP_ID);
                            if(el.SNAP_ID > firstAWR){
                             return el.SNAP_ID !== firstAWR; 
                            }
                         });
                     //    console.log($scope.secondAWRlist);
                     };
                     $scope.setSecondAWR = function(secondAWR){
                       $scope.secondAWR = secondAWR;  
                       $scope.generateGlobalQuery();
                     };
                     // $('.selectpicker').selectpicker();
                    //  if($scope.AWRFilters){
                         
               //       }
                      $scope.selectedFilters = [];
                      $scope.commnad_type = [];
                     //$scope.idSnapshotURL = decodeURIComponent($stateParams.idSnapshot);
                     $scope.refreshPage();
                     $scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);
                    $scope.databaseName = sessionStorage.databaseDbname;
                    

                   //$('.selectpicker').selectpicker();
                    $scope.showFilters = function(value){
                   /*     if(value===true){
                            vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"show_filters",DB_TYPE:"Oracle"}); 
                        
                        }
                        */
                      $scope.AWRFilters = value;  
                    };
               
                      vertxEventBusService.send('work_actions', {VERTX_ACTION: 'select_detailname', ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),WORK_NAME:$scope.SelectedWorkName});
                              
                             $scope.TestConnAWR = function(){
                                  $scope.SeeDetails($scope.SelectedWorkName);
                                 sessionStorage.databaseHostname = document.getElementById("HOST_NAME").value;
                                 sessionStorage.databasePort = document.getElementById("PORT").value;
                                 sessionStorage.databaseDbname = document.getElementById("DB_NAME").value;
                                 $scope.databaseName = sessionStorage.databaseDbname;
                                 sessionStorage.databaseUsername = document.getElementById("USER_NAME").value;
                                 sessionStorage.databasePassword = document.getElementById("PASSWD").value;
                                 sessionStorage.databaseService = document.getElementById("SERVICE").value;
                                 vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"test_oracle_conn",HOST_NAME:sessionStorage.databaseHostname,PORT:sessionStorage.databasePort,DB_NAME:sessionStorage.databaseDbname,USER_NAME:sessionStorage.databaseUsername,PASSWD:sessionStorage.databasePassword,ORACLE_SERVICE_SID:sessionStorage.databaseService}); 
                             };
                             
                             if(sessionStorage.connectionOK){
                                 console.log("está logado en la bbdd");
                                  $scope.refreshPage();
                                 $scope.connectionOK = true;
                                 $scope.databasename = sessionStorage.AWRdbname;
                                 vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"test_oracle_conn",HOST_NAME:sessionStorage.databaseHostname,PORT:sessionStorage.databasePort,DB_NAME:sessionStorage.databaseDbname,USER_NAME:sessionStorage.databaseUsername,PASSWD:sessionStorage.databasePassword,ORACLE_SERVICE_SID:sessionStorage.databaseService}); 
                                 
                             }
                             
                              $scope.setCommandType = function () {
                                        $scope.commandTypeSeleccionado = $filter('filter')($scope.commandTypeFilter.VALUES, {checked: true});
                                         $scope.commnad_type = [];
                                      for(i=0;i < $scope.commandTypeSeleccionado.length;i++){                           
                                          $scope.commnad_type.push($scope.commandTypeSeleccionado[i].VALUES);
                                      } 
                                      $scope.generateGlobalQuery();
                                };
                                
                                $scope.generateFilterQuery = function(filtro,operador,valor,tipo){
                                    console.log("llama a generateFilterQuery y el filtro es " + filtro + " , el operador es " + operador + " y el valor es " + valor);
                                      if(operador !== "LIKE"){
                                         $scope.filterQuery = filtro + " " + operador + " " + valor;
                                          if(tipo==="T"){
                                              $scope.filterQuery =  filtro + " " + operador + " '" + valor + "'";
                                          }
                                         //$scope.generateGlobalQuery();
                                     }
                                       if(operador === "LIKE" && tipo==="T"){
                                                $scope.filterQuery =  filtro + " " + operador + " '%" + valor + "%'";
                                                //$scope.generateGlobalQuery();
                                       }
                                       return $scope.filterQuery;
                                     
                                };
                             
                              $scope.setFilterValues = function (filtro,operador,valor,tipo){
                                  console.log("llama a setFilterValues y el filtro es " + filtro + ",el operador es "+ operador +"y el valor es " + valor);

                               //PARSING_SCHEMA_NAME
                                  if(filtro === "PARSING_SCHEMA_NAME"){
                                      
                                      if((operador === undefined || valor === undefined || valor ==="" || valor ==="%%")){
                                          //SI EL OPERADOR O EL VALOR NO ESTÁN DEFINIDOS
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.selectedParsingSchemaQuery = undefined;
                                          $scope.generateGlobalQuery();
                                      }
                                      else{
                                          //SI EL OPERADOR Y EL VALOR ESTÁN DEFINIDOS
                                                console.log("esta todo ok");
                                            if(tipo==="N"){
                                              if(isInt(valor)=== true){
                                                  //SI ES UN NUMERO
                                                  $scope.errorParsingSchemaName = false;
                                                  $scope.selectedParsingSchemaQuery = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                                  $scope.generateGlobalQuery();
                                                 //alert("es un numero");
                                              }
                                              else{
                                                  //SI NO ES UN NUMERO Y DEBERIA SERLO
                                                 $scope.errorParsingSchemaName = true;
                                                   $scope.selectedParsingSchemaQuery = undefined;
                                                   document.getElementById("PARSING_SCHEMA_NAMEvalue").value = "";
                                                   $scope.generateGlobalQuery();
                                              }
                                          }
                                          if(tipo==="T"){
                                              //SI ES UN TEXTO
                                              $scope.errorParsingSchemaName = false;
                                              $scope.selectedParsingSchemaQuery = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                              $scope.generateGlobalQuery();
                                          }
                                      }
                                  } 
                                //SQL_TEXT
                                  if(filtro === "SQL_TEXT"){
                                      
                                      if((operador === undefined || valor === undefined || valor ==="" || valor ==="%%")){
                                          //SI EL OPERADOR O EL VALOR NO ESTÁN DEFINIDOS
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.selectedSqlTextFilterQuery = undefined;
                                          $scope.generateGlobalQuery();
                                      }
                                      else{
                                          //SI EL OPERADOR Y EL VALOR ESTÁN DEFINIDOS
                                                console.log("esta todo ok");
                                            if(tipo==="N"){
                                              if(isInt(valor)=== true){
                                                  //SI ES UN NUMERO
                                                  $scope.errorSqlText = false;
                                                  $scope.selectedSqlTextFilterQuery = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                                  $scope.generateGlobalQuery();
                                                 //alert("es un numero");
                                              }
                                              else{
                                                  //SI NO ES UN NUMERO Y DEBERIA SERLO
                                                 $scope.errorSqlText = true;
                                                   $scope.selectedSqlTextFilterQuery = undefined;
                                                   document.getElementById("sqlTextFilterValue").value = "";
                                                   $scope.generateGlobalQuery();
                                              }
                                          }
                                          if(tipo==="T"){
                                              //SI ES UN TEXTO
                                              $scope.errorSqlText = false;
                                              $scope.selectedSqlTextFilterQuery = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                              $scope.generateGlobalQuery();
                                          }
                                      }
                                  } 
                                  //SQL_ID
                                  if(filtro === "SQL_ID"){
                                      
                                      if((operador === undefined || valor === undefined || valor ==="" || valor ==="%%")){
                                          //SI EL OPERADOR O EL VALOR NO ESTÁN DEFINIDOS
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.selectedSqlIdQuery = undefined;
                                          $scope.generateGlobalQuery();
                                      }
                                      else{
                                          //SI EL OPERADOR Y EL VALOR ESTÁN DEFINIDOS
                                                console.log("esta todo ok");
                                            if(tipo==="N"){
                                              if(isInt(valor)=== true){
                                                  //SI ES UN NUMERO
                                                  $scope.errorSqlId = false;
                                                  $scope.selectedSqlIdQuery = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                                  $scope.generateGlobalQuery();
                                                 //alert("es un numero");
                                              }
                                              else{
                                                  //SI NO ES UN NUMERO Y DEBERIA SERLO
                                                 $scope.errorSqlId = true;
                                                   $scope.selectedSqlIdQuery = undefined;
                                                   document.getElementById("sqlIdFilterValue").value = "";
                                                   $scope.generateGlobalQuery();
                                              }
                                          }
                                          if(tipo==="T"){
                                              //SI ES UN TEXTO
                                              $scope.errorSqlId = false;
                                              $scope.selectedSqlIdQuery = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                              $scope.generateGlobalQuery();
                                          }
                                      }
                                  } 
                                  //SQL_MODULE
                                  if(filtro === "SQL_MODULE"){
                                      
                                      if((operador === undefined || valor === undefined || valor ==="" || valor ==="%%")){
                                          //SI EL OPERADOR O EL VALOR NO ESTÁN DEFINIDOS
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.selectedSqlModule = undefined;
                                          $scope.generateGlobalQuery();
                                      }
                                      else{
                                          //SI EL OPERADOR Y EL VALOR ESTÁN DEFINIDOS
                                                console.log("esta todo ok");
                                            if(tipo==="N"){
                                              if(isInt(valor)=== true){
                                                  //SI ES UN NUMERO
                                                  $scope.errorSqlModule = false;
                                                  $scope.selectedSqlModule = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                                  $scope.generateGlobalQuery();
                                                 //alert("es un numero");
                                              }
                                              else{
                                                  //SI NO ES UN NUMERO Y DEBERIA SERLO
                                                 $scope.errorSqlModule = true;
                                                   $scope.selectedSqlModule = undefined;
                                                   document.getElementById("sqlIdFilterValue").value = "";
                                                   $scope.generateGlobalQuery();
                                              }
                                          }
                                          if(tipo==="T"){
                                              //SI ES UN TEXTO
                                              $scope.errorSqlModule = false;
                                              $scope.selectedSqlModule = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                              $scope.generateGlobalQuery();
                                          }
                                      }
                                  } 
                                  //PLAN_HASH_VALUE
                                  if(filtro === "PLAN_HASH_VALUE"){
                                      
                                      if((operador === undefined || valor === undefined || valor ==="" || valor ==="%%")){
                                          //SI EL OPERADOR O EL VALOR NO ESTÁN DEFINIDOS
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.selectedPlanHashValue = undefined;
                                          $scope.generateGlobalQuery();
                                      }
                                      else{
                                          //SI EL OPERADOR Y EL VALOR ESTÁN DEFINIDOS
                                                console.log("esta todo ok");
                                            if(tipo==="N"){
                                              if(isInt(valor)=== true){
                                                  //SI ES UN NUMERO
                                                  $scope.errorPlanHashValue = false;
                                                  $scope.selectedPlanHashValue = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                                  $scope.generateGlobalQuery();
                                                 //alert("es un numero");
                                              }
                                              else{
                                                  //SI NO ES UN NUMERO Y DEBERIA SERLO
                                                 $scope.errorPlanHashValue = true;
                                                   $scope.selectedPlanHashValue = undefined;
                                                   document.getElementById("planHashValueFilterValue").value = "";
                                                   $scope.generateGlobalQuery();
                                              }
                                          }
                                          if(tipo==="T"){
                                              //SI ES UN TEXTO
                                              $scope.errorPlanHashValue = false;
                                              $scope.selectedPlanHashValue = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                              $scope.generateGlobalQuery();
                                          }
                                      }
                                  }                                   
                                  //EXECUTIONS
                                  if(filtro === "EXECUTIONS"){
                                      if((operador === undefined || valor === undefined || valor ==="" || valor ==="%%")){
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.selectedExecutionsValue = undefined;
                                          $scope.generateGlobalQuery();
                                      }
                                      else{
                                                console.log("esta todo ok");
                                            if(tipo==="N"){
                                              if(isInt(valor)=== true){
                                                  $scope.errorExecutions = false;
                                                  $scope.selectedExecutionsValue = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                                  $scope.generateGlobalQuery();
                                                 //alert("es un numero");
                                              }
                                              else{
                                                 $scope.errorExecutions = true;
                                                   $scope.selectedExecutionsValue = undefined;
                                                   document.getElementById("executionsFilterValue").value = "";
                                                   $scope.generateGlobalQuery();
                                              }
                                          }
                                          if(tipo==="T"){
                                              $scope.errorExecutions = false;
                                              $scope.selectedExecutionsValue = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                              $scope.generateGlobalQuery();
                                          }
                                      }
                                  }                                    

                                  //DISK_READS
                                  if(filtro === "DISK_READS"){
                                      if((operador === undefined || valor === undefined || valor ==="" || valor ==="%%")){
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.selectedDiskReads = undefined;
                                          $scope.generateGlobalQuery();
                                      }
                                      else{
                                                console.log("esta todo ok");
                                            if(tipo==="N"){
                                              if(isInt(valor)=== true){
                                                  $scope.errorDiskReads = false;
                                                  $scope.selectedDiskReads = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                                  $scope.generateGlobalQuery();
                                                 //alert("es un numero");
                                              }
                                              else{
                                                 $scope.errorDiskReads = true;
                                                   $scope.selectedDiskReads = undefined;
                                                   document.getElementById("diskReadsFilterValue").value = "";
                                                   $scope.generateGlobalQuery();
                                              }
                                          }
                                          if(tipo==="T"){
                                              $scope.errorDiskReads = false;
                                              $scope.selectedDiskReads = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                              $scope.generateGlobalQuery();
                                          }
                                      }
                                  }   
                                  //ROWS_PROCESSED
                                  if(filtro === "ROWS_PROCESSED"){
                                      if((operador === undefined || valor === undefined || valor ==="" || valor ==="%%")){
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.selectedRowsProcessed = undefined;
                                          $scope.generateGlobalQuery();
                                      }
                                      else{
                                                console.log("esta todo ok");
                                            if(tipo==="N"){
                                              if(isInt(valor)=== true){
                                                  $scope.errorRowsProcessed = false;
                                                  $scope.selectedRowsProcessed = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                                  $scope.generateGlobalQuery();
                                                 //alert("es un numero");
                                              }
                                              else{
                                                 $scope.errorRowsProcessed = true;
                                                   $scope.selectedRowsProcessed = undefined;
                                                   document.getElementById("rowsProcessedFilterValue").value = "";
                                                   $scope.generateGlobalQuery();
                                              }
                                          }
                                          if(tipo==="T"){
                                              $scope.errorRowsProcessed = false;
                                              $scope.selectedRowsProcessed = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                              $scope.generateGlobalQuery();
                                          }
                                      }
                                  } 
                                  //CPU_TIME
                                  if(filtro === "CPU_TIME"){
                                      if((operador === undefined || valor === undefined || valor ==="" || valor ==="%%")){
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.selectedCpuTime = undefined;
                                          $scope.generateGlobalQuery();
                                      }
                                      else{
                                                console.log("esta todo ok");
                                            if(tipo==="N"){
                                              if(isInt(valor)=== true){
                                                  $scope.errorCpuTime = false;
                                                  $scope.selectedCpuTime = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                                  $scope.generateGlobalQuery();
                                                 //alert("es un numero");
                                              }
                                              else{
                                                 $scope.errorCpuTime = true;
                                                   $scope.selectedCpuTime = undefined;
                                                   document.getElementById("cpuTimeFilterValue").value = "";
                                                   $scope.generateGlobalQuery();
                                              }
                                          }
                                          if(tipo==="T"){
                                              $scope.errorCpuTime = false;
                                              $scope.selectedCpuTime = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                              $scope.generateGlobalQuery();
                                          }
                                      }
                                  }
                                  //ELAPSED_TIME
                                  if(filtro === "ELAPSED_TIME"){
                                      if((operador === undefined || valor === undefined || valor ==="" || valor ==="%%")){
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.selectedElapsedTime = undefined;
                                          $scope.generateGlobalQuery();
                                      }
                                      else{
                                                console.log("esta todo ok");
                                            if(tipo==="N"){
                                              if(isInt(valor)=== true){
                                                  $scope.errorElapsedTime = false;
                                                  $scope.selectedElapsedTime = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                                  $scope.generateGlobalQuery();
                                                 //alert("es un numero");
                                              }
                                              else{
                                                 $scope.errorElapsedTime = true;
                                                   $scope.selectedElapsedTime = undefined;
                                                   document.getElementById("elapsedTimeFilterValue").value = "";
                                                   $scope.generateGlobalQuery();
                                              }
                                          }
                                          if(tipo==="T"){
                                              $scope.errorElapsedTime = false;
                                              $scope.selectedElapsedTime = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                              $scope.generateGlobalQuery();
                                          }
                                      }
                                  }     
                                  //OPTIMIZER_COST
                                  if(filtro === "OPTIMIZER_COST"){
                                      if((operador === undefined || valor === undefined || valor ==="" || valor ==="%%")){
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.selectedOptimizerCost = undefined;
                                          $scope.generateGlobalQuery();
                                      }
                                      else{
                                            console.log("esta todo ok");
                                            if(tipo==="N"){
                                              if(isInt(valor)=== true){
                                                  $scope.errorOptimizerCost = false;
                                                  $scope.selectedOptimizerCost = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                                  $scope.generateGlobalQuery();
                                                 //alert("es un numero");
                                              }
                                              else{
                                                 $scope.errorOptimizerCost = true;
                                                   $scope.selectedOptimizerCost = undefined;
                                                   document.getElementById("optimizerCostFilterValue").value = "";
                                                   $scope.generateGlobalQuery();
                                              }
                                          }
                                          if(tipo==="T"){
                                              $scope.errorOptimizerCost = false;
                                              $scope.selectedOptimizerCost = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                              $scope.generateGlobalQuery();
                                          }
                                      }
                                  }
                              };
                              
                           //   $scope.firstSnap = 
                           //   $scope.secondList = $scope.SnapshotsResults.filter(function(el){ return el.ID_SNAPSHOT !== firstSnap.ID_SNAPSHOT; });;
                       
                                $scope.generateGlobalQuery = function(){
                                    //VARIABLE DONDE SE AGREGAN LOS FILTROS
                                        $scope.selectedFilters = [];
                                    //COMMAND TYPE
                                    if($scope.commnad_type.length > 0){
                                         $scope.selectedFilters.push(" COMMAND_TYPE in (" + $scope.commnad_type + ")") ;
                                    }                                        
                                    //PARSING SCHEMA
                                    if($scope.selectedParsingSchemaQuery){
                                        $scope.selectedFilters.push($scope.selectedParsingSchemaQuery);
                                    } 
                                    //SQL TEXT
                                    if($scope.selectedSqlTextFilterQuery){
                                        $scope.selectedFilters.push($scope.selectedSqlTextFilterQuery);
                                    }
                                    //SQL_ID
                                    if($scope.selectedSqlIdQuery){
                                        $scope.selectedFilters.push($scope.selectedSqlIdQuery);
                                    }    
                                    //SQL_MODULE
                                    if($scope.selectedSqlModule){
                                        $scope.selectedFilters.push($scope.selectedSqlModule);
                                    }        
                                    //PLAN_HASH_VALUE
                                    if($scope.selectedPlanHashValue){
                                        $scope.selectedFilters.push($scope.selectedPlanHashValue);
                                    }   
                                    //EXECUTIONS
                                    if($scope.selectedExecutionsValue){
                                        $scope.selectedFilters.push($scope.selectedExecutionsValue);
                                    }                                      
                                    //DISK READS
                                    if($scope.selectedDiskReads){
                                        $scope.selectedFilters.push($scope.selectedDiskReads);
                                    }    
                                    //ROWS_PROCESSED
                                     if($scope.selectedRowsProcessed){
                                        $scope.selectedFilters.push($scope.selectedRowsProcessed);
                                    } 
                                    //CPU TIME
                                     if($scope.selectedCpuTime){
                                        $scope.selectedFilters.push($scope.selectedCpuTime);
                                    }        
                                    //ELAPSED_TIME
                                    if($scope.selectedElapsedTime){
                                        $scope.selectedFilters.push($scope.selectedElapsedTime);
                                    }
                                    //OPTIMIZER_COST
                                    if($scope.selectedOptimizerCost){
                                        $scope.selectedFilters.push($scope.selectedOptimizerCost);
                                    }                       
                                     console.log("firstAWR:" + $scope.firstAWR);
                                      console.log("secondAWR:" + $scope.secondAWR);
                                    //QUERY GLOBAL
                                    if($scope.selectedFilters.length > 0){
                                        //SI HAY FILTROS
                                        console.log("$scope.selectedFilters vale WHERE " + $scope.selectedFilters.join(" AND "));
                                       
                                    }
                                    else{
                                        //SI NO HAY FILTROS
                                        console.log("no hay ningun filtro definido");
                                    }
                                    
                                };                                      
                      
//HAGO LA SELECT DE TODOS LOS SNAPSHOTS
        //vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.SelectedIdWork, ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString()});
        //vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'select_all'});

                  }
});