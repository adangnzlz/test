angular.module('app').controller("LoginCtrl", function($rootScope,busService,$scope,vertxEventBusService,$state,actionData,$stateParams,VertxBus){

       // $scope.logout = logout;
        //console.log($stateParams.logout);
        
        if($stateParams.logout === true){
            console.log("si es logout");
            location.reload();
        }else{
            console.log("no es logout");
        }
        
    $scope.cargaRepo = function(){
        console.log("llama a cargaRepo en LoginController");
    };
   // $scope.vertxRepoMessage = {};
   //VertxBus.getAllRepo($scope);
   VertxBus.getAllRepos();
  
   
  
//     $rootScope.$on('repos', function(ev, args) {
//         $scope.repos = args.repos;
//         
////                        $scope.repos = args.repos;
////                        
////                        if($scope.repos.length > 0){
////                               $scope.repos.shift();
////                        
////                        }
//    console.log('los repos valen en LoginController dentro del on',$scope.repos);
//                     });
//                    
//                            console.log('los repos valen en LoginController',$scope.repos);
//    VertxBus.getAllRepo(function (reply) {
//        $scope.vertxRepoMessage = reply;
//        // might need $scope.$apply() here
//    });
    
    //$scope.paramOne = $stateParams.logout;
   // $ocLazyLoad.load('/static/js/controllers/HomeController.js');


       //FUNCION PARA CAMBIAR DE PESTAÑAS EN EL LOGIN   
    $(function() {
    console.log("llama a la funcion para cambiar las pestañas");
               console.log("entra en login");
        
        $scope.logado = false;
  
  $( '.tabs' ).on( 'click', 'li a', function(e){
    e.preventDefault();
    var $tab = $( this ),
         href = $tab.attr( 'href' );    
  
     $( '.active' ).removeClass( 'active' );
     $tab.addClass( 'active' );
  
     $( '.show' )
        .removeClass( 'show' )
        .addClass( 'hide' )
        .hide();
    
      $(href)
        .removeClass( 'hide' )
        .addClass( 'show' )
        .hide()
        .fadeIn( 550 );
  });
  
});
    
        $scope.selected = "";
               
        $scope.setRepo = function(selectedRepo){
            sessionStorage.repo = selectedRepo;
             console.log("sessionStorage.repo: "+sessionStorage.repo);
        };
        
//        $scope.deleteRepoBtn = function(){
//            console.log("entra en deleteRepoBtn");
//            seePopup('DeleteRepo',sessionStorage.repo);
//        };
        
        if($scope.AddRepo === "Add repository"){
                $scope.seePopup('NewRepo','');
            }
            $scope.login2=false;
            //$scope.refreshPage("Login");
            $scope.page = "Login";
            $scope.info="Connecting with server...";
            $scope.HaveResults = false;
            $scope.Results = "";
            $scope.SnapshotsResults="";
         //   console.log("entra en login");
            $scope.no_logado = true;
            $scope.logado = false;
            $scope.valor="Back";
           /*document.getElementById("user").value ="";
            document.getElementById("password").value ="";*/
            sessionStorage.clear();

            $scope.changeValue=function(valor){
                $scope.valor=valor;
                /* if(valor==="Back"){
                    alert($scope.selectedRepo);
                    //sessionStorage.repo = $scope.selectedRepo;
                    alert("sessionStorage.repo :"+sessionStorage.repo);
                    $scope.clasesCssFormulario.animated=true;
                    $scope.clasesCssFormulario.bounceOutLeft=true;
                   } else{
                     $scope.clasesCssFormulario.animated=true;
                     $scope.clasesCssFormulario.bounceOutLeft=true;
                     } */          
            }; 
            
          //  vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'select_all'});
           
           // console.log("sesion: "+sessionStorage.idSesion);
            //console.log("messageRepository: "+messageRepository);
           // console.log(('repository_actions', {VERTX_ACTION: 'select_all'}));
           
          /* $scope.nombreRepo = function(){
                $scope.pass = document.getElementById('user');
                $scope.pass.setAttribute('value','datosRepo.USER_NAME');  
                $scope.selectRepo = document.getElementById('selectRepo');
                if(selectRepo.value==='Select Repository'){
                    
                }
            };*/
            /*
            $scope.quitarAsteriscos = function(){
                console.log("llama a quitarasteriscos del logincontroller");
                $scope.pass = document.getElementById('passwordLogin');
                $scope.pass.setAttribute('placeholder','');   
            };
            */
             //LOGIN             
$scope.login = function(){
console.log("llama al login en LoginController");
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
        $state.go("Home",{});
       
        vertxEventBusService.send('work_actions', {VERTX_ACTION: "select_all", ID_SES:sessionStorage.idSesion, ID_CON:  actionData.setIdCon().toString()});
    }
    console.log("logado: "+$scope.logado);
    //$scope.changeClass();
};

             //FUCION CAMBIAREPO
                        $scope.cambiaRepo = function (selectedRepo){
                                 console.log("llama a cambiaRepo y selectedrepo vale en cambiarepo del logincontroller" + JSON.stringify(selectedRepo));
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
                                                 $('#selectedRepo option:contains(' + $scope.repos[key].CONNECTION_NAME + ')').prop({selected: true});
                                                }
                                                
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
                                                    vertxEventBusService.send('repository_actions', {VERTX_ACTION:"select_repo_data",REPO_NAME:$scope.selectedRepoName });
                                                }
                                            }
                                            
                                            
                                       });
                                      // alert("al final del each selectedrepo vale " + JSON.stringify($scope.selectedRepo)); 
                            };

});