angular.module('app').service('actionData', function () {
       // var snapshots=[] ;
        var snapshots;
        var idCon = 0;
        //scope.Error = this.getX();
      //  var scopeWorks;
        return {
//            setScopeWorks : function(scope) {
//                console.log("el scope que recibe es " + JSON.stringify());
//                //scopeWorks = scope;
//                scope.Error = this.getX();
//            },
//            set : function(data) {
//                info.error = data;
//            },

            setSnapshotsResults: function(snapshotsResults){
         //       console.log("llama a setSnapshotsResults y llega " + JSON.stringify(snapshotsResults));
                snapshots.push(snapshotsResults);
            },
            setIdCon : function() {
                console.log("llama a setIdCon");
                idCon++;
                return idCon;
            },            
//            getX : function() {
//                console.log("llama a getX");
//                return info.error;
//            },
            getIdCon : function() {
          //      console.log("llama a getIdCon e idCon vale " + idCon);
                return idCon;
            },
            getSnapshotsResults: function(){
                return snapshots;
            }
//            //
//            ////,
////            getScopeWorks : function(scope) {
////               return scope.Error = this.getX();
////            }
       };
    });
    
   angular.module('app').service('captureService', function() {
  //var productList = []; para meter varios varios, se mete con el push, comentado abajo
  var method = "";
  var hostname = "";
  var port = "";
  var name = "";
  var username = "";
  var password = "";
  var service = "";
  var awrConnectionOK = false;
  var firstAWR = false;
  var secondAWR = false;
  
  var setMethod = function(new_method) {
      method = new_method;
  };

  var getMethod = function(){
      return method;
  };

  var setHostname = function(new_hostname) {
      hostname = new_hostname;
  };

  var getHostname = function(){
      return hostname;
  };

  var setPort = function(new_port) {
      port = new_port;
  };

  var getPort = function(){
      return port;
  };

  var setName = function(new_name) {
      name = new_name;
  };

  var getName = function(){
      return name;
  };

  var setUsername = function(new_username) {
      username = new_username;
  };

  var getUsername = function(){
      return username;
  };

  var setPassword = function(new_password) {
      password = new_password;
  };

  var getPassword = function(){
      return password;
  }; 
  
  var setService = function(new_service) {
      service = new_service;
  };

  var getService = function(){
      return service;
  };   
 
  var setAWRConnectionOK = function(new_value) {
      awrConnectionOK = new_value;
  };

  var getAWRConnectionOK = function(){
      return awrConnectionOK;
  };       
  
   var setSTSConnectionOK = function(new_value) {
      STSConnectionOK = new_value;
  };

  var getSTSConnectionOK = function(){
      return STSConnectionOK;
  };  
  
    var setFirstAWR = function(fawr) {
      firstAWR = fawr;
  };

  var getFirstAWR = function(){
      return firstAWR;
  }; 
  
  var setSecondAWR = function(sawr) {
      secondAWR = sawr;
  };

  var getSecondAWR = function(){
     // alert("llama a getAWRConnectionOK y el valor es " + awrConnectionOK);
      return secondAWR;
  };
  
  var setSTS = function(stsID) {
      idSTS = stsID;
  };

  var getSTS = function(){
     // alert("llama a getAWRConnectionOK y el valor es " + awrConnectionOK);
      return idSTS;
  };
  
 return {
    setMethod: setMethod,
    getMethod: getMethod,
    setHostname: setHostname,
    getHostname: getHostname,
    setPort: setPort,   
    getPort: getPort,
    setName: setName,            
    getName: getName, 
    setUsername: setUsername,       
    getUsername: getUsername, 
    setPassword: setPassword,   
    getPassword: getPassword,
    setService: setService,
    getService: getService, 
    setAWRConnectionOK: setAWRConnectionOK,
    getAWRConnectionOK: getAWRConnectionOK,
    setFirstAWR: setFirstAWR,
    getFirstAWR: getFirstAWR,
    setSecondAWR: setSecondAWR,
    getSecondAWR: getSecondAWR,
    setSTSConnectionOK: setSTSConnectionOK,
    getSTSConnectionOK: getSTSConnectionOK,
    setSTS: setSTS,
    getSTS: getSTS
  };

});




