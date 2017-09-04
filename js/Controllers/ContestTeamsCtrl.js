var ContestTeamsCtrl = function ($scope , $rootScope,ContestModel, $timeout) {
    $rootScope.notifyLoader = true ;
    $scope.joinedTeams = {} ;
    $scope.joinedCnt = 0 ;
    try {
        ContestModel.getAcceptedTeams($rootScope.contestId,function (data , status) {
            if (status){
                $scope.joinedTeams = data.accepted_teams;
                $scope.joinedTeamsNumber = $scope.joinedTeams.length;
                $scope.joinedCnt = $scope.joinedTeams.length;
                $rootScope.notifyLoader = false ;
            }
        });
    }
    catch (e){}
    $scope.remove = function (teamId) {
       ContestModel.teamKick($rootScope.contestId , teamId,function (data , status) {
           if (status){
               $scope.kickTeam = true;
               ContestModel.getAcceptedTeams($rootScope.contestId,function (data , status) {
                   if (status){
                       $scope.joinedTeams = data.accepted_teams;
                       $scope.joinedTeamsNumber = $scope.joinedTeams.length;
                       $scope.joinedCnt = $scope.joinedTeams.length;
                       $rootScope.notifyLoader = false ;
                   }
               });
               $timeout(function() { $scope.kickTeam = false;}, 1000);
           }else {
              //do something
           }
       })
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
                        $timeout(function() { $scope.successJoinTeam = false;}, 1000);
                        $scope.rejectJoinTeam = false ;
                    }
                    else {
                        //nth
                    }
                });

                ContestModel.getAcceptedTeams($rootScope.contestId,function (data , status) {
                    if (status){
                        $scope.joinedTeams = data.accepted_teams;
                        $scope.joinedTeamsNumber = $scope.joinedTeams.length;
                        $scope.joinedCnt = $scope.joinedTeams.length;
                        $rootScope.notifyLoader = false ;
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

};

ijust.controller('ContestTeamsCtrl',ContestTeamsCtrl);