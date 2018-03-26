// app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
   angular.module('app').config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
    if(typeof(Storage) !== "undefined") {
        
      
    } else {
        alert("This browser not support this application. Please, update your browser or open this application with other browser.");
        // Sorry! No Web Storage support..
    }
    /*
    $stateProvider.state('Login', {
    url: '/login',
    controllerProvider: function ($stateParams) {
      return $stateParams.name;
    },
    templateUrl: function($stateParams) {
      return $stateParams.name + ".html";
    }
  });
  */

        $stateProvider.state('Login', {
          url: '/login',  // root route
         // templateUrl: '/templates/LoginTemplate_1.html',
          templateUrl: '/index2.html',
      //    cache: false,
           params: {
            logout: null
            } /*,
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
              // you can lazy load files for an existing module
                return $ocLazyLoad.load('/static/js/controllers/LoginController.js');
               // return $ocLazyLoad.load(['/static/js/controllers/LoginController.js', '/static/js/controllers/RepoController.js']);
                
            }] 
          }  */
         
         , controller: 'LoginCtrl'
        });
       
        $stateProvider.state('Home', {
          url: '/home',  // root route
          templateUrl: '/templates/HomeTemplate.html',
          controller: 'HomeCtrl',
        //  cache: false //,
          resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             //  you can lazy load files for an existing module
              //return $ocLazyLoad.load('/static/js/controllers/HomeController.js');      
              return $ocLazyLoad.load(['/static/js/controllers/HomeController.js', '/static/js/controllers/WorksController.js']);
            }]
          }
        });

         $stateProvider.state('Works', {
            url: '/works',   
            templateUrl: '/templates/WorksTemplate.html',
            controller: 'WorksCtrl',
            cache: false,
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/js/controllers/WorksController.js');
                }]
            }
         });
            
         $stateProvider.state('WorksDetails', {
            url: '/works/:SelectedWorkName',   
            templateUrl: '/templates/WorksDetailsTemplate.html',
            controller: 'WorksDetailsCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/js/controllers/WorksDetailsCtrl.js');
                }]
            }
         });            

         $stateProvider.state('Querys', {
            url: '/works/:SelectedWorkName/Queries',   
            templateUrl: '/templates/QuerysTemplate.html',
            controller: 'QuerysCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/js/controllers/QuerysController.js');
                }]
            }
        });
        
        $stateProvider.state('QueryDetails', {
            url: '/works/:SelectedWorkName/Querys/details/:idQuery',   
            templateUrl: '/templates/QuerysDetailsTemplate.html',
            controller: 'QueryDetailsCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/js/controllers/QueryDetailsController.js');
                }]
            }
        });
        
        $stateProvider.state('Capture', {
            url: '/works/:SelectedWorkName/capture',   
            templateUrl: '/templates/CaptureTemplate.html',
            controller: 'CaptureCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/js/controllers/CaptureController.js');
                }]
            }
        });
		
		$stateProvider.state('Replay', {
            url: '/works/:SelectedWorkName/replay',   
            templateUrl: '/templates/ReplayTemplate.html',
            controller: 'ReplayCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/js/controllers/ReplayController.js');
                }]
            }
        });
        
        $stateProvider.state('CaptureAWR', {
            url: '/works/:SelectedWorkName/capture/awr',   
            templateUrl: '/templates/AWRTemplate.html',
            controller: 'AWRCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/js/controllers/AWRController.js');
                }]
            }
        }); 
        
        $stateProvider.state('CaptureMemory', {
            url: '/works/:SelectedWorkName/capture/memory',   
            templateUrl: '/templates/CaptureMemoryTemplate.html',
            controller: 'CaptureMemoryCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/js/controllers/CaptureMemoryCtrl.js');
                }]
            }
        });
        
        $stateProvider.state('CaptureSTS', {
            url: '/works/:SelectedWorkName/capture/sts',   
            templateUrl: '/templates/STSTemplate.html',
            controller: 'STSCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/js/controllers/STSController.js');
                }]
            }
        });  

        $stateProvider.state('CaptureGPSQL', {
            url: '/works/:SelectedWorkName/capture/gpsql',   
            templateUrl: '/templates/CaptureGPSQLTemplate.html',
            controller: 'CaptureGPSQLCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/js/controllers/CaptureGPSQLCtrl.js');
                }]
            }
        }); 
        
        /*$stateProvider.state('Filters', {
            url: '/filters',   
            templateUrl: '/templates/filtersTemplate.html',
            controller: 'CaptureCtrl'
        });   */
        

        $stateProvider.state('CaptureTrace', {
            url: '/works/:SelectedWorkName/capture/trace',   
            templateUrl: '/templates/CaptureTraceTemplate.html',
            controller: 'CaptureTraceCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/js/controllers/CaptureTraceCtrl.js');
                }]
            }
        });   
        
       $stateProvider.state('Filters', {
            url: '/works/:SelectedWorkName/capture/filters',   
            templateUrl: '/templates/filtersTemplate.html',
            controller: 'CaptureCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/js/controllers/CaptureController.js');
                }]
            }
        });   
        
