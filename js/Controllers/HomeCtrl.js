var HomeCtrl = function ( $scope , mtNotifyService , ContestModel , TeamModel , $rootScope , $localStorage ) {

    $rootScope.notifyLoader = true ;
    $scope.allContetsEmptyError = false;
    $scope.ownedContetsEmptyError = false;
    $scope.adminContetsEmptyError = false;
    $rootScope.teamsEmptyError = false;
    $scope.ownedContets = {} ;
    $scope.adminContets = {} ;
    $scope.contestsList = {} ;
    // $rootScope.myTeams = [] ;
    $rootScope.myTeams = [];
    $localStorage.myTeams = [] ;
    document.title = "Home";
    TeamModel.getMyTeams(function (data, status) {
        if (status){
            $rootScope.myTeams=$.merge(data.member_teams,data.owner_teams); // jQuery function ( should be solved somehow better )
            if ($rootScope.myTeams.length==0){
                $rootScope.teamsEmptyError = true ;
            }
            $localStorage.myTeams = $rootScope.myTeams ;
            $('.teamInfo').removeClass('loading');
            console.log('my teams:',$rootScope.myTeams);
            $rootScope.notifyLoader = false ;
        }
    });
    ContestModel.getAllContestsList(function (data , status) {
        if (status){
            $scope.contestsList = data.contests ;
            if (data.contests.length==0){
                $scope.allContetsEmptyError = true ;
            }
            $('.otherContests').removeClass('loading');
            console.log('all contest list:',data)
        }
    });
    ContestModel.getOwnerContests(function (data,status) {
        if (status){
            $scope.ownedContests = data.contests ;
            if (data.contests.length==0){
                $scope.ownedContetsEmptyError = true ;
            }
            $('.ownedContests').removeClass('loading');
            console.log('owned contest list:',data)
        }
    });
    ContestModel.getAdminContests(function (data,status) {
        if (status){
            $scope.adminContests = data.contests ;
            if (data.contests.length==0){
                $scope.adminContetsEmptyError = true ;
            }
            $('.adminContests').removeClass('loading');
            console.log('admin contest list:',data)
        }
    });
};

ijust.controller('HomeCtrl' , HomeCtrl);