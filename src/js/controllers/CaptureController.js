angular.module('app').controller("CaptureCtrl", function($scope,vertxEventBusService,actionData,$stateParams,$state,captureService,pageService,$filter,$sce,$http){
    console.log("entra en capturectrl");
    
                      if(sessionStorage.logado=== undefined)
                  {
                      $state.go("Login");
                  }
                  else{
                             
                      $scope.refreshPage(8);
                                            $scope.selectedFilters = [];
                                            $scope.command_type = [];
                                            $scope.commandTypeSeleccionado = [];
                                            $scope.methodTemplate = true;
                                            $scope.existingSnapshotAWR = false;
                                            $scope.newSnapshotAWR = false;
                                            $scope.selectedOption = false;
											$scope.connectionOK = false;
											$scope.AWRConnectionOK = false;
											$scope.snapshotsAwrPage = false;
											//$scope.filters=false;
											//$scope.memoryConnectionOK = false;
											$scope.selectedOption = false;
											$scope.STSConnectionOK = false;
											$scope.listSTS=true;
											$scope.gpsqlConnectionOK=true;
											$scope.ficheroTraza = false;
											$scope.resumeSnapshotCapture=false;
											$scope.snapAllGpsql=false;
											$scope.workDestino=false;
											
											
											
                                            
                     // $scope.commnad_type = [];
//                      $scope.datosCurrentPage = pageService.getPage(2);
//                      $scope.currentPage = $scope.datosCurrentPage[0];
//                      
//                      alert("datos de la pagina: " + JSON.stringify($scope.currentPage.title));
//                      $(document).ready(function(){  
//                       $("#checkbox_firstAWR").click(function() {  
//                            if($("#checkbox_firstAWR").is(':checked')) {  
//                                console.log("Est� activado");  
//                                $(this).closest("tr").addClass("selected");
//                            } else {  
//                                console.log("No est� activado");  
//                                $(this).closest("tr").removeClass("selected");
//                            }  
//                        });  
//                     }); 
                      
                      $scope.clasesCss={
                        error_add:true,
                        todoBien:false
                      }; 
                    
                    if(decodeURIComponent($stateParams.SelectedWorkName)){
                        $scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);
                        //vertxEventBusService.send('work_actions', {VERTX_ACTION: 'select_detailname', ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),WORK_NAME:$scope.SelectedWorkName});
                    }
                     
                   //  $scope.refreshPage(22);
                     
                     $scope.selectFirstAWR = function(snapid){
                        
                         captureService.setFirstAWR(snapid);
                         $scope.firstAWR = snapid;
                         $scope.setSecondAWRList(snapid);
                     };
                     
                     $scope.setSecondAWRList = function(firstAWR){
                         console.log("firstAWR en setSecondAWRList vale " + firstAWR);
                         $scope.refreshPage(10);
                         $scope.firstAWR = firstAWR;
                         $scope.secondAWRlist = $scope.allAWR.filter(function(el){
                            // console.log("el.SNAP_ID vale " + el.SNAP_ID);
                            if(el.SNAP_ID > firstAWR){
                             return el.SNAP_ID !== firstAWR; 
                            }
                         });
                         //$scope.page = "Select Second AWR";
                         $scope.generateTable($scope.secondAWRlist);
                     //    console.log($scope.secondAWRlist);
                     };
                     
                     $scope.selectSecondAWR = function(snapid){
                         $scope.refreshPage(12);
                        
                         captureService.setSecondAWR(snapid);
                         $scope.secondAWR = snapid;
                         $scope.filters = true;
                         //$scope.setSecondAWRList(snapid);
                     };
                     
                     $scope.selectSTS = function(stsID,owner,name){
                         $scope.refreshPage(12);
                       
                         captureService.setSTS(stsID);
                         $scope.stsID = stsID;
                         $scope.stsOwner = owner;
                         $scope.stsName = name;
                         $scope.filters = true;
                         $scope.listSTS = false;
                     };
                     
                    $scope.showFilters = function(value){
                      
                        if(value===true && $scope.commandTypeSeleccionado.length === 0){
                            vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"show_filters",DB_TYPE:"Oracle"});                         
                        }
                      $scope.filter = "Yes";  
                      $scope.botonFilters = value;  
                    };
                     
                     
                                 $scope.setCommandType = function () {
                                        $scope.commandTypeSeleccionado = $filter('filter')($scope.commandTypeFilter.VALUES, {checked: true});
                                        if($scope.commandTypeSeleccionado === []){
                                            console.log("commandTypeSeleccionado vale 0");
                                        }
                                        else{
                                            console.log("commandTypeSeleccionado tiene " + $scope.commandTypeSeleccionado.length + " y vale " + $scope.commandTypeSeleccionado);
                                        }
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
                                          //SI EL OPERADOR O EL VALOR NO EST�N DEFINIDOS
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.selectedParsingSchemaQuery = undefined;
                                          $scope.noParsingSchema = true;
                                          $scope.generateGlobalQuery();
                                      }
                                      else{
                                          //SI EL OPERADOR Y EL VALOR EST�N DEFINIDOS
                                                console.log("esta todo ok");
                                            if(tipo==="N"){
                                              if(isInt(valor)=== true){
                                                  //SI ES UN NUMERO
                                                  $scope.errorParsingSchemaName = false;
                                                  $scope.selectedParsingSchemaQuery = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                                  $scope.valorParsingSchema = valor;
                                                  $scope.generateGlobalQuery();
                                                  console.log("El valor de Parsing es "+$scope.valorParsingSchema);
                                                 
                                              }
                                              else{
                                                  //SI NO ES UN NUMERO Y DEBERIA SERLO
                                                 $scope.errorParsingSchemaName = true;
                                                   $scope.selectedParsingSchemaQuery = undefined;
                                                   $scope.noParsingSchema = true;
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
                                          //SI EL OPERADOR O EL VALOR NO EST�N DEFINIDOS
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.noSQLtext = true;
                                          $scope.selectedSqlTextFilterQuery = undefined;
                                          $scope.generateGlobalQuery();
                                      }
                                      else{
                                          //SI EL OPERADOR Y EL VALOR EST�N DEFINIDOS
                                                console.log("esta todo ok");
                                            if(tipo==="N"){
                                              if(isInt(valor)=== true){
                                                  //SI ES UN NUMERO
                                                  $scope.errorSqlText = false;
                                                  $scope.selectedSqlTextFilterQuery = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                                  $scope.generateGlobalQuery();
                                                 
                                              }
                                              else{
                                                  //SI NO ES UN NUMERO Y DEBERIA SERLO
                                                 $scope.errorSqlText = true;
                                                   $scope.selectedSqlTextFilterQuery = undefined;
                                                   document.getElementById("sqlTextFilterValue").value = "";
                                                   $scope.noSQLtext = true;
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
                                          //SI EL OPERADOR O EL VALOR NO EST�N DEFINIDOS
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.selectedSqlIdQuery = undefined;
                                          $scope.generateGlobalQuery();
                                          $scope.noSQLid = true;
                                      }
                                      else{
                                          //SI EL OPERADOR Y EL VALOR EST�N DEFINIDOS
                                                console.log("esta todo ok");
                                            if(tipo==="N"){
                                              if(isInt(valor)=== true){
                                                  //SI ES UN NUMERO
                                                  $scope.errorSqlId = false;
                                                  $scope.selectedSqlIdQuery = $scope.generateFilterQuery(filtro,operador,valor,tipo);
                                                  $scope.generateGlobalQuery();
                                                
                                              }
                                              else{
                                                  //SI NO ES UN NUMERO Y DEBERIA SERLO
                                                 $scope.errorSqlId = true;
                                                   $scope.selectedSqlIdQuery = undefined;
                                                   document.getElementById("sqlIdFilterValue").value = "";
                                                   $scope.noSQLid = true;
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
                                          //SI EL OPERADOR O EL VALOR NO EST�N DEFINIDOS
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.selectedSqlModule = undefined;
                                          $scope.noSQLmodule = true;
                                          $scope.generateGlobalQuery();
                                      }
                                      else{
                                          //SI EL OPERADOR Y EL VALOR EST�N DEFINIDOS
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
                                                 $scope.noSQLmodule = true;
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
                                          //SI EL OPERADOR O EL VALOR NO EST�N DEFINIDOS
                                          console.log("el operador esta definido pero no el valor");
                                          $scope.selectedPlanHashValue = undefined;
                                          $scope.noPlanHash = true;
                                          $scope.generateGlobalQuery();
                                      }
                                      else{
                                          //SI EL OPERADOR Y EL VALOR EST�N DEFINIDOS
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
                                                   $scope.noPlanHash = true;
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
                                          $scope.noExecutions = true;
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
                                                   $scope.noExecutions = true;
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
                                          $scope.noDiskReads = true;
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
                                                   $scope.noDiskReads = true;
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
                                          $scope.noRowsProcessed = true;
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
                                                   $scope.noRowsProcessed = true;
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
                                          $scope.noCPUTime = true;
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
                                                   $scope.noCPUTime = true;
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
                                          $scope.noElapsedTime = true;
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
                                                   $scope.noElapsedTime = true;
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
                                          $scope.noOptimizerCost = true;
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
                                                   $scope.noOptimizerCost = true;
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
                                    //if($scope.commnad_type.length > 0){
                                    if($scope.commnad_type){
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
                                        $scope.selectedFilters = "no hay ningun filtro definido";
                                    }
                                   
                                };     
                     
                     
                     
                     
                     $scope.$on('AWRConnectionOK', function(ev, args) {                       
                         $scope.AWRConnectionOK = true;
                     });
                     
                     $scope.$on('STSConnectionOK', function(ev, args) {                       
                         $scope.STSConnectionOK = true;
                     });
                     
                     $scope.$on('ProgressAWR', function(ev, args) {                       
                         $scope.Progress = args.progressAWR;
                     });
                  
                     $scope.goToSnapshotsAWRpage= function(value){
                         $scope.snapshotsAwrPage = true;
                         $scope.filter = value;
                         $scope.filters = false;
                         $scope.filterTemplate = false;
                         $scope.refreshPage(23);
                     };
                     
                     $scope.getSnapshots = function(){
                         $scope.refreshPage(13);
                         $scope.selectedOption = true;
                         $scope.newSnapshotAWR = false;
                         $scope.existingSnapshotAWR = true; 
                         $scope.snapshotADD = "N";
                         
                        //  $scope.SelectedWorkName = decodeURIComponent($stateParams.SelectedWorkName);
                        
                        if($scope.GpsqlMethod){
                            vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.idWorkDestino, ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString()});                            
                        }else{
                            console.log('$scope.GpsqlMethod no est� definido: ',$scope.GpsqlMethod);
                            vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.SelectedIdWork, ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString()});
                        }
                                            //NEW SNAPSHOT 
                                            $scope.NewSnapshotAWRfuncion = function(){
                                                  $scope.Progress = true;            
                                                  $scope.Error = "";

                                                var new_snapshot_description = myTrim(document.getElementById("SNAPSHOT_DESCRIPTION").value);
                                                validaVacio("Snapshots","add","",new_snapshot_description,$scope);
                                                    if($scope.SnapshotAddOK === true)
                                                    {
                                                          vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'add',ID_WORK: sessionStorage.SelectedIdWork, SNAPSHOT_DESCRIPTION: new_snapshot_description,ID_SES:sessionStorage.idSesion, ID_CON: actionData.getIdCon().toString()});
                                                          $scope.Progress = false;
                                                          $scope.SnapshotAddOK = false;
                                                   }
                                                   
                                                  
                                            };  
                     };
                     
                     $scope.addSnaphot = function(){
                         $scope.refreshPage(15);
                         $scope.selectedOption = true;
                         $scope.existingSnapshotAWR = false;
                         $scope.newSnapshotAWR = true;
                         $scope.snapshotADD = "Y";
                     };
                     
                     $scope.selectSnapshotAWR=function(snapshot){
                        console.log("RESUMEN SNAPSHOT CAPTURE");
                        console.log("Valor de entrada -> "+snapshot.SNAPSHOT_DESCRIPTION);                      
                        $scope.snapshotCreated = snapshot.CREATED;
                        $scope.noSnapshotCreated = false;
                        $scope.snapshotDescription = snapshot.SNAPSHOT_DESCRIPTION;
                        $scope.snapshotId = snapshot.ID_SNAPSHOT;

                        sessionStorage.idSnapshot = $scope.snapshotId;
                        $scope.resumeSnapshotCapture = true;
                        console.log("$scope.resumeSnapshotCapture = "+$scope.resumeSnapshotCapture);   
                             $scope.refreshPage(14);
                         };
                      
                     //HAGO LA SELECT DE TODOS LOS SNAPSHOTS
                     vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.SelectedIdWork, ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString()});            
                      console.log("$scope.SnapshotsResults en capture controller: "+$scope.SnapshotsResults);
                      var new_snapshot_description;
                     $scope.NewSnapshotCapture = function(){
                          $scope.Progress = true;            
                          $scope.Error = "";
                        console.log("Estamos en la funcion new Snapshot de capture controller");
                        new_snapshot_description = myTrim(document.getElementById("SNAPSHOT_DESCRIPTION").value);
                        validaVacio("New Snapshot AWR","add","",new_snapshot_description,$scope);
                            if($scope.SnapshotAddOK === true){
                                $scope.Progress = false;
                                $scope.SnapshotAddOK = false;
                                console.log("Mensaje de error: "+$scope.Error);
                                $scope.snapshotDescription = new_snapshot_description;
                                $scope.noSnapshotCreated = true;
                                $scope.resumeSnapshotCapture = true;
                                $scope.refreshPage(14);   
                           }
                     };     
                     
                     $scope.guardarDatosConexion = function(){
                         vertxEventBusService.send('repository_actions', {VERTX_ACTION:"select_repo_data",REPO_NAME:sessionStorage.repoName});
                         console.log('repository_actions', {VERTX_ACTION:"select_repo_data", REPO_NAME:sessionStorage.repoName});
                     };
                             
                     $scope.seeDetailSnapGpsql = function(idWork, workNameOrigen){
                            sessionStorage.idWorkOrigen =  idWork;
                            $scope.nameWorkOrigen = workNameOrigen;
                            //alert(sessionStorage.idWorkOrigen);
                            vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.idWorkOrigen, ID_SES:sessionStorage.idSesion, ID_CON:  actionData.setIdCon().toString()});
                            console.log({VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.idWorkOrigen, ID_SES:sessionStorage.idSesion, ID_CON:  actionData.setIdCon().toString()});
                            $scope.refreshPage(18);
                            $scope.snapAllGpsql = true;
                            $scope.workAllGpsql = false;
                     };
                     
                     $scope.seeDetailSnapDestino = function(idWork, workNameDestino){
                            sessionStorage.idWorkDestino =  idWork;
                            sessionStorage.selectedWorkNameDestino = workNameDestino;
                            $scope.selectedWorkNameDestino = sessionStorage.selectedWorkNameDestino;
                            //alert(sessionStorage.idWorkDestino);
                           // vertxEventBusService.send('snapshot_actions', {VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.idWorkDestino, ID_SES:sessionStorage.idSesion, ID_CON:  actionData.setIdCon().toString()});
                           // console.log({VERTX_ACTION: 'select_all', ID_WORK: sessionStorage.idWorkDestino, ID_SES:sessionStorage.idSesion, ID_CON:  actionData.setIdCon().toString()});
                            //$scope.refreshPage(21);
                            $scope.workDestino = false;
                            $scope.filters = true;
                            $scope.refreshPage(12);
                     };
                     
                     $scope.selectSnapshotCapture = function (snapID, description){
                         sessionStorage.idSnapOrigen = snapID;
                         sessionStorage.idSnapescriptionOrigen = description;
                         $scope.snapshotDescriptionGpsql = sessionStorage.idSnapescriptionOrigen;
                         //alert(sessionStorage.idSnapOrigen);
                         vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString()});
                         //$scope.snapDestino = false;
                         $scope.snapAllGpsql = false;
						 $scope.workDestino=true;
                        $scope.refreshPage(19);
                         //console.log("Id snap "+sessionStorage.firstSnapId);
                     };
                     
                     $scope.selectSnapshotDestinoCapture = function (snapID){
                         sessionStorage.idSnapDestino = snapID;
                         vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString()});
                        // $scope.snapAllGpsql = false;
                        $scope.snapDestino = false;
                         $scope.filters = true;
                        $scope.refreshPage(12);
                         //console.log("Id snap "+sessionStorage.firstSnapId);
                     };
                     
                    /* $scope.getNameFile = function(name){
                         name = name.split('\\');
                         alert(name[name.length-1]);
                         $scope.nameFile = name[name.length-1];
                         alert("$scope.nameFile "+$scope.nameFile);
                     };*/
        
                     $scope.uploadFile = function(){
                         alert("uploadFile");
                       //  $scope.refreshPage(22);
                         
                         /*$timeout(function() { 
                             
                        }, 500);*/
                     };
                     
                     $scope.doUpload = function(){
                         alert("doUpload()");
                        $scope.routeFile = document.getElementById("myFile").value;
                        
                        $scope.nameFile = $scope.routeFile.split('\\');
                        $scope.nameFile = $scope.nameFile[$scope.nameFile.length-1];
                                                
                        if($scope.nameFile===""){
                            $scope.errorFaltaFile = true;
                        }else{
                            $scope.errorFaltaFile = false;
                            $scope.ficheroTraza = false;
                            $scope.filters = true;
                            /*alert("uploadFile");
                            $scope.refreshPage(22);*/
                            
                            /* var config = {
                                headers : {
                                    'Content-Type': 'multipart/form-data'
                                }
                            };
                            
                            var data = $scope.nameFile;
                            
                             $http.post("/formupload", data, config)
                                .success(function (data, status, headers, config) {
                                    $scope.PostDataResponse = data;
                                    action:'/formupload';
                                })
                                .error(function (data, status, header, config) {
                                    $scope.ResponseDetails = "Data: " + data +
                                    "<hr />status: " + status +
                                    "<hr />headers: " + header +
                                    "<hr />config: " + config;
                                });
                                console.log("$scope.PostDataResponse "+$scope.PostDataResponse);*/
                        
                           var req = {
                                method: 'POST',
                                url:'/formupload',
                                headers: {
                                  'Content-Type': 'multipart/form-data'
                                },
                                data: { myFile: document.getElementById("myFile").value }
                               };
                              
                               $http(req).then(function(){
                                   alert("BIEN");
                               }, function(){
                                   alert("MAL");
                               });  
                               
                               //$scope.refreshPage(12);
                        }
                        console.log("$scope.nameFile: "+$scope.nameFile);
                     };
                     
                     $scope.volverCapture = function(){
                         console.log("$scope.page = "+$scope.page);
                        if($scope.page==="Database Connect" || $scope.page==="Select the source work" || $scope.page==="Upload file trace"){
                            //captureService.setMethod("salir method");
                             $scope.AWRMethod = false;
                             $scope.MemoryMethod = false;
                             $scope.STSMethod = false;
                             $scope.GpsqlMethod = false;
                             $scope.TraceMethod = false;
                             $scope.methodTemplate=true;
                            
                            console.log("$scope.methodTemplate "+$scope.methodTemplate);
                            console.log("$scope.AWRMethod "+$scope.AWRMethod);
                            $scope.refreshPage(8);
                        }else if($scope.page === "Snapshot" /*|| ($scope.page ==="Select Second AWR" && $scope.selectedOption === false)*/){
                            $scope.filters = true;
                            $scope.snapshotsAwrPage = false;
                            $scope.refreshPage(12);
                        }else if($scope.page === "New Snapshot"){
                            $scope.selectedOption = false;
                            $scope.snapshotsAwrPage = true;
                            $scope.filters = false;
                            $scope.refreshPage(23);
                        }else if($scope.page === "Save snapshot" /*|| $scope.page === "New Snapshot AWR" || ($scope.page ==="Select Second AWR" && $scope.selectedOption === true && !$scope.resumeSnapshotCapture)*/){
                            $scope.selectedOption = false;
                            $scope.snapshotsAwrPage = true;
                            $scope.filters = false;
                            $scope.refreshPage(23);
                        }else if ($scope.page === "Resume capture" /*|| ($scope.page ==="Select Second AWR" && $scope.resumeSnapshotCapture === true)*/){
                            if($scope.noSnapshotCreated){
                                $scope.refreshPage(15);
                                $scope.snapshotsAwrPage = true;
                                $scope.resumeSnapshotCapture = false;
                                $scope.selectedOption = true;
                                $scope.existingSnapshotAWR = false;
                            }else{
                                $scope.refreshPage(13);
                                $scope.snapshotsAwrPage = true;
                                $scope.resumeSnapshotCapture = false;
                                $scope.selectedOption = true;
                                $scope.existingSnapshotAWR = true;
                            }
                        }else if($scope.page === "Select First AWR"){
                            $scope.refreshPage(11);
                            $scope.AWRConnectionOK = false;
                            $scope.connectionOK = false;
                            $scope.logOutCapture();
                        }else if($scope.page === "Select Second AWR"){
                            $scope.refreshPage(9);
                            $scope.firstAWR = undefined;
                        }else if($scope.page === "Select STS"){
                            $scope.refreshPage(11);
                            $scope.STSConnectionOK = false;
                            $scope.connectionOK = false;
                            $scope.logOutCapture();
                        }else if($scope.page === "Select a snapshot"){
                            $scope.refreshPage(17);
                            $scope.snapAllGpsql = false;
                            $scope.workAllGpsql = true;
                        }else if($scope.page === "Select the destination work"){
                            $scope.refreshPage(18);
                            $scope.snapAllGpsql = true;
                            $scope.workDestino = false;
                        }else if($scope.page === "Filters"){
                            if($scope.AWRMethod){
                                $scope.secondAWR = false;
                                $scope.filters = false;
                                $scope.refreshPage(10);
                            }else if($scope.MemoryMethod){
                                $scope.refreshPage(11);
                                $scope.memoryConnectionOK = false;
                                $scope.connectionOK = false;
                                $scope.filters = false;
                                $scope.logOutCapture();
                            }else if($scope.STSMethod){
                                $scope.listSTS = true;
                                $scope.filters = false;
                                $scope.refreshPage(16);
                            }else if($scope.GpsqlMethod){
                                $scope.workDestino = true;
                                $scope.filters = false;
                                //$scope.
                                //alert("volver desde filters en gpsql");
                                $scope.refreshPage(19);
                            }else if($scope.TraceMethod){
                                $scope.ficheroTraza = true;
                                $scope.filters = false;
                                $scope.refreshPage(22);
                            }
                        }
                    };     
                     
                     $scope.setMethod = function(method){
                         $scope.selectedMethod = method;
                         $scope.methodTemplate=false;
                         $scope.TestConnAWR = function(){
                                  $scope.refreshPage(9);
                               //   $scope.databaseHostname = document.getElementById("HOST_NAME").value;
                                  
                                 // $scope.databaseHostname = document.getElementById("HOST_NAME").value;
                                  //$scope.SeeDetails($scope.SelectedWorkName);
                                 $scope.databaseHostname = document.getElementById("HOST_NAME").value;
                                 $scope.databasePort = document.getElementById("PORT").value;
                                 $scope.databaseName = document.getElementById("DB_NAME").value;
								 $scope.databaseDbname = document.getElementById("DB_NAME").value;
                                 //$scope.databaseName = sessionStorage.databaseDbname;
                                 $scope.databaseUsername = document.getElementById("USER_NAME").value;
                                 $scope.databasePassword = document.getElementById("PASSWD").value;
                                 $scope.databaseService = document.getElementById("SERVICE").value;

                                 if($scope.databaseService !== ""){
                                      console.log("esta todo bien");
                                     // $scope.page = "Select First AWR";
                                      
                                      
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
									  $scope.databaseDbname = captureService.getName();
                                      $scope.userName = captureService.getUsername();
                                      $scope.databaseService = captureService.getService();
                                      
                                      vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"test_oracle_conn",HOST_NAME:$scope.databaseHostname,PORT:$scope.databasePort,DB_NAME:$scope.databaseName,USER_NAME:$scope.databaseUsername,PASSWD:$scope.databasePassword,ORACLE_SERVICE_SID:$scope.databaseService}); 
                                      
                                 }
                                 else{
                                    alert("Please select if is a service or SID");                          
                                 }
                                // vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"test_oracle_conn",HOST_NAME:sessionStorage.databaseHostname,PORT:sessionStorage.databasePort,DB_NAME:sessionStorage.databaseDbname,USER_NAME:sessionStorage.databaseUsername,PASSWD:sessionStorage.databasePassword,ORACLE_SERVICE_SID:sessionStorage.databaseService}); 
                                 
                             };
                        
                         if(method === "AWR"){
                             $scope.AWRMethod = true;
                             $scope.refreshPage(11);
                         }
                         if(method === "Memory"){
							 console.log ("Enter method memory");
                             $scope.MemoryMethod = true;
							 //$scope.filters = true;
                             $scope.refreshPage(11);
                         }
                         if(method === "STS"){
                             $scope.STSMethod = true;
                             $scope.refreshPage(11); 
                         }
                         if(method === "GPSQL"){
                             $scope.GpsqlMethod = true;
                             vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString()});
                             $scope.guardarDatosConexion();
                             $scope.refreshPage(17); 
                         }
                         if(method === "Trace"){
                             $scope.TraceMethod = true;
                             $scope.ficheroTraza = true;
                             $scope.guardarDatosConexion();
                             $scope.refreshPage(22);
                         } 
                         
                     };
                     
                     
                     $scope.captureAWR = function(){
                         
                         console.log("funci�n captureAWR");
                      
                         if($scope.filterQuery === undefined){
                             $scope.filterQuery = "";
                         }
						 sessionStorage.gohome = true;
                         
                         if($scope.snapshotADD === "N"){
                            vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_awr", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotId.toString(),AWR_INI:$scope.firstAWR,AWR_END:$scope.secondAWR,QUERY_FILTER:$scope.filterQuery,HOST_NAME:$scope.databaseHostname,PORT:$scope.databasePort,DB_NAME:$scope.databaseName,USER_NAME:$scope.databaseUsername,PASSWD:$scope.databasePassword,ORACLE_SERVICE_SID:$scope.databaseService});
                            console.log('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_awr", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotId.toString(),AWR_INI:$scope.firstAWR,AWR_END:$scope.secondAWR,QUERY_FILTER:$scope.filterQuery,HOST_NAME:$scope.databaseHostname,PORT:$scope.databasePort,DB_NAME:$scope.databaseName,USER_NAME:$scope.databaseUsername,PASSWD:$scope.databasePassword,ORACLE_SERVICE_SID:$scope.databaseService});
                            $scope.Progress = true;
                         } else if($scope.snapshotADD === "Y"){
                             vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_awr", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotDescription,AWR_INI:$scope.firstAWR,AWR_END:$scope.secondAWR,QUERY_FILTER:$scope.filterQuery,HOST_NAME:$scope.databaseHostname,PORT:$scope.databasePort,DB_NAME:$scope.databaseName,USER_NAME:$scope.databaseUsername,PASSWD:$scope.databasePassword,ORACLE_SERVICE_SID:$scope.databaseService});
                             console.log('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_awr", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotDescription,AWR_INI:$scope.firstAWR,AWR_END:$scope.secondAWR,QUERY_FILTER:$scope.filterQuery,HOST_NAME:$scope.databaseHostname,PORT:$scope.databasePort,DB_NAME:$scope.databaseName,USER_NAME:$scope.databaseUsername,PASSWD:$scope.databasePassword,ORACLE_SERVICE_SID:$scope.databaseService});
                             $scope.Progress = true;
                         }
                         
                     };
                     
                     $scope.captureMemory = function(){                        
                      
                         if($scope.filterQuery === undefined){
                             $scope.filterQuery = "";
                         }
						 sessionStorage.gohome = true;
                         
                         if($scope.snapshotADD === "N"){
                            vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_mem", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotId.toString(),QUERY_FILTER:$scope.filterQuery,HOST_NAME:$scope.databaseHostname,PORT:$scope.databasePort,DB_NAME:$scope.databaseName,USER_NAME:$scope.databaseUsername,PASSWD:$scope.databasePassword,ORACLE_SERVICE_SID:$scope.databaseService});
                            console.log('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_mem", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotId.toString(),QUERY_FILTER:$scope.filterQuery,HOST_NAME:$scope.databaseHostname,PORT:$scope.databasePort,DB_NAME:$scope.databaseName,USER_NAME:$scope.databaseUsername,PASSWD:$scope.databasePassword,ORACLE_SERVICE_SID:$scope.databaseService});
                            $scope.Progress = true;
                         } else if($scope.snapshotADD === "Y"){
                            vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_mem", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotDescription,QUERY_FILTER:$scope.filterQuery,HOST_NAME:$scope.databaseHostname,PORT:$scope.databasePort,DB_NAME:$scope.databaseName,USER_NAME:$scope.databaseUsername,PASSWD:$scope.databasePassword,ORACLE_SERVICE_SID:$scope.databaseService});
                            console.log('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_mem", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotDescription,QUERY_FILTER:$scope.filterQuery,HOST_NAME:$scope.databaseHostname,PORT:$scope.databasePort,DB_NAME:$scope.databaseName,USER_NAME:$scope.databaseUsername,PASSWD:$scope.databasePassword,ORACLE_SERVICE_SID:$scope.databaseService});
                             $scope.Progress = true;
                        }
                        
                     };
                     
                     $scope.captureSTS = function(){                        
                      
                         if($scope.filterQuery === undefined){
                             $scope.filterQuery = "";
                         }
						 //console.log('call refresh home');
						 sessionStorage.gohome = true;
						 
                         
                         if($scope.snapshotADD === "N"){
                            vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_sts", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotId.toString(),STS_OWNER:$scope.stsOwner,STS_NAME:$scope.stsName,QUERY_FILTER:$scope.filterQuery,HOST_NAME:$scope.databaseHostname,PORT:$scope.databasePort,DB_NAME:$scope.databaseName,USER_NAME:$scope.databaseUsername,PASSWD:$scope.databasePassword,ORACLE_SERVICE_SID:$scope.databaseService});
                            console.log('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_sts", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotId.toString(),STS_OWNER:$scope.stsOwner,STS_NAME:$scope.stsName,QUERY_FILTER:$scope.filterQuery,HOST_NAME:$scope.databaseHostname,PORT:$scope.databasePort,DB_NAME:$scope.databaseName,USER_NAME:$scope.databaseUsername,PASSWD:$scope.databasePassword,ORACLE_SERVICE_SID:$scope.databaseService});
                            $scope.Progress = true;
                         } else if($scope.snapshotADD === "Y"){
                            vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_sts", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotDescription,STS_OWNER:$scope.stsOwner,STS_NAME:$scope.stsName,QUERY_FILTER:$scope.filterQuery,HOST_NAME:$scope.databaseHostname,PORT:$scope.databasePort,DB_NAME:$scope.databaseName,USER_NAME:$scope.databaseUsername,PASSWD:$scope.databasePassword,ORACLE_SERVICE_SID:$scope.databaseService});
                            console.log('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_sts", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotDescription,STS_OWNER:$scope.stsOwner,STS_NAME:$scope.stsName,QUERY_FILTER:$scope.filterQuery,HOST_NAME:$scope.databaseHostname,PORT:$scope.databasePort,DB_NAME:$scope.databaseName,USER_NAME:$scope.databaseUsername,PASSWD:$scope.databasePassword,ORACLE_SERVICE_SID:$scope.databaseService});
                             $scope.Progress = true;
                        }
						
                        
                     };
                     
                     $scope.captureGPSQL = function(){                        
                      
                         if($scope.filterQuery === undefined){
                             $scope.filterQuery = "";
                         }
						 sessionStorage.gohome = true;
                         
                         if($scope.snapshotADD === "N"){
                            vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_gpsql", ID_WORK:sessionStorage.idWorkDestino,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotId.toString(),ID_WORK_SOURCE:sessionStorage.idWorkOrigen,ID_SNAPSHOT_SOURCE:sessionStorage.idSnapOrigen,QUERY_FILTER:$scope.filterQuery});
                            console.log('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_gpsql", ID_WORK:sessionStorage.idWorkOrigen,ADD:$scope.snapshotADD,SNAPSHOT_NAME:sessionStorage.idSnapOrigen,ID_WORK_SOURCE:sessionStorage.idWorkDestino,ID_SNAPSHOT_SOURCE:$scope.snapshotId.toString(),QUERY_FILTER:$scope.filterQuery});
                            $scope.Progress = true;
                         } else if($scope.snapshotADD === "Y"){
                            vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_gpsql", ID_WORK:sessionStorage.idWorkDestino,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotDescription,ID_WORK_SOURCE:sessionStorage.idWorkOrigen,ID_SNAPSHOT_SOURCE:sessionStorage.idSnapOrigen,QUERY_FILTER:$scope.filterQuery});
                            console.log('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_gpsql", ID_WORK:sessionStorage.idWorkOrigen,ADD:$scope.snapshotADD,SNAPSHOT_NAME:sessionStorage.idSnapOrigen,ID_WORK_SOURCE:sessionStorage.idWorkDestino,ID_SNAPSHOT_SOURCE:$scope.snapshotDescription,QUERY_FILTER:$scope.filterQuery});
                             $scope.Progress = true;
                        }
                        
                     };
                     
                     $scope.captureTrace = function(){                        
                      
                         if($scope.filterQuery === undefined){
                             $scope.filterQuery = "";
                         }
						 sessionStorage.gohome = true;
                         
                         if($scope.snapshotADD === "N"){
                            vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_trace", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotId.toString(),QUERY_FILTER: $scope.filterQuery,FILE_TRACE_NAME:$scope.nameFile});
                            console.log('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_trace", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotId.toString(),QUERY_FILTER: $scope.filterQuery,FILE_TRACE_NAME:$scope.nameFile});
                            $scope.Progress = true;
                         } else if($scope.snapshotADD === "Y"){
                            vertxEventBusService.send('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_trace", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotDescription,QUERY_FILTER: $scope.filterQuery,FILE_TRACE_NAME:$scope.nameFile});
                            console.log('oracle_capture_actions', {ID_SES:sessionStorage.idSesion, ID_CON: (actionData.setIdCon()).toString(),VERTX_ACTION:"load_querys_trace", ID_WORK:sessionStorage.SelectedIdWork,ADD:$scope.snapshotADD,SNAPSHOT_NAME:$scope.snapshotDescription,QUERY_FILTER: $scope.filterQuery,FILE_TRACE_NAME:$scope.nameFile});
                             $scope.Progress = true;
                        }
                         
                     };
                  }
});