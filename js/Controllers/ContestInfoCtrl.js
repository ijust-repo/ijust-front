var ContestInfoCtrl = function ($scope, mtNotifyService, $stateParams,
                                ContestModel, TeamModel, $rootScope , $localStorage) {

    $rootScope.notifyLoader = true;
    // user states on the contest
    $rootScope.isJoined = 0 ;
    $rootScope.isOwner = false ;
    $rootScope.isAdmin = false ;
    $rootScope.myTeam = [];
    $rootScope.myTeams = $localStorage.myTeams ;
    ContestModel.getContestInfoById($rootScope.contestId , function (data, status) {
        if (status){
            console.log(data);
            $rootScope.contestInfo = data ;
            $rootScope.isOwner = data.is_owner ;
            $rootScope.isAdmin = data.is_admin ;
            $rootScope.isJoined = data.joining_status.status;
            $rootScope.myTeam = data.joining_status.team;
            $rootScope.notifyLoader = false;
        }
    });

    $scope.join = function (teamId) {
        // $('#joinBtn').addClass('loading');
        var JSON = {
            team_id: teamId
        };
        console.log(JSON);
        ContestModel.teamJoin($rootScope.contestId ,JSON, function (data, status) {
            if (status) {
                $scope.showSuccessJoinMsg = true;
                $scope.showErrorJoinMsg = false;
                // $rootScope.contestInfo.joining_status.status = 1 ;
                $rootScope.isJoined = 1 ;
                $rootScope.myTeam.id=teamId;
                // $scope.successJoinMsg = "Your Join Request is Pending , wait for Contest's Admin to Accept.";
                // $('#joinBtn').removeClass('loading');
            }
            else {
                $scope.showErrorJoinMsg = true;
                $scope.showSuccessJoinMsg = false;
                $scope.errorJoinMsg = data.error;
                $('#joinBtn').removeClass('loading');
            }
        })
    };

    $scope.cancel = function () {
        $('#cancelBtn').addClass('loading');
        ContestModel.teamUnJoin($rootScope.contestId ,$rootScope.myTeam.id, function (data, status) {
            if (status){
                $rootScope.contestInfo.joining_status.status = 0 ;
                $rootScope.isJoined = 0 ;
                $rootScope.myTeam = [];
                $('#cancelBtn').removeClass('loading');
            }
            else {
                $('#cancelBtn').removeClass('loading');
            }
        })
    };

    $('#cancelBtn').on('click',function () {
        $('.ui.basic.modal')
            .modal('show')
        ;
    });

    $('.ui.dropdown')
        .dropdown();
};

ijust.controller('ContestInfoCtrl', ContestInfoCtrl);