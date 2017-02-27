var ProblemsCtrl = function ($scope, $rootScope, ContestModel, UserModel, $stateParams , Temp) {

    $scope.contestId = $stateParams.contestId;
    // $scope.teamName = $stateParams.teamName;
    $scope.teamId = $stateParams.teamId;

    $rootScope.notifyLoader = true;

    $scope.isJoined = true;
    $scope.isOwner = false;
    $scope.isNew = false;
    $scope.isShowTeamButton = false;
    $scope.isShowPendingLoading = false;

    $scope.problemsInfo = {} ;

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
                                    // $scope.teamName = data.teams[i].name ;
                                    $scope.teamId = data.teams[i].id ;
                                    Temp.teamName = data.teams[i].name ;
                                    $scope.isJoined = true ;
                                    Temp.userState = "joined" ;
                                }
                            }
                        }
                        if($.inArray(Temp.contestName, Temp.joinedContests) > -1){
                            $scope.isJoined = true ;
                            Temp.userState = "joined" ;
                        }
                    });
                    if ($scope.contestInfo.owner.username == $scope.username) {
                        $scope.isShowTeamButton = true;
                        $scope.isOwner = true;
                        $scope.teamId = 'dudeAdmin';
                        // alert($scope.isOwner);
                        ContestModel.getPendingTeams($scope.contestId, function (data, status) {
                            if (status) {
                                $scope.pendingTeamsNumber = data.teams.length;
                                $scope.pendingTeams = data.teams;
                                $rootScope.notifyLoader = false;
                            }
                            else {
                                //nth
                            }
                        });
                    }
                    UserModel.getUserTeams($scope.userId, function (data, status) {
                        $scope.myTeams = data.teams;
                        $rootScope.notifyLoader = false;
                    });
                }
            });
        }
        else {
            //nth
        }
    });

    ContestModel.getAllProblems($scope.contestId, $scope.teamId, function (data, status) {
        if (status) {
            $scope.problemsInfo = data.problems ;
        }
        else {
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
};

ijust.controller("ProblemsCtrl", ProblemsCtrl);