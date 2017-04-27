var ContestInfoCtrl = function ($scope, mtNotifyService, $stateParams,
                                ContestModel, TeamModel, $rootScope , $localStorage) {

    $rootScope.notifyLoader = true;
    // user states on the contest
    $rootScope.isJoined = 0 ;
    $rootScope.isOwner = false ;
    $rootScope.isAdmin = false ;
    $rootScope.isEnded = false ;
    $scope.isEdit = false;
    $rootScope.myTeam = {};
    $rootScope.myTeams = $localStorage.myTeams ;
    $scope.showDeleteModal = false ;
    ContestModel.getContestInfoById($rootScope.contestId , function (data, status) {
        if (status){
            console.log(data);
            $rootScope.contestInfo = data ;
            $rootScope.isOwner = data.is_owner ;
            $rootScope.isAdmin = data.is_admin ;
            $rootScope.isEnded = data.is_ended ;
            $rootScope.isJoined = data.joining_status.status;
            if($rootScope.isOwner||$rootScope.isAdmin){
                $rootScope.myTeam.id = null ;
                $rootScope.notifyLoader = false;
            }
            else{
                $rootScope.myTeam = data.joining_status.team;
                $rootScope.notifyLoader = false;
            }
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
                $rootScope.isJoined = 1 ;
                $rootScope.myTeam.id=teamId;
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