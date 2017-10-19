var addProblemCtrl = function ($scope, $rootScope, ContestModel, Constants, Upload, $timeout, $location) {
    $scope.show = 'create';
    $scope.problemInfo = {};
    $scope.buttonLoader = false;
    $scope.problemId = 0;
    $scope.showProblemCreateError = false;
    $scope.showUploadBodyError = false;
    $scope.showUploadTestCaseError = false;
    document.title = "Add Problem";
    $scope.createProblem = function () {
        $scope.buttonLoader = true;
        ContestModel.createProblem($rootScope.contestId, $scope.problemInfo, function (data, status) {
            if (status) {
                $scope.buttonLoader = false;
                $rootScope.problemsInfo.push(data);
                $scope.problemId = data.id;
                $scope.show = 'body';
                if ($rootScope.problemsInfo.length != 0) {
                    $rootScope.showProblemsEmptyError = false;
                }
                $('.create').removeClass('active').addClass('completed');
                $('.body').addClass('active');
            }
            else {
                $scope.buttonLoader = false;
                $scope.showProblemCreateError = true;
                $scope.problemCreateError = data;
            }
        })
    };

    $scope.uploadBody = function (file, errFiles) {
        $scope.buttonLoader = true;
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            console.log(file);
            var formData = new FormData();
            // formData.append("body",file ,'fileName');
            formData = [
                {
                    body: file
                }
            ];
            console.log(formData);
            file.upload = Upload.upload({
                method: "POST",
                url: Constants.server + Constants.version + 'contest/' + $rootScope.contestId + '/problem/' + $scope.problemId + '/body',
                data: {body: file}
            });

            file.upload.then(function (response) {
                console.log(response);
                $timeout(function () {
                    file.result = response.data;
                    $scope.buttonLoader = false;
                    if (response.status >= 400)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    else if (response.status == 200) {
                        $('.body').removeClass('active').addClass('completed');
                        $('.test').addClass('active');
                        $scope.show = 'test';
                    }
                }, 500);
            }, function (response) {
                console.log(response);
                $scope.buttonLoader = false;
                switch (response.status){
                    case 400:
                        $scope.uploadBodyError = 'Bad request';
                        break;
                    case 401:
                        $scope.uploadBodyError = 'Token is invalid or has expired';
                        break;
                    case 403:
                        $scope.uploadBodyError = "You aren't owner or admin of the contest";
                        break;
                    case 404:
                        $scope.uploadBodyError = 'Contest or problem does not exist';
                        break;
                    case 413:
                        $scope.uploadBodyError = 'Request entity too large. (max size is 16M)';
                        break;
                    case 415:
                        $scope.uploadBodyError = 'Supported file type is only application/pdf';
                        break;
                    default :
                        $scope.uploadBodyError = 'Unknown Error!Type error';
                }
                $scope.showUploadBodyError = true;
            });
            // file.upload();
        }
    };

    $scope.uploadTestCase = function (file, errFiles) {
        $scope.buttonLoader = true;
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            console.log(file);
            file.upload = Upload.upload({
                method: "POST",
                url: Constants.server + Constants.version + 'contest/' + $rootScope.contestId + '/problem/' + $scope.problemId + '/testcase',
                data: {testcase: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    $scope.buttonLoader = false;
                    if (response.status >= 400)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    else if (response.status == 200) {
                        $timeout(function() {
                            $scope.showUploadProblemSuccess = false;
                            var infoPath = "/contest/" + $rootScope.contestId + "/problems";
                            $location.path(infoPath);
                        }, 1500);
                        $scope.showUploadProblemSuccess = true;
                        $('.test').removeClass('active').addClass('completed');

                    }
                }, 500);
            },function (response) {
                $scope.buttonLoader = false;
                switch (response.status){
                    case 400:
                        $scope.uploadTestCaseError = 'Bad request';
                        break;
                    case 401:
                        $scope.uploadTestCaseError = 'Token is invalid or has expired';
                        break;
                    case 403:
                        $scope.uploadTestCaseError = "You aren't owner or admin of the contest";
                        break;
                    case 404:
                        $scope.uploadTestCaseError = 'Contest or problem does not exist';
                        break;
                    case 413:
                        $scope.uploadTestCaseError = 'Request entity too large. (max size is 16M)';
                        break;
                    case 415:
                        $scope.uploadTestCaseError = 'Supported file type is only application/zip';
                        break;
                    default :
                        $scope.uploadTestCaseError = 'Unknown Error!Type error';
                }
                $scope.showUploadTestCaseError = true;
            });
        }
    };

};

ijust.controller('addProblemCtrl', addProblemCtrl);