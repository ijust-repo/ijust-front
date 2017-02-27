var ContestCtrl = function ($scope , mtNotifyService , $stateParams , Temp ,
                                ContestModel , UserModel , TeamModel , $rootScope) {

    $rootScope.notifyLoader = true;

    $scope.contestName = $stateParams.contestName ;
    Temp.contestName = $stateParams.contestName ;
    $scope.contestInfo = {} ;
    $scope.isShowPendingLoading = false ;

    $scope.successJoinTeam = false ;
    $scope.rejectJoinTeam = false ;

    // user states on the contest
    $scope.isJoined = false ;
    $scope.isOwner = false ;
    $scope.isNew = false ;
    
    //by default
    Temp.userState = "new" ;

    // to join
    $scope.myTeams = {};
    $scope.showSuccessJoinMsg = false ;
    $scope.showErrorJoinMsg = false ;

    ContestModel.getContestInfoByName($scope.contestName , function (data , status) {
        if(status){
            $scope.contestInfo = data ;
            $scope.contestId = data.id ;
            Temp.contestId = data.id ;
            $rootScope.contestId = $scope.contestId ;
            UserModel.getUserProfile(function (data , status) {
                if(status){
                    $scope.username = data.username ;
                    $scope.userId = data.id ;
                    Temp.userId = data.id ;
                    $rootScope.userId=data.id ;
                    UserModel.getUserTeams($scope.userId , function (data , status) {
                        $scope.myTeams = data.teams ;
                        for (var i=0 ; i < data.teams.length ; i++ ){
                            for(var j=0 ; j<data.teams[i].contests.length ; j++){
                                Temp.joinedContests.push(data.teams[i].contests[j].name) ;
                                if (data.teams[i].contests[j].name == $scope.contestName){
                                    // $scope.teamName = data.teams[i].name ;
                                    $scope.teamId = data.teams[i].id ;
                                }
                            }
                        }
                        if($.inArray(Temp.contestName, Temp.joinedContests) > -1){
                            $scope.isJoined = true ;
                            Temp.userState = "joined" ;
                        }
                    });
                    if($scope.contestInfo.owner.username == $scope.username){
                        Temp.userState = "owner";
                        $scope.teamId = 'dudeAdmin' ;
                        ContestModel.getPendingTeams($scope.contestId , function (data , status) {
                            if(status){
                                $scope.pendingTeamsNumber = data.teams.length ;
                                $scope.isOwner = true ;
                                $scope.pendingTeams = data.teams ;
                                $rootScope.notifyLoader = false;
                            }
                            else {
                                $rootScope.notifyLoader = false;
                            }
                        });
                    }
                    else {
                        $rootScope.notifyLoader = false;
                    }
                }
            });
            $scope.join = function (teamName) {
                var JSON = {
                    contest_id : $scope.contestId ,
                    team_name : teamName
                };
                TeamModel.joinRequest(JSON , function (data , status) {
                    if(status){
                        $scope.showSuccessJoinMsg = true ;
                        $scope.showErrorJoinMsg = false ;
                        $scope.successJoinMsg = "Your Join Request is Pending , wait for Contest's Admin to Accept."
                    }
                    else{
                        $scope.showErrorJoinMsg = true ;
                        $scope.showSuccessJoinMsg = false ;
                        $scope.errorJoinMsg = data.errors ;
                    }
                } )
            };
            // $('.thisContest').removeClass('loading');
        }
        else{
            //nth
        }
    });

    $scope.acceptJoinRequest = function (teamId) {
        // $scope.isShowPendingLoading= true ;
        $rootScope.notifyLoader = true ;
        ContestModel.acceptOrRejectJoinRequest( $rootScope.contestId, teamId , ({ "acceptation" : true }) , function (data , status) {
            if(status){
                ContestModel.getPendingTeams($rootScope.contestId , function (data , status) {
                    if(status){
                        $scope.pendingTeamsNumber = data.teams.length ;
                        $scope.isShowTeamButton = true ;
                        $scope.pendingTeams = data.teams ;
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
        ContestModel.acceptOrRejectJoinRequest( $rootScope.contestId, teamId , ({ "acceptation" : false }) , function (data , status) {
            if(status){
                ContestModel.getPendingTeams($rootScope.contestId , function (data , status) {
                    if(status){
                        $scope.pendingTeamsNumber = data.teams.length ;
                        $scope.isShowTeamButton = true ;
                        $scope.pendingTeams = data.teams ;
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

    // $('.teamDropDown').click(function () {
        $('.ui.dropdown')
            .dropdown()
        ;
    // })
    
};

ijust.controller('ContestCtrl' , ContestCtrl);