angular.module('app').service('pageService', ['captureService', function () {
        
    var current = {
        page: 1
    };

    var pages = [{
        index: 1,
        title: 'Home',
        helpText: 'In this page you will have a quick access  to the Works, snapshots, querys and reports.'
    },
    {
        index: 2,
        title: 'Works',
        helpText: 'Here you will seen a list of all the Works.  You should créate a work to save the results of operations that you make, for example snapshots, querys and the capture of the sames.'
    },
    {
        index: 3,
        title: 'Works Details',
        helpText: 'helptext de Works Details'
    },
    {
        index: 4,
        title: 'Snapshots',
        helpText: 'Here you seen all the captured snapshots of work. A snapshot represent the state of the database in a moment at the time.'
    },  {
        index: 5,
        title: 'Snapshots Details',
        helpText: 'helptext de Snapshots Details'
    },
    {
        index: 6,
        title: 'Querys',
        helpText: 'In this page you will seen the details of the captured querie0s as the time ejecution, the ejecution plan and the code SQL.'
    },  {
        index: 7,
        title: 'Querys Details',
        helpText: 'helptext de Querys Details'
    },  {
        index: 8,
        title: 'Method of Capture',
        helpText: "Here you will capture the querys and snapshots of the database from distinct methods." +
                   '- AWR: This option of Oracle capture the querys from Memory\n'+
                   '- Memory: This Method capture queries and snapshots from memory\n'+
                   '- STS: This option capture the querys from STS. Is a exclusive Method from Oracle databases \n'+
                   '- GPSQL: From this Method you will save the results of a work about other new or existent\n'+
                   '- Trace: Here upload a file traze you will capture your results in the work.'
        
    },  {
        index: 9,
        title: 'Select First AWR',
        helpText: 'Select the first awr you want to compare so you can continue.'
        
    },{
        index: 10,
        title: 'Select Second AWR',
        helpText: 'Select the second awr you want to compare so you can continue.'
        
    },{
        index: 11,
        title: 'Database Connect',
        helpText:'You need connect to database to continue.'
        
    },{
        index: 12,
        title: 'Filters',
        helpText: 'In this page you can filter the results.'
        
    },{
        index: 13,
        title: 'Save snapshot',
        helpText: 'Select a created snapshots to save the capture'
        
    },{
        index: 14,
        title: 'Resume capture',
        helpText: 'In this page,you can see your selected options and back to previous steps to changhe this values. Press the ?Capture? button to start the capture.'
        
    },{
        index: 15,
        title: 'New Snapshot',
        helpText: 'Set the name of your new snapshot to save the capture.'
        
    },{
        index: 16,
        title: 'Select STS',
        helpText: 'Select STS you want capture.'
        
    },{
        index: 17,
        title: 'Select the source work',
        helpText: 'Select work you want capture.'
        
    },{
        index: 18,
        title: 'Select a snapshot',
        helpText:'Select snapshot you want capture.'
    },{
        index: 19,
        title: 'Select the destination work',
        helpText: 'Select the work where you want to save the capture.'
    },{
        index: 20,
        title: 'Reports',
        helpText: 'In this page you will compare and export the results of different snapshots'
    },{
        index: 22,
        title: 'Upload file trace',
        helpText: 'Upload the trace file to capture your results'
    },{
        index: 23,
        title: 'Snapshot',
        helpText: 'Select a created snapshots or create new to save the results.'
    }
   
];

    return {
        getPages: function () {
            return pages;
        },
        getAllPages: function () {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i].index === current) {
                    return [pages[i]];
                    break;
                }
            }
        },
        getPage: function (page) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i].index === page) {
                    return [pages[i]];
                    break;
                }
            }
        },        
        setCurrent: function (page) {
            current.page = page;
        },
        getCurrent: function () {
            return current;
        }
    };
}]);

  angular.module('app').service('tableService', function() {
  //var productList = []; para meter varios varios, se mete con el push, comentado abajo
      var tables = [{
        index: 1,
        table: 'Snapshots',
        sortKey: 'ID_SNAPSHOT',
        itemsPerPage: 10
//        currentPage: 1,
//        itemsPerPage: 10
    },
    {
        index: 2,
        table: 'Works',
        sortKey: 'ID_WORK',
        itemsPerPageHome: 5,
        itemsPerPageWorks: 10
    },
    {
        index: 3,
        title: 'Works Details'
  //      helpText: 'helptext de Works Details'
    },
    {
        index: 4,
        title: 'Snapshots'
  //      helpText: 'helptext de Snapshots'
    },  {
        index: 5,
        title: 'Snapshots Details'
        //itemsPerPageExecution: 10
 //       helpText: 'helptext de Snapshots Details'
    },
    {
        index: 6,
        title: 'Querys'
   //     helpText: 'helptext de Querys'
    },  {
        index: 7,
        title: 'Querys Details'
   //     helpText: 'helptext de Querys Details'
    },  {
        index: 8,
        title: 'Method of Capture'
   //     helpText: 'helptext de Method of Capture'
        
    },  {
        index: 9,
        title: 'Select First AWR'
    //    helpText: 'helptext de Select First AWR'
        
    },{
        index: 10,
        title: 'Select Second AWR'
    //    helpText: 'helptext de Select Second AWR'
        
    },{
        index: 11,
        title: 'Database Connect'
  //      helpText: 'helptext de Database Connect'
        
    },{
        index: 12,
        title: 'Filters'
   //     helpText: 'helptext de Filters'
        
    },{
        index: 13,
        title: 'Save snapshot'
  //      helpText: 'helptext de Save snapshot'
        
    },{
        index: 16,
        title: 'Select STS'
   //     helpText: 'helptext de STS'
        
    },{
        index: 17,
        title: 'Select the source work',
 //       helpText: 'helptext de la pagina',
        itemsPerPageWorksGpsql: 10
    },{
        index: 18,
        title: 'Select a snapshot',
 //       helpText: 'helptext de la pagina',
        itemsPerPageSnapshotsGpsql: 10
    },{
        index: 19,
        title: 'Select the destination work',
   //     helpText: 'helptext de la pagina',
        itemsPerPageworkDestino: 10
    },{
        index: 20,
        title: 'Reports'
   //     helpText: 'helptext de Reports'
    },{
        index: 21,
        title: 'snapshotDestino',
 //       helpText: 'helptext de la pagina',
        itemsPerPageSnapshotDestino: 10
    },{
        index: 22,
        title: 'formupload'
//        helpText: 'helptext de la pagina'
    }
    ,  {
        index: 23,
        title: 'Snapshots Execution',
        itemsPerPageExecution: 10
 //       helpText: 'helptext de Snapshots Details'
    }
    ,  {
        index: 24,
        title: 'Snapshots Execution',
        itemsPerPageParameters: 10
 //       helpText: 'helptext de Snapshots Details'
    }
];
  
 var getTable = function (table) {
            for (var i = 0; i < tables.length; i++) {
                if (tables[i].index === table) {
                    return [tables[i]];
                    break;
                }
            }
        };
  
  
//  var getTable = function(idxtable) {
//      method = new_method;
//  };

  var getMethod = function(){
      return method;
  };

  var setHostname = function(new_hostname) {
      hostname = new_hostname;
  };

  var getHostname = function(){
      return hostname;
  };

  var setPort = function(new_port) {
      port = new_port;
  };

  var getPort = function(){
      return port;
  };

  var setName = function(new_name) {
      name = new_name;
  };

  var getName = function(){
      return name;
  };

  var setUsername = function(new_username) {
      username = new_username;
  };

  var getUsername = function(){
      return username;
  };

  var setPassword = function(new_password) {
      password = new_password;
  };

  var getPassword = function(){
      return password;
  }; 
  
  var setService = function(new_service) {
      service = new_service;
  };

  var getService = function(){
      return service;
  };   
 
  var setAWRConnectionOK = function(new_value) {
      awrConnectionOK = new_value;
  };

  var getAWRConnectionOK = function(){
      return awrConnectionOK;
  };       
  
    var setFirstAWR = function(fawr) {
      firstAWR = fawr;
  };

  var getFirstAWR = function(){
      return firstAWR;
  }; 
  
  var setSecondAWR = function(sawr) {
      secondAWR = sawr;
  };

  var getSecondAWR = function(){
     // alert("llama a getAWRConnectionOK y el valor es " + awrConnectionOK);
      return secondAWR;
  };

    var generateTable = function (datos,cortado,scope) {
        console.log(datos.length);
		if(cortado === true){
			if(datos.length > 1){
                            scope.HaveResults = true;
			}else{
                            scope.HaveResults = false;
                            scope.infoWorks = "No works to show";
			}
		}
        if(cortado === false){
			if(datos.length > 0){
                            scope.HaveResults = true;
			}else{
                            scope.HaveResults = false;
                            scope.infoWorks = "No works to show";
			}
		}
//$scope.generateTable=function(datos){
    //vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  (actionData.setIdCon()).toString()});
                           //   scope.HaveResults = true;
                           //   scope.info = "Loading data...";
                  console.log("llama a generateTable y los datos son:",datos,"la pagina es " + scope.page + " y cortado vale " + cortado);
                        scope.sort = function(keyname){
                            scope.updown = false; 
                            scope.sortKey = keyname;   //set the sortKey to the param passed
                            scope.reverse = !scope.reverse; //if true make it false and vice versa
                            
                        };
                        
                        if(cortado === true){   
                             scope.Results = datos;
                             scope.Results.shift();
                             
                        }
                        else{
                             scope.Results = datos;
                        }
//                        
//                  alert("llama a generatetable y la pagina es " + scope.page);
//                        scope.sort = function(keyname){
//                            scope.updown = false; 
//                            scope.sortKey = keyname;   //set the sortKey to the param passed
//                            scope.reverse = !scope.reverse; //if true make it false and vice versa
//                            
//                        };
//                        
//                        scope.Results = datos;
//                       // $scope.itemsPerPage = 10;
//                        scope.HaveResults = true;
           switch(scope.page){
                 case "Home":
                     scope.infoWorks = "Loading works...";
                     scope.Results = datos;
                     scope.infoWorks = "";
                     //scope.Works.shift();
                     scope.WorksPage = false;
                     console.log("$scope.Works: "+scope.Results.length);
                     scope.sortKey = "ID_WORK"; 
                     scope.currentPageWorks=1;
                     scope.itemsPerPageWorks=5;
                     scope.totalWorks=scope.Results.length;
                     scope.currentPage=1;
                     scope.itemsPerPage=scope.itemsPerPageWorks;
                     scope.total=scope.totalWorks;
                     sessionStorage.currentPageWorks=1;
					 //alert("termina case home " + scope.Results);
                 break;
                 
                 case "Works":
                     scope.infoWorks = "Loading works...";
                     scope.Results = datos;
                     scope.infoWorks = "";
                    // scope.Works.shift();
                     scope.sortKey = "ID_WORK"; 
                    //$scope.currentPageWorks=1;
                     scope.itemsPerPageWorks=10;
                     scope.totalWorks=scope.Results.length;
                     scope.currentPage=sessionStorage.currentPageWorks;
                     scope.itemsPerPage=scope.itemsPerPageWorks;
                     scope.total=scope.totalWorks;
                 break;
//                
                 case "Snapshots":
                     scope.SnapshotsResults = datos;
                      if(scope.noSnaps === true){  
							console.log("Snapshots, actiondata, nosnaps true");
					  }else{
						  scope.Results.shift();
						  scope.sortKey = "ID_SNAPSHOT";   
						 
					  }
                              
						 scope.currentPageSnap=1;
						 scope.itemsPerPageSnap=10;
						 scope.totalSnap=scope.SnapshotsResults.length;
						 scope.currentPage=sessionStorage.currentPageSnapshots;
						 scope.itemsPerPage=scope.itemsPerPageSnap;
						 scope.total=scope.totalSnap;  							  
                 break;
//                      
//                 case "Querys":
//                     scope.QueryResults = datos;
//                     scope.QueryResults.shift(); 
//                     scope.sortKey = "ID_QUERY"; 
//                     scope.currentPageQuerys=1;
//                     scope.itemsPerPageQuerys=10;
//                     scope.totalQuerys=scope.QueryResults.length;
//                     scope.currentPage=sessionStorage.currentPageQuerys;
//                     scope.itemsPerPage=scope.itemsPerPageQuerys;
//                     scope.total=scope.totalQuerys;
//                 break;
//                 
//                 case "Query Details":
//                     scope.QueryResultsDetails = datos;
//                     scope.sortKey = "ID_QUERY"; 
//                     scope.currentPageQuerysDetails=1;
//                     scope.itemsPerPageQuerysDetails=10;
//                     scope.totalQuerysDetails=scope.QueryResultsDetails.length;
//                     scope.currentPage=sessionStorage.currentPageQuerysDetails;
//                     scope.itemsPerPage=scope.itemsPerPageQuerysDetails;
//                     scope.total=scope.totalQuerysDetails;
//                 break;
//                 
//                 case "Snapshots Details":
//                   //console.log
//                     scope.ExecutionResults = datos;
//                     scope.ExecutionResults.shift(); 
//                     scope.sortKey = "ID_SNAPSHOT";   
//                     scope.currentPageExecution=1;
//                     scope.itemsPerPageExecution=10;
//                     scope.totalExecution=scope.ExecutionResults.length;
//                     scope.currentPage=sessionStorage.currentPageExecution;
//                     scope.itemsPerPage=scope.itemsPerPageExecution;
//                     scope.total=scope.totalExecution;    
//                 break;
//                 
                 case "Snapshots Parameters":
                     scope.ParametersResults = datos;
                     scope.ParametersResults.shift(); 
                     scope.sortKey = "ID_SNAPSHOT";   
                     scope.currentPageParameters=1;
                     scope.itemsPerPageParameters=10;
                     scope.totalParameters=scope.ParametersResults.length;
                 //    scope.currentPage=sessionStorage.currentPageParameters;
                 //    scope.itemsPerPage=scope.itemsPerPageParameters;
                 //    scope.maxRange = (scope.currentPage * scope.itemsPerPage);
                 //    scope.minRange = (scope.maxRange-scope.itemsPerPage)+1;
                     scope.maxRangeParameters = scope.maxRange;
                     scope.minRangeParameters = scope.minRange;
                     scope.total=scope.totalParameters;
                 break; 
                 
                 case "Snapshots Execution":
                     scope.ExecutionResults = datos;
                     scope.ExecutionResults.shift(); 
                     scope.sortKey = "ID_SNAPSHOT";   
                     scope.currentPageExecution=1;
                     scope.itemsPerPageExecution=10;
                     scope.totalExecution=scope.ExecutionResults.length;
                     scope.currentPage=sessionStorage.currentPageExecution;
                     scope.itemsPerPage=scope.itemsPerPageExecution;
                    scope.itemsPerPage= 10;
                    scope.maxRangeExecution = scope.maxRange;
                     scope.minRangeExecution = scope.minRange;
                    // scope.maxRange = (scope.currentPage * scope.itemsPerPage);
                   //  scope.minRange = (scope.maxRange-scope.itemsPerPage)+1;
                     scope.total=scope.totalExecution;    
                 break;
//                 
//                 case "Select First AWR":
//                     
//                     scope.allAWR = datos;
//                    
//                     scope.allAWR.shift(); 
//                     scope.$broadcast('allAWR', {allAWR: scope.allAWR});
//                    //  alert(JSON.stringify($scope.allAWR));
//                     scope.sortKey = "SNAP_ID"; 
//                     scope.currentPageAllAWR=1;
//                     scope.itemsPerPageAllAWR=10;
//                     scope.totalAllAWR=scope.allAWR.length;
//                     scope.currentPage=sessionStorage.currentPageAllAWR;
//                     scope.itemsPerPage=scope.itemsPerPageAllAWR;
//                     scope.total=scope.totalAllAWR;
//                 break;
//
//                 case "Select Second AWR":
//                     scope.secondAWRlist = datos;
//                    
//                    // $scope.allAWR.shift(); 
//                     //$scope.$broadcast('allAWR', {allAWR: $scope.allAWR});
//                    //  alert(JSON.stringify($scope.allAWR));
//                     scope.sortKey = "SNAP_ID"; 
//                     scope.currentPageAllAWR=1;
//                     scope.itemsPerPageAllAWR=10;
//                     scope.totalAllAWR=scope.allAWR.length;
//                     scope.currentPage=sessionStorage.currentPageAllAWR;
//                     scope.itemsPerPage=scope.itemsPerPageAllAWR;
//                     scope.total=scope.totalAllAWR;
//                 break;
//             
//                 case "Select the source work":
//                     scope.allWorkGpsql = datos;
//                     scope.allWorkGpsql.shift(); 
//                    alert("work de origen");
//                     scope.sortKey = "SNAP_ID"; 
//                     scope.currentPageallWorkGpsql=1;
//                     scope.itemsPerPageallWorkGpsql=10;
//                     scope.totalallWorkGpsql=scope.allWorkGpsql.length;
//                     scope.currentPage=sessionStorage.currentPageallWorkGpsql;
//                     scope.itemsPerPage=scope.itemsPerPageallWorkGpsql;
//                     scope.total=scope.totalallWorkGpsql;
//                 break;
//                 
//                case "Select STS":
//                     scope.allSTS = datos;
//                    
//                     scope.allSTS.shift(); 
//                    
//                     scope.sortKey = "BDID"; 
//                     scope.currentPageAllSTS=1;
//                     scope.itemsPerPageAllSTS=10;
//                     scope.totalAllSTS=scope.allSTS.length;
//                     scope.currentPage=sessionStorage.currentPageAllSTS;
//                     scope.itemsPerPage=scope.itemsPerPageAllSTS;
//                     scope.total=scope.totalAllSTS;
//                 break;
//                  
                 default:
                     scope.currentPage=1;
                     scope.itemsPerPage=10;
                     scope.total=scope.Results.length;
             }
                             
                        scope.numvalues = [3,5,10,20,50];  
                        
                        scope.maxRange = (scope.currentPage * scope.itemsPerPage);
                        scope.minRange = (scope.maxRange-scope.itemsPerPage)+1;
                        if(scope.total < scope.maxRange){
                                scope.maxRange = scope.total;
                        }
                            
                        scope.refreshItemsPerPage = function(new_value){
                            scope.itemsPerPage = new_value;
                           // $scope.currentPage = 1;
                        };
                             
                          scope.setRange= function(currentPage){
                            scope.currentPage = currentPage;
                                if(scope.page==="Home"){
                                    sessionStorage.currentPageHome=scope.currentPage;
                                }else if(scope.page === "Works"){
                                    sessionStorage.currentPageWorks=scope.currentPage;
                                }else if(scope.page==="Querys"){
                                    sessionStorage.currentPageQuerys=scope.currentPage;
                                }else if(scope.page === "Query Details"){
                                    sessionStorage.currentPageQuerysDetails=scope.currentPage;
                                }else if(scope.page==="Snapshots"){
                                    sessionStorage.currentPageSnapshots=scope.currentPage;
                                }else if(scope.page === "Snapshots Parameters"){
                                    sessionStorage.currentPageParameters=scope.currentPage;
                                }else if(scope.page === "Snapshots Execution"){
                                    sessionStorage.currentPageExecution=scope.currentPage;
                                   // scope.currentPageExecutions = scope.currentPage;
                                }else if(scope.page === "Select First AWR"){
                                    sessionStorage.currentPageAllAWR=scope.currentPage;
                                }else if(scope.page === "Select the source work"){
                                    sessionStorage.currentPageworkGpsql=scope.currentPage;
                                }
                            
                           // sessionStorage.currentPage = $scope.currentPage;
                            scope.maxRange = (scope.currentPage * scope.itemsPerPage);
                            scope.minRange = (scope.maxRange-scope.itemsPerPage)+1;
                            if(scope.total < scope.maxRange){
                                scope.maxRange = scope.total;
                            }
                        };  //fin de setrange 
        }; //fin de generatetable
        
     return {
         getTable: getTable,
         generateTable: generateTable
    };    
        
 });

