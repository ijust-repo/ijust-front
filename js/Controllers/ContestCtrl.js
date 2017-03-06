var ContestCtrl = function ($scope , mtNotifyService , $stateParams , $location , UserModel,
                                ContestModel , TeamModel , $rootScope) {

    $rootScope.notifyLoader = true;
    $scope.pendingTeamsNumber = 0 ;
    $rootScope.contestId = $stateParams.contestId ;
    $rootScope.contestInfo = {} ;
    $scope.isShowPendingLoading = false ;
    $scope.successJoinTeam = false ;
    $scope.rejectJoinTeam = false ;

    // user states on the contest
    $rootScope.isJoined = 0 ;
    $rootScope.isOwner = false ;
    $rootScope.isAdmin = false ;
    $rootScope.isNew = false ;
    $rootScope.problemShow = false ;

    // to join
    $scope.myTeams = [];
    $scope.pendingTeams={};
    $scope.showSuccessJoinMsg = false ;
    $scope.showErrorJoinMsg = false ;

    var infoPath = "/contest/"+$rootScope.contestId+"/info";
    $location.path(infoPath);

    UserModel.getMyInfo(function (data, status) {
        if(status){
            $rootScope.userInfo = data ;
        }
    });

    ContestModel.getContestInfoById($rootScope.contestId , function (data, status) {
        if (status){
            console.log(data);
            $rootScope.contestInfo = data ;
            $rootScope.isOwner = data.is_owner ;
            $rootScope.isAdmin = data.is_admin ;
            $rootScope.isJoined = data.joining_status.status;
            $rootScope.notifyLoader = false;
            $('.thisContest').removeClass('loading');
        }
    });

    TeamModel.getMyTeams(function (data, status) {
        if(status){
            $rootScope.myTeams=data.owner_teams;
            console.log($rootScope.myTeams)
        }
    });

    ContestModel.getPendingTeams($rootScope.contestId,function (data, status) {
        if (status){
            $scope.pendingTeams=data.pending_teams;
            $scope.pendingTeamsNumber = $scope.pendingTeams.length;
            console.log(data);
        }
    });

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
    
};

ijust.controller('ContestCtrl' , ContestCtrl);