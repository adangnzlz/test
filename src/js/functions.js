$(document).ready(function(){
    
//                $('#disconnectTemplate').modal({
//                    show:true,
//                    backdrop: 'static',
//                    keyboard: false  // to prevent closing with Esc button (if you want this too)
//                });
//$('#disconnectTemplate').on('shown', function () {
//  //$("body").css("overflow", "hidden");
//  alert("esta abierto el popup");
//});
//
//$('#disconnectTemplate').on('hidden', function () {
//  //$("body").css("overflow", "visible");
//  alert("NO esta abierto el popup");
//});

    $('#firstSnapshotToCsv').click(function(){

        var data = $('#txt').val();
        if(data == '')
            return;
        
        JSONToCSVConvertor(data, "Snapshot 1", true);
    });

        $('#secondSnapshotToCsv').click(function(){
        var data = $('#txt').val();
        if(data == '')
            return;
        
        JSONToCSVConvertor(data, "Snapshot 2", true);
    });
  
});

/*
$("#formuploadajax").on("submit", function(e){
    e.preventDefault();
    var f = $(this);
    
    var formData = new FormData(document.getElementById("formuploadajax"));
});
*/
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "Informe_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function uniqueID(){
  function chr4(){
    return Math.random().toString(16).slice(-4);
  }
  return chr4() + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() + chr4() + chr4();
};

