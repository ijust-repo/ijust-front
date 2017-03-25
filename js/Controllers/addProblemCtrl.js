var addProblemCtrl = function ($scope, $rootScope, ContestModel , Constants,Upload,$timeout,$location) {
    $scope.show = 'create';
    $scope.problemInfo = {};
    $scope.buttonLoader = false;
    $scope.problemId = 0;
    $scope.showProblemCreateError = false;
    $scope.createProblem = function () {
        $scope.buttonLoader = true;
        ContestModel.createProblem($rootScope.contestId, $scope.problemInfo, function (data, status) {
            if (status) {
                $scope.buttonLoader = false;
                $rootScope.problemsInfo.push(data);
                $scope.problemId = data.id;
                $scope.show = 'body';
                if($rootScope.problemsInfo.length!=0){
                    $rootScope.showProblemsEmptyError = false;
                }
                $('.create').removeClass('active').addClass('completed');
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
            var formData = new FormData();
            // formData.append("body",file ,'fileName');
            formData = [
                {
                    body:file
                }
            ] ;
            console.log(formData);
            file.upload = Upload.upload({
                method: "POST",
                url: Constants.server + Constants.version + 'contest/' + $rootScope.contestId + '/problem/' + $scope.problemId +'/body',
                data: {body:file}
            });

            file.upload.then(function (response) {
                console.log(response);
                $timeout(function () {
                    file.result = response.data;
                    $scope.buttonLoader = false;
                    if (response.status >= 400)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    else if (response.status==200){
                        $('.body').removeClass('active').addClass('completed');
                        $('.test').addClass('active');
                        $scope.show = 'test';
                    }
                }, 500);
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
                data: {testcase:file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    $scope.buttonLoader = false;
                    if (response.status >= 400)
                        $scope.errorMsg = response.status + ': ' + response.data;
                    else if (response.status==200){
                        $('.test').removeClass('active').addClass('completed');
                        var infoPath = "/contest/"+$rootScope.contestId+"/problems";
                        $location.path(infoPath);
                    }
                }, 500);
            });
        }
    };

};

ijust.controller('addProblemCtrl', addProblemCtrl);