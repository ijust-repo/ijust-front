var ProblemCtrl = function ($scope , $rootScope , Temp , ContestModel , SubmissionModel
    , $stateParams , Constants , Upload , $timeout , $state) {

    $scope.problemId = $stateParams.problemId;
    $scope.fileTypeList = ['c++' ,'c++11','python 2.x','python 3.x','java8'];
    $scope.fileTypes = {
        'c++' : 0,
        'c++11' : 1,
        'python 2.x' : 2,
        'python 3.x' : 3,
        'java' : 4
    };
    $scope.fileType = "";
    $scope.fileAsString = "";
    $scope.buttonLoader = false;
    $scope.problemInfo = {} ;
    $scope.isCompile = false ;
    $scope.isEdit = false ;
    $scope.bodyUrl = '';
    $scope.showSubmitError = true ;
    $scope.submitError = '';

    ContestModel.getProblemInfo($rootScope.contestId, $scope.problemId , function (data, status) {
        if (status) {
            console.log(data);
            $scope.problemInfo = data ;
            $rootScope.notifyLoader = false;
        }
        else {
            //nth
        }
    });

    $scope.upload = function (file, errFiles) {
        $scope.buttonLoader = true;
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            console.log(file);
            file.upload = Upload.upload({
                method: "POST",
                url: Constants.server + Constants.version + 'submission' ,
                data: {
                    contest_id:$rootScope.contestId ,
                    problem_id:$scope.problemId,
                    team_id:$rootScope.myTeam.id,
                    prog_lang:$scope.prog_lang,
                    code:file
                    }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    $scope.buttonLoader = false;
                    $scope.isCompile=true;
                    if (response.status >= 400)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    else if (response.status==200){
                        $('.test').removeClass('active');
                        $('.test').addClass('completed');
                        var infoPath = "/contest/"+$rootScope.contestId+"/problems";
                        $location.path(infoPath);
                    }
                }, 500);
            });
        }
    };

    $scope.getFileType = function (ft) {
        $scope.prog_lang=$scope.fileTypes[ft] ;
    };

    $scope.bodyUrl = 'https://ijust.ir/static/' + $scope.problemId + '.pdf';
    // ContestModel.problemDownloadBody($rootScope.contestId, $scope.problemId , function (data, status) {
    //     if (status) {
    //         console.log(data);
    //         $scope.problemInfo.body = data ;
    //         $rootScope.notifyLoader = false;
    //     }
    //     else {
    //         //nth
    //     }
    // });

    // $scope.uploadFiles = function (file, errFiles) {
    //     $scope.f = file;
    //     // mtNotifyService.load();
    //     $scope.errFile = errFiles && errFiles[0];
    //     if (file) {
    //         console.log(file);
            // file.upload = Upload.upload({
            //     // method: "PUT",
            //     // url: Constants.server + Constants.version + "user/avatar",
            //     data: {file: file}
            // });
            //
            // file.upload.then(function (response) {
            //     var _imgUrl = $rootScope.imageUrl;
            //     $timeout(function () {
            //         $rootScope.imageUrl = _imgUrl + '?' + new Date().getTime();
            //         file.result = response.data;
            //         // mtNotifyService.unLoad();
            //     }, 500);
            // }, function (response) {
            //     if (response.status > 0)
            //         $scope.errorMsg = response.status + ': ' + response.data;
            // }, function (evt) {
            //     file.progress = Math.min(100, parseInt(100.0 *
            //         evt.loaded / evt.total));
            // });
            // file.upload();
    //     }
    // };
    //
    //
    // $scope.upload = function(){
    //     var f = document.getElementById('file').files[0],
    //         r = new FileReader();
    //     r.onloadend = function(e){
    //         var data = e.target.result;
    //         $scope.fileAsString = data ;
    //         // console.log(data);
    //         //send your binary data via $http or $resource or do anything else with it
    //         // console.log($scope.contestId , $scope.teamId ,
    //         //     $scope.problemId , fuckingFileType[0] ,
    //         //     $scope.fileAsString);
    //         ContestModel.submitProblem($scope.contestId , $scope.teamId ,
    //                                     $scope.problemId , fuckingFileType[0] ,
    //                                     $scope.fileAsString , function (data , status)
    //         {
    //             if(status){
    //                 // console.log(data);
    //                 $scope.isCompile = true ;
    //                 $timeout(function(){
    //                     // $rootScope.notifyLoader = false;
    //                     // $state.go('submitted({contestName : contestName})')
    //                 }, 3000);
    //             }
    //             else{
    //                 $scope.showSubmitError = true ;
    //                 $scope.submitError = data.errors ;
    //             }
    //         })
    //     };
    //     r.readAsBinaryString(f);
    // };

    $('.ui.dropdown')
        .dropdown()
    ;


};

ijust.controller('ProblemCtrl' , ProblemCtrl);