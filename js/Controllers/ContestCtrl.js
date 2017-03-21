var ContestCtrl = function ($scope , mtNotifyService , $stateParams , $location , UserModel,
                                ContestModel , TeamModel , $rootScope) {

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