angular.module('app').service('busService', [function () {
        
    var current = "llama a busService";
/*
    var pages = [{
        index: 1,
        title: 'Home',
        helpText: 'In this page you will have a quick access  to the Works, snapshots, querys and reports.'
    },
    {
        index: 2,
        title: 'Works',
        helpText: 'Here you will seen a list of all the Works.  You should créate a work to save the results of operations that you make, for example snapshots, querys and the capture of the sames.'
    },
    {
        index: 3,
        title: 'Works Details',
        helpText: 'helptext de Works Details'
    },
    {
        index: 4,
        title: 'Snapshots',
        helpText: 'Here you seen all the captured snapshots of work. A snapshot represent the state of the database in a moment at the time.'
    },  {
        index: 5,
        title: 'Snapshots Details',
        helpText: 'helptext de Snapshots Details'
    },
    {
        index: 6,
        title: 'Querys',
        helpText: 'In this page you will seen the details of the captured querie0s as the time ejecution, the ejecution plan and the code SQL.'
    },  {
        index: 7,
        title: 'Querys Details',
        helpText: 'helptext de Querys Details'
    },  {
        index: 8,
        title: 'Method of Capture',
        helpText: "Here you will capture the querys and snapshots of the database from distinct methods." +
                   '- AWR: This option of Oracle capture the querys from Memory\n'+
                   '- Memory: This Method capture queries and snapshots from memory\n'+
                   '- STS: This option capture the querys from STS. Is a exclusive Method from Oracle databases \n'+
                   '- GPSQL: From this Method you will save the results of a work about other new or existent\n'+
                   '- Trace: Here upload a file traze you will capture your results in the work.'
        
    },  {
        index: 9,
        title: 'Select First AWR',
        helpText: 'Select the first awr you want to compare so you can continue.'
        
    },{
        index: 10,
        title: 'Select Second AWR',
        helpText: 'Select the second awr you want to compare so you can continue.'
        
    },{
        index: 11,
        title: 'Database Connect',
        helpText:'You need connect to database to continue.'
        
    },{
        index: 12,
        title: 'Filters',
        helpText: 'In this page you can filter the results.'
        
    },{
        index: 13,
        title: 'Save snapshot',
        helpText: 'Select a created snapshots to save the capture'
        
    },{
        index: 14,
        title: 'Resume capture',
        helpText: 'In this page,you can see your selected options and back to previous steps to changhe this values. Press the ?Capture? button to start the capture.'
        
    },{
        index: 15,
        title: 'New Snapshot',
        helpText: 'Set the name of your new snapshot to save the capture.'
        
    },{
        index: 16,
        title: 'Select STS',
        helpText: 'Select STS you want capture.'
        
    },{
        index: 17,
        title: 'Select the source work',
        helpText: 'Select work you want capture.'
        
    },{
        index: 18,
        title: 'Select a snapshot',
        helpText:'Select snapshot you want capture.'
    },{
        index: 19,
        title: 'Select the destination work',
        helpText: 'Select the work where you want to save the capture.'
    },{
        index: 20,
        title: 'Reports',
        helpText: 'In this page you will compare and export the results of different snapshots'
    },{
        index: 22,
        title: 'Upload file trace',
        helpText: 'Upload the trace file to capture your results'
    },{
        index: 23,
        title: 'Snapshot',
        helpText: 'Select a created snapshots or create new to save the results.'
    }
   
];
*/
    return {
        /*
        getPages: function () {
            return pages;
        },
        getAllPages: function () {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i].index === current) {
                    return [pages[i]];
                    break;
                }
            }
        },
        getPage: function (page) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i].index === page) {
                    return [pages[i]];
                    break;
                }
            }
        },        
        */
        setCurrent: function (page) {
            current = page;
        },
        getCurrent: function () {
            return current;
        }
    };
}]);