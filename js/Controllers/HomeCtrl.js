var HomeCtrl = function ( $scope , mtNotifyService , ContestModel , TeamModel , $rootScope) {

    $rootScope.notifyLoader = true ;
    $scope.allContetsEmptyError = false;
    $scope.ownedContetsEmptyError = false;
    $scope.adminContetsEmptyError = false;
    $rootScope.teamsEmptyError = false;
    $scope.ownedContets = {} ;
    $scope.adminContets = {} ;
    $scope.contestsList = {} ;
    $rootScope.myTeams = [] ;

    TeamModel.getMyTeams(function (data, status) {
        if (status){
            $rootScope.myTeams=data.owner_teams;
            $rootScope.myTeams.concat(data.member_teams);
            if ($rootScope.myTeams.length==0){
                $rootScope.teamsEmptyError = true ;
            }
            $('.teamInfo').removeClass('loading');
            console.log('my teams:',$scope.myTeams);
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
            $scope.adminContets = data.contests ;
            if (data.contests.length==0){
                $scope.adminContetsEmptyError = true ;
            }
            $('.adminContests').removeClass('loading');
            console.log('admin contest list:',data)
        }
    });
};

ijust.controller('HomeCtrl' , HomeCtrl);