$(function () {
    $('.nav-tabs a').tab('show');
    $('.nav-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
});

//QUITA LOS ESPACIOS EN BLANCO AL FINAL
    function myTrim(x) {
                    return x.replace(/^\s+|\s+$/gm,'');
                };
                
    function vacio(q) {

        for ( i = 0; i < q.length; i++ ) {
                if ( q.charAt(i) !== " " ) {
                        return true;

                }
        }
        return false;
    };


    function cerrarVentana($scope,ngDialog,$timeout){ 
       console.log("llama a cerrarventana");
                                      $timeout(function() { 

                                       var windowIDs = ngDialog.getOpenDialogs(); 
                                       ngDialog.close(windowIDs[1]);
                                       $scope.Resultado="";
                                       $scope.Error="";
                                  }, 2000);
    };

function setError(error,message,$scope,ngDialog,$timeout){

    $scope.Progress = false;
    $scope.seetError = true;
    
                      if(error==="NO"){
                          console.log("error vale NO: "+error+" y message vale "+ message);
                          $scope.$broadcast('error', {error: message});                         
                          cerrarVentana($scope,ngDialog,$timeout);
                          $scope.seetError = true;
                      }
                      else{
                          console.log("hay un error:" + error);
                         $scope.$broadcast('error', {error: error});
                      }

};

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function validaVacio(page,action,new_name,new_description,$scope){
                if(page==="Works"){
                        if(vacio(new_name) === false ) {
                                $scope.Progress = false;  
                                $scope.Error = "The name is required";
                         } 
                         else if(vacio(new_description) === false ) {
                                $scope.Progress = false;  
                                $scope.Error = "The description is required";
                         }
                         else{
                             if(action==="edit"){
                                 validaCambios(page,action,new_name,new_description,$scope);
                             }
                             if(action==="add"){
								 console.log("Valida tamano");
								if(new_name.length > 30){
									console.log("Mas de 30");
									$scope.Progress = false;  
									$scope.Error="Work name too long (max 30)";
								}else{
									if(new_description.length > 1000){
										$scope.Progress = false;  
										$scope.Error="Work description too long (max 1000)";
									}else{
										validaDuplicados(page,action,new_name,new_description,$scope);
									}
								} 
                             }
                         }
                }
                if(page==="Snapshots" || page==="New Snapshot AWR"){
                         if(vacio(new_description) === false ) {
                                $scope.Progress = false;  
                                $scope.Error = "The Snapshot description is required";
                         }
                         else{
                             if(action==="edit"){
                                     validaCambios(page,action,new_name,new_description,$scope);
                             }
                             if(action==="add"){
                                 console.log("Page: "+page+" Action: "+action+" new name: "+new_name+" new_description: "+new_description);
                                 validaDuplicados(page,action,new_name,new_description,$scope);
                             }
                         }
                }
               /* if(page==="New Snapshot AWR"){
                         if(vacio(new_description) === false ) {
                                $scope.Progress = false;  
                                $scope.Error = "The Snapshot description is required";
                         }
                         else{
                             if(action==="edit"){
                                     validaCambios(page,action,new_name,new_description,$scope);
                             }
                             if(action==="add"){
                                 validaDuplicados(page,action,new_name,new_description,$scope);
                             }
                         }
                }*/


};
function validaCambios(page,action,new_name,new_description,$scope){ 
                if(page==="Works"){
                    original_name = $scope.data.WORK_NAME;
                    original_description = $scope.data.WORK_DESCRIPTION;
                }
                if(page==="Snapshots" || page==="New Snapshot AWR"){
                    original_name = "";
                    original_description = $scope.data.SNAPSHOT_DESCRIPTION;
                }
               /* if(page==="New Snapshot AWR"){
                    original_name = "";
                    original_description = $scope.data.SNAPSHOT_DESCRIPTION;
                }*/
               if(page==="Works"){
						console.log("Valida tamano");
                        if(new_name.length > 30){
							console.log("Mas de 30");
                            $scope.Error="Work name too long (max 30)";
                        }
                        if(new_description.length > 1000){
                            $scope.Error="Work description too long (max 1000)";
                        }
                        if(new_name === original_name)
                        {
                            $scope.Progress = false;
                            //si no se ha cambiado el nombre
                            if(new_description===original_description){

                                $scope.Error="No changes detected";
                            }
                             if(new_description !==original_description){
                                    $scope.WorkEditOK=true;
                            }
                        }
                            if(new_name !== original_name){
                                //SI se ha cambiado el nombre
                                $scope.Progress = false;
                                validaDuplicados(page,action,new_name,new_description,$scope);

                            }
                }
               if(page==="Snapshots" || page==="New Snapshot AWR"){
                    
                $scope.Progress = false;
                    if(new_description===original_description){ 
                        $scope.Error="No changes detected";
                    }
                     if(new_description !==original_description){

                        validaDuplicados(page,action,new_name,new_description,$scope);
                    }
                } 
                
                /*if(page==="New Snapshot AWR"){ 
                    $scope.Progress = false;
                    if(new_description===original_description){ 
                        $scope.Error="No changes detected";
                    }
                     if(new_description !==original_description){
                        validaDuplicados(page,action,new_name,new_description,$scope);
                    }
                }  */

};

function validaDuplicados(page,action,new_name,new_description,$scope){
   // alert($scope.noWorks);
        if(page==="Works"){
            if($scope.noWorks!==true){
                var busqueda = JSON.search($scope.WorksResults, '//*[WORK_NAME="'+new_name+'"]' );
            }
            else{
                $scope.WorkAddOK=true;
            }
        }
        if(page==="Snapshots" || page==="New Snapshot AWR"){
            console.log("$scope.SnapshotsResults: "+$scope.SnapshotsResults);
			if ($scope.SnapshotsResults === undefined || $scope.SnapshotsResults === null) {
				var busqueda = "";
				 var totalReg = 0;
			}else{
				var busqueda = JSON.search($scope.SnapshotsResults, '//*[SNAPSHOT_DESCRIPTION="'+new_description+'"]' );
				var totalReg = Object.keys(busqueda).length;
			}
            //var busqueda = JSON.search($scope.SnapshotsResults, '//*[SNAPSHOT_DESCRIPTION="'+new_description+'"]' );
            console.log("Busqueda: "+busqueda);
        }
        
      /*  if(page==="New Snapshot AWR"){
            var busqueda = JSON.search($scope.SnapshotsResults, '//*[SNAPSHOT_DESCRIPTION="'+new_description+'"]' );
        }*/
        
        if($scope.noWorks!==true){
        var totalReg = Object.keys(busqueda).length;
        
        if(totalReg===0){
            
            if(action==="add"){
                if(page==="Works"){
                    $scope.WorkAddOK=true;
                }
                 if(page==="Snapshots" || page==="New Snapshot AWR"){
                    $scope.SnapshotAddOK=true;
                }               
                
            }
            if(action==="edit"){
                if(page==="Works"){
                    $scope.WorkEditOK=true;
                }
                 if(page==="Snapshots"){
                    $scope.SnapshotEditOK=true;
                }      
                
            }            
        }
        if(totalReg>0){
            if(page==="Works"){
                $scope.Progress = false;
                $scope.Error = "Duplicated Work";
            }
            if(page==="Snapshots" || page==="New Snapshot AWR"){
                $scope.Progress = false;
                $scope.Error = "Duplicated Snapshot";
            }
            
        }
    }
};



function isInt(n) {
   return n % 1 === 0;
}
