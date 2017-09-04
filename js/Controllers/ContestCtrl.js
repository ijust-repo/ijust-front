var ContestCtrl = function ($scope , mtNotifyService , $stateParams , $location , UserModel,
                                ContestModel , TeamModel , $rootScope , $interval) {

    $rootScope.notifyLoader = true;
    $scope.pendingTeamsNumber = 0 ;
    $rootScope.contestId = $stateParams.contestId ;
    $rootScope.contestInfo = {} ;
    $scope.isShowPendingLoading = false ;
    $scope.successJoinTeam = false ;
    $scope.rejectJoinTeam = false ;

    // to join
    $rootScope.myTeams = [];
    $scope.pendingTeams={};
    $scope.showSuccessJoinMsg = false ;
    $scope.showErrorJoinMsg = false ;

    var infoPath = "/contest/"+$rootScope.contestId+"/info";
    $location.path(infoPath);

    try {
        ContestModel.getPendingTeams($rootScope.contestId,function (data, status) {
            if (status){
                $scope.pendingTeams=data.pending_teams;
                $scope.pendingTeamsNumber = $scope.pendingTeams.length;
                console.log(data);
            }
        });
    }
    catch (e){
        // console.log(e);
    }

    $scope.acceptJoinRequest = function (teamId) {
        // $scope.isShowPendingLoading= true ;
        $rootScope.notifyLoader = true ;
        ContestModel.teamAccept( $rootScope.contestId, teamId ,  function (data , status) {
            if(status){
                ContestModel.getPendingTeams($rootScope.contestId , function (data , status) {
                    if(status){
                        $scope.pendingTeams=data.pending_teams;
                        $scope.pendingTeamsNumber = $scope.pendingTeams.length;
                        $scope.isShowTeamButton = true ;
                        $scope.successJoinTeam = true ;
                        $scope.rejectJoinTeam = false ;
                    }
                    else {
                        //nth
                    }
                });
                alert("refresh pending");
                // ContestModel.getAcceptedTeams($rootScope.contestId,function (data , status) {
                //     if (status){
                //         $scope.joinedTeams = data.accepted_teams;
                //         $scope.joinedTeamsNumber = $scope.joinedTeams.length;
                //         $scope.joinedCnt = $scope.joinedTeams.length;
                //         $rootScope.notifyLoader = false ;
                //     }
                // });

                // $scope.isShowPendingLoading = false ;
                $rootScope.notifyLoader = false ;
            }
        });
    };

    $scope.rejectJoinRequest = function (teamId) {
        $scope.isShowPendingLoading= true ;
        ContestModel.teamReject( $rootScope.contestId, teamId  , function (data , status) {
            if(status){
                ContestModel.getPendingTeams($rootScope.contestId , function (data , status) {
                    if(status){
                        $scope.pendingTeams=data.pending_teams;
                        $scope.pendingTeamsNumber = $scope.pendingTeams.length;
                        $scope.isShowTeamButton = true ;
                        $scope.successJoinTeam = false ;
                        $scope.rejectJoinTeam = true ;
                    }
                    else {
                        //nth
                    }
                });
                $scope.isShowPendingLoading = false ;
            }
        });
    };

    $('.teamButton').on('click',function () {
        $('.ui.pendingTeams.modal')
            .modal('show')
        ;
    });

    function makeTime(t){
        var hours   = Math.floor(t / 3600);
        var minutes = Math.floor((t - (hours * 3600)) / 60);
        var seconds = t - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        $rootScope.timer.time = hours+':'+minutes+':'+seconds;
    }

    // countdown Interval
    $scope.myInterval = $interval(function () {
        $rootScope.timer = {
            time : "",
            status : ""
        };
        var now = Date.parse(new Date())/1000 ;
        if($rootScope.contestInfo.starts_at > now){
            var t = $rootScope.contestInfo.starts_at - now;
            makeTime(t);
            $rootScope.timer.status = 'to start' ;
        }
        else if (($rootScope.contestInfo.starts_at <= now)&&(now < $rootScope.contestInfo.ends_at)){
            var tt = $rootScope.contestInfo.ends_at - now;
            makeTime(tt);
            $rootScope.timer.status = 'to end' ;
        }
        else {
            $rootScope.timer.status += 'Ended' ;
        }
    }, 1000);
    
};

ijust.controller('ContestCtrl' , ContestCtrl);