var ProblemCtrl = function ($scope , $rootScope , Temp , ContestModel , UserModel , $stateParams , Constants , Upload , $timeout , $state) {

    $scope.contestId = $stateParams.contestId;
    $scope.teamId = $stateParams.teamId;
    $scope.problemId = $stateParams.problemId;
    $scope.fileTypes = ['cpp' , 'py' , 'java'];
    $scope.fileType = "";
    $scope.fileAsString = "";
    var fuckingFileType = [];

    $rootScope.notifyLoader = true;

    $scope.isJoined = true;
    $scope.isOwner = false;
    $scope.isNew = false;
    $scope.isShowTeamButton = false;
    $scope.isShowPendingLoading = false;

    $scope.problemInfo = {} ;
    $scope.isCompile = false ;
    $scope.isEdit = false ;

    $scope.showSubmitError = true ;
    $scope.submitError = '';

    ContestModel.getContestInfoById($scope.contestId, function (data, status) {
        if (status) {
            $scope.contestInfo = data;
            $scope.contestName = data.name;
            UserModel.getUserProfile(function (data, status) {
                if (status) {
                    $scope.username = data.username;
                    $scope.userId = data.id;
                    UserModel.getUserTeams($scope.userId , function (data , status) {
                        $scope.myTeams = data.teams ;
                        for (var i=0 ; i < data.teams.length ; i++ ){
                            for(var j=0 ; j<data.teams[i].contests.length ; j++){
                                Temp.joinedContests.push(data.teams[i].contests[j].name) ;
                                if (data.teams[i].contests[j].name == $scope.contestName){
                                    if(data.teams[i].contests[j].status == 'accepted'){
                                        // $scope.teamName = data.teams[i].name ;
                                        $scope.teamId = data.teams[i].id ;
                                        Temp.teamName = data.teams[i].name ;
                                        $scope.isJoined = true ;
                                        Temp.userState = "joined" ;
                                    }
                                }
                            }
                        }
                    });
                    if ($scope.contestInfo.owner.username == $scope.username) {
                        $scope.isShowTeamButton = true;
                        $scope.isOwner = true;
                        // alert($scope.isOwner);
                        ContestModel.getPendingTeams($scope.contestId, function (data, status) {
                            if (status) {
                                $scope.pendingTeamsNumber = data.teams.length;
                                $scope.pendingTeams = data.teams;
                            }
                            else {
                                //nth
                            }
                        });
                    }
                }
            });
        }
        else {
            //nth
        }
    });

    ContestModel.getProblemInfo($scope.contestId, $scope.teamId, $scope.problemId , function (data, status) {
        if (status) {
            // console.log(data);
            $scope.problemInfo = data ;
            $rootScope.notifyLoader = false;
        }
        else {
            //nth
        }
    });

    $scope.acceptJoinRequest = function (teamId) {
        // $scope.isShowPendingLoading= true ;
        $rootScope.notifyLoader = true;
        ContestModel.acceptOrRejectJoinRequest($rootScope.contestId, teamId, ({"acceptation": true}), function (data, status) {
            if (status) {
                ContestModel.getPendingTeams($rootScope.contestId, function (data, status) {
                    if (status) {
                        $scope.pendingTeamsNumber = data.teams.length;
                        $scope.isShowTeamButton = true;
                        $scope.pendingTeams = data.teams;
                    }
                    else {
                        //nth
                    }
                });
                // $scope.isShowPendingLoading = false ;
                $rootScope.notifyLoader = false;
            }
        });
    };

    $scope.rejectJoinRequest = function (teamId) {
        $scope.isShowPendingLoading = true;
        ContestModel.acceptOrRejectJoinRequest($rootScope.contestId, teamId, ({"acceptation": false}), function (data, status) {
            if (status) {
                ContestModel.getPendingTeams($rootScope.contestId, function (data, status) {
                    if (status) {
                        $scope.pendingTeamsNumber = data.teams.length;
                        $scope.isShowTeamButton = true;
                        $scope.pendingTeams = data.teams;
                    }
                    else {
                        //nth
                    }
                });
                $scope.isShowPendingLoading = false;
            }
        });
    };

    $('.teamButton').on('click', function () {
        $('.ui.pendingTeams.modal')
            .modal('show')
        ;
    });

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

    $scope.getFileType = function (ft) {
        fuckingFileType[0]=ft ;
    };

    $scope.upload = function(){
        var f = document.getElementById('file').files[0],
            r = new FileReader();
        r.onloadend = function(e){
            var data = e.target.result;
            $scope.fileAsString = data ;
            // console.log(data);
            //send your binary data via $http or $resource or do anything else with it
            // console.log($scope.contestId , $scope.teamId ,
            //     $scope.problemId , fuckingFileType[0] ,
            //     $scope.fileAsString);
            ContestModel.submitProblem($scope.contestId , $scope.teamId ,
                                        $scope.problemId , fuckingFileType[0] ,
                                        $scope.fileAsString , function (data , status)
            {
                if(status){
                    // console.log(data);
                    $scope.isCompile = true ;
                    $timeout(function(){
                        // $rootScope.notifyLoader = false;
                        // $state.go('submitted({contestName : contestName})')
                    }, 3000);
                }
                else{
                    $scope.showSubmitError = true ;
                    $scope.submitError = data.errors ;
                }
            })
        };
        r.readAsBinaryString(f);
    };

    $('.ui.dropdown')
        .dropdown()
    ;


};

ijust.controller('ProblemCtrl' , ProblemCtrl);