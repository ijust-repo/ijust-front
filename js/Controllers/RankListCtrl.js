var RankListCtrl = function ($scope , ContestModel , UserModel , $stateParams , $rootScope , Temp) {
    $rootScope.notifyLoader = true;
    $scope.contestName = $stateParams.contestName ;
    $scope.contestInfo = {} ;
    $scope.isShowTeamButton = false ;
    $scope.isShowPendingLoading = false ;
    $scope.rankList = {} ;
    $scope.problemNumbers = [];

    $('.problemListButton').remove('active');

    ContestModel.getContestInfoByName($scope.contestName , function (data , status) {
        if(status){
            $scope.contestInfo = data ;
            $scope.contestId = data.id ;
            $rootScope.contestId = $scope.contestId ;
            UserModel.getUserProfile(function (data , status) {
                if(status){
                    $scope.username = data.username ;
                    $scope.userId = data.id ;
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
                    if($scope.contestInfo.owner.username == $scope.username){
                        $scope.isOwner = true ;
                        $scope.teamId = 'dudeAdmin' ;
                        ContestModel.getPendingTeams($scope.contestId , function (data , status) {
                            if(status){
                                $scope.pendingTeamsNumber = data.teams.length ;
                                $scope.isShowTeamButton = true ;
                                $scope.pendingTeams = data.teams ;
                                $rootScope.notifyLoader = false;
                            }
                            else {
                                //nth
                            }
                        });
                    }
                    else {
                        $rootScope.notifyLoader = false;
                    }
                }
            });
            $('.thisContest').removeClass('loading');
            ContestModel.getRankList($rootScope.contestId , function (data , status) {
                if(status){
                    // console.log(data);
                    $scope.rankList = data.teams;
                    for(var i=0; i<data.problem_num ; i++){
                        $scope.problemNumbers[i] = i+1 ;
                    }
                    for( i=0 ; i<data.teams.length ; i++){
                        var teamIndex = $scope.rankList[i];
                        if(data.teams[i].team.name == Temp.teamName){
                            $scope.myTeamObj = data.teams[i] ;
                        }
                        var lenghteKharKosde = teamIndex.problems_list.length;
                        for( var j=0 ; j<lenghteKharKosde ; j++ ) {
                            var order = teamIndex.problems_list[j].order ;
                            if ( order != j+1 ){
                                teamIndex.problems_list[order-1]=$scope.rankList[i].problems_list[j];
                                delete $scope.rankList[i].problems_list[j];
                            }
                        }
                        console.log($scope.myTeamObj)
                    }

                    $scope.getProblemsList=function (araye) {
                        for(var i=0 ; i<araye.length ; i++){
                            if(araye[i] == undefined){
                                araye[i]=({
                                    failed_tries:0 ,
                                    failed_tries_reason:"no tries to accept" ,
                                    order:null ,
                                    problem_id:null ,
                                    solved: "unknown" ,
                                    solved_on : "null"
                                })
                            }
                        }
                        return araye ;
                    };
                }
            });
        }
        else{
            //nth
        }
    });
    $scope.mapToString = function (num) {
        switch (num) {
            case 1 : return 'A' ;
                break;
            case 2 : return 'B' ;
                break;
            case 3 : return 'C' ;
                break ;
            case 4 : return 'D' ;
                break ;
            case 5 : return 'E' ;
                break;
            case 6 : return 'F' ;
                break ;
            case 7 : return 'G' ;
                break ;
            case 8 : return 'H' ;
                break;
            default : return num ;
        }
    };

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

ijust.controller('RankListCtrl' , RankListCtrl);