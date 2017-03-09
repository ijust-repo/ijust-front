var ContestInfoCtrl = function ($scope, mtNotifyService, $stateParams,
                                ContestModel, TeamModel, $rootScope) {

    // user states on the contest
    $rootScope.isJoined = 0 ;
    $rootScope.isOwner = false ;
    $rootScope.isAdmin = false ;
    $rootScope.myTeam = {};
    ContestModel.getContestInfoById($rootScope.contestId , function (data, status) {
        if (status){
            console.log(data);
            $rootScope.contestInfo = data ;
            $rootScope.isOwner = data.is_owner ;
            $rootScope.isAdmin = data.is_admin ;
            $rootScope.isJoined = data.joining_status.status;
            $rootScope.myTeam = data.joining_status.team;
            $rootScope.notifyLoader = false;
            $('.thisContest').removeClass('loading');
        }
    });

    $scope.join = function (teamId) {
        var JSON = {
            team_id: teamId
        };
        console.log(JSON);
        ContestModel.teamJoin($rootScope.contestId ,JSON, function (data, status) {
            if (status) {
                $scope.showSuccessJoinMsg = true;
                $scope.showErrorJoinMsg = false;
                $scope.successJoinMsg = "Your Join Request is Pending , wait for Contest's Admin to Accept."
            }
            else {
                $scope.showErrorJoinMsg = true;
                $scope.showSuccessJoinMsg = false;
                $scope.errorJoinMsg = data.error;
            }
        })
    };

    $('.ui.dropdown')
        .dropdown();
};

ijust.controller('ContestInfoCtrl', ContestInfoCtrl);