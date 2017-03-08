var addProblemCtrl = function ($scope, $rootScope, ContestModel , Constants) {
    $scope.show = 'create';
    $scope.problemInfo = {};
    $scope.buttonLoader = false;
    $scope.problemId = 0;
    $scope.showProblemCreateError = true;
    $scope.createProblem = function () {
        $scope.buttonLoader = true;
        ContestModel.createProblem($rootScope.contestId, $scope.problemInfo, function (data, status) {
            if (status) {
                $scope.buttonLoader = false;
                $rootScope.problemsInfo.problems[$rootScope.problemsInfo.length] = data;
                $scope.problemId = data.id;
                $scope.show = 'body';
                $('.create').removeClass('active');
                $('.create').addClass('completed');
                $('.body').addClass('active');
            }
            else {
                $scope.showProblemCreateError = true;
                $scope.problemCreateError = data.error;
            }
        })
    };

    $scope.uploadBody = function (file, errFiles) {
        $scope.buttonLoader = true;
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            console.log(file);
            file.upload = Upload.upload({
                method: "POST",
                url: Constants.server + Constants.version + 'contest/' + $rootScope.contestId + '/problem/' + $scope.problemId ,
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    $scope.buttonLoader = false;
                }, 500);
            }, function (response) {
                if (response.status >= 400)
                    $scope.errorMsg = response.status + ': ' + response.data;
                else if (response.status==200){
                    
                }
            });
            file.upload();
        }
    };

    // $scope.uploadBody = function () {
    //     $scope.buttonLoader = true;
    //     ContestModel.problemUploadBody($rootScope.contestId, $scope.problemId, function (data, statsu) {
    //
    //     })
    // }
};

ijust.controller('addProblemCtrl', addProblemCtrl);