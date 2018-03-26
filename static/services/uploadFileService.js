app.factory('uploadManager', function ($rootScope) {
    var _files = [];
    return {
        add: function (file) {
            console.log("fileAdded manager");
            _files.push(file);
            $rootScope.$broadcast('fileAdded', file.files[0].name);
        },
        clear: function () {
            console.log("clear manager");
            _files = [];
        },
        files: function () {
            console.log("fileNames manager");
            var fileNames = [];
            $.each(_files, function (index, file) {
                fileNames.push(file.files[0].name);
                console.log("fileNames: "+file.files[0].name);
            });
            
           // this.add(fileNames[0]);
            return fileNames;
            
        },
        upload: function () {
            console.log("uploadManager");
            $.each(_files, function (index, file) {
                file.submit();
                console.log("uploadManager file: "+file);
            });
         this.files();
        
        },
        setProgress: function (percentage) {
            console.log("uploadProgress Manager");
            $rootScope.$broadcast('uploadProgress', percentage);
        }
    };
    
});