var ProblemCtrl = function ($scope, $rootScope, Temp, ContestModel, SubmissionModel
    , $stateParams, Constants, Upload, $timeout, $anchorScroll, $location) {

    $scope.fileName = undefined;
    $scope.submitError = false;

        $location.hash('problem');
        $anchorScroll();

    if ($scope.problemId) {
        delete $scope.problemId;
    }
    $scope.problemId = $stateParams.problemId;
    $scope.fileTypeList = ['c++', 'c++ 11', 'python 2.x', 'python 3.x', 'java 8'];
    $scope.fileTypes = {
        'c++': 0,
        'c++ 11': 1,
        'python 2.x': 2,
        'python 3.x': 3,
        'java 8': 4
    };
    $scope.fileType = "";
    $scope.fileAsString = "";
    $scope.buttonLoader = false;
    $scope.problemInfo = {};
    $scope.isCompile = false;
    $scope.isEdit = false;
    $scope.bodyUrl = '';
    $scope.showSubmitError = true;
    $scope.submitError = false;
    $scope.errorMsg = '';

    ContestModel.getProblemInfo($rootScope.contestId, $scope.problemId, function (data, status) {
        if (status) {
            console.log(data);
            $scope.problemInfo = data;
            $rootScope.notifyLoader = false;
            $('.problem').removeClass('loading');
        }
        else {
            //nth
        }
    });

    $scope.upload = function (file, errFiles) {
        $scope.f = file;
        $scope.fileName = file.name;
        $scope.errFile = errFiles && errFiles[0];
    };

    $scope.submit = function () {
        $scope.buttonLoader = true;
        if ($scope.f  && $scope.prog_lang != undefined) {
            console.log({
                contest_id: $rootScope.contestId,
                problem_id: $scope.problemId,
                team_id: $rootScope.myTeam.id,
                prog_lang: $scope.prog_lang,
                code: $scope.f
            });
            if ($rootScope.myTeam.id) {
                $scope.f.upload = Upload.upload({
                    method: "POST",
                    url: Constants.server + Constants.version + 'submission',
                    data: {
                        contest_id: $rootScope.contestId,
                        problem_id: $scope.problemId,
                        team_id: $rootScope.myTeam.id,
                        prog_lang: $scope.prog_lang,
                        code: $scope.f
                    }
                });
            }
            else {
                $scope.f.upload = Upload.upload({
                    method: "POST",
                    url: Constants.server + Constants.version + 'submission',
                    data: {
                        contest_id: $rootScope.contestId,
                        problem_id: $scope.problemId,
                        prog_lang: $scope.prog_lang,
                        code: $scope.f
                    }
                });
            }
            $scope.f.upload.then(function (response) {
                    $timeout(function () {
                        $scope.f.result = response.data;
                        $scope.buttonLoader = false;
                        $location.hash('submitMsg');
                        $anchorScroll();
                        $scope.isCompile = true;
                        $scope.submitError = false;
                    }, 500);
                },
                function (response) {
                    $scope.f
                        .result = response.data;
                    $scope.buttonLoader = false;
                    switch (response.status){
                        case 400:
                            $scope.errorMsg = 'Bad request';
                            break;
                        case 401:
                            $scope.errorMsg = 'Token is invalid or has expired';
                            break;
                        case 403:
                            $scope.errorMsg = "You aren't owner or member of the team Or You aren't owner or admin of the contest";
                            break;
                        case 404:
                            $scope.errorMsg = 'Contest or problem does not exist';
                            break;
                        case 406:
                            $scope.errorMsg = 'Contest has not started or has been finished Or You have too many pending submissions';
                            break;
                        case 413:
                            $scope.errorMsg = 'Request entity too large. (max size is 16M)';
                            break;
                        case 415:
                            $scope.errorMsg = 'Supported file type is only text/plain';
                            break;
                        default :
                            $scope.errorMsg = 'Unknown Error!Type error';
                    }
                    $scope.submitError = true;
                    $scope.isCompile = false;

                }
            );
        }
        else {
            $scope.errorMsg = 'no file or language selected';
            $scope.submitError = true;
            $scope.buttonLoader = false;
        }
    };

    $scope.getFileType = function (ft) {
        $scope.prog_lang = $scope.fileTypes[ft];
    };

    ContestModel.problemDownloadBody($rootScope.contestId, $scope.problemId, function (data, status) {
        if (status) {
            $("#problem_body").attr('src', "data:application/pdf;base64," + data);
            $rootScope.notifyLoader = false;
        }
        else {
            //nth
        }
    });

    $('.ui.dropdown')
        .dropdown()
    ;

};

ijust.controller('ProblemCtrl', ProblemCtrl);