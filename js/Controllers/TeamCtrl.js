var TeamCtrl = function ($scope , mtNotifyService , TeamModel , ContestModel , $rootScope ,$stateParams) {

    $rootScope.notifyLoader = true ;
    $scope.teamId = $stateParams.teamId ;
    $scope.teamInfo = {} ;
    $scope.contestsList = {} ;
    $scope.joinedContetsEmptyError = false ;
    $scope.pendingContetsEmptyError = false ;
    TeamModel.getTeamInfo($scope.teamId , function (data , status) {
        if (status) {
            $scope.teamInfo = data ;
            $('.teamInfo').removeClass('loading');
            console.log(data);
        }
    });
    ContestModel.getContestsOfTeam($scope.teamId,function (data,status) {
        if (status){
            $scope.contestsList = data ;
            $('.otherContests').removeClass('loading');
            if (data.joined_contests.length==0){
                $scope.joinedContetsEmptyError = true ;
            }
            if (data.waiting_contests.length==0){
                $scope.pendingContetsEmptyError = true ;
            }
            $rootScope.notifyLoader = false ;
        }
    })

};

ijust.controller('TeamCtrl' , TeamCtrl);
