'use strict';

/* Services */
/*
angular.module('app').factory('VertxBus', ['vertxEventBusService',function(vertxEventBusService){
            var fact = {};
                     
            fact.getAllRepo = function(){
                // call send and pass it the callback function
                vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'select_all'});
                  
            };
            
            return fact;
    }]);
*/

angular.module('app').service('VertxBus', ['vertxEventBusService',function(vertxEventBusService){
        console.log('entra en el servicio');
            var repos = {};

       
        
        var getAllRepos = function(){
            //return repos;
            console.log('entra en getallrepos');
            vertxEventBusService.send('repository_actions', {VERTX_ACTION: 'select_all'});
        };
        
        var getRepos = function(){
            console.log('entra en getrepos');   
            return repos;
        }; 
                               
        //return fact;
        return {
            getAllRepos: getAllRepos,
            getRepos: getRepos
          };
    }]);