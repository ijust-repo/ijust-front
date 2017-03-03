var HomeCtrl = function ( $scope , mtNotifyService , ContestModel , TeamModel , $rootScope) {

    $rootScope.notifyLoader = true ;
    $scope.allContetsEmptyError = false;
    $scope.ownedContetsEmptyError = false;
    $scope.adminContetsEmptyError = false;
    $scope.teamsEmptyError = false;
    $scope.ownedContets = {} ;
    $scope.adminContets = {} ;
    $scope.contestsList = {} ;
    $scope.myTeams = [] ;

    TeamModel.getMyTeams(function (data, status) {
        if (status){
            $scope.myTeams.push(data.owner_teams);
            $scope.myTeams.push(data.member_teams);
            if (data.member_teams.length==0){
                $scope.teamsEmptyError = true ;
            }
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