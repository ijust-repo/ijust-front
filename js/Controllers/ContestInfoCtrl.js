var ContestInfoCtrl = function ($scope, mtNotifyService, $stateParams, $interval,
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
            $rootScope.timer = {
                time : "",
                status : ""
            };
        }
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
            $rootScope.timer.status += 'ended' ;
        }
    }, 1000);

    // to Destroy Interval
    $scope.$on('$destroy', function () {
        $interval.cancel($scope.myInterval);
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