//        $stateProvider.state('bgDetailsTemplate', {
//            url: '/works/:SelectedWorkName/Querys/details/:idQuery',   
//            templateUrl: '/templates/bgDetailsTemplate.html',
//            controller: 'bgDetailsCtrl'
//        });
         
        $stateProvider.state('Snapshots', {
            url: '/works/:SelectedWorkName/Snapshots',  
            templateUrl: '/templates/SnapshotsTemplate.html',
            controller: 'SnapshotsCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/js/controllers/SnapshotsController.js');
                }]
            }
        });
        
        $stateProvider.state('SnapshotsDetails', {
            //url: '/works/:SelectedWorkName/Snapshots/SnapshotsDetails/:idSnapshot',   
            url: '/works/:SelectedWorkName/Snapshots/details/:idSnapshot',   
            templateUrl: '/templates/SnapshotsDetailsTemplate.html',
            controller: 'SnapshotsDetailsCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/js/controllers/SnapshotsDetailsCtrl.js');
                }]
            }   
        });
     /*        
        $stateProvider.state('SnapshotsParameters', {
            //url: '/works/:SelectedWorkName/Snapshots/SnapshotsDetails/:idSnapshot',   
            url: '/works/:SelectedWorkName/Snapshots/details/:idSnapshot/Parameters',   
            templateUrl: '/templates/SnapshotsDetailsTemplate.html',
            controller: 'SnapshotsDetailsCtrl',
          //  controller: 'SnapshotsParametersCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load('/static/js/controllers/SnapshotsDetailsCtrl.js');     
            //    return $ocLazyLoad.load('/static/js/controllers/SnapshotsParametersController.js');
                }]
            }   
        });     
      
          $stateProvider.state('SnapshotsExecutions', {
            //url: '/works/:SelectedWorkName/Snapshots/SnapshotsDetails/:idSnapshot',   
            url: '/works/:SelectedWorkName/Snapshots/details/:idSnapshot/Execution',   
            templateUrl: '/templates/SnapshotsDetailsTemplate.html',
            controller: 'SnapshotsDetailsCtrl',
          //  controller: 'SnapshotsExecutionsCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                           return $ocLazyLoad.load('/static/js/controllers/SnapshotsDetailsCtrl.js');
             //   return $ocLazyLoad.load('/static/js/controllers/SnapshotsExecutionsController.js');
                }]
            }   
        }); 
    */
        $stateProvider.state('Reports', {
            url: '/works/Reports/',   
            templateUrl: '/templates/ReportsTemplate.html',
            controller: 'ReportsCtrl',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                //return $ocLazyLoad.load('/static/js/controllers/ReportsController.js');
           //       <script src="/static/js/libs/Chart.min.js"></script>
         //<script src="/static/js/libs/angular-chart.min.js"></script> 
                return $ocLazyLoad.load(['/static/js/controllers/ReportsController.js', '/static/js/controllers/PieController.js', '/static/js/controllers/LineController.js']);              
                }]
            }
        });
         
    $urlRouterProvider.otherwise('/login');
    
});