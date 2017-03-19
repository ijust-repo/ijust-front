var ContestTeamsCtrl = function ($scope , $rootScope,ContestModel) {
    $rootScope.notifyLoader = true ;
    $scope.joinedTeams = {} ;

    ContestModel.getAcceptedTeams($rootScope.contestId,function (data , status) {
        if (status){
            $scope.joinedTeams = data.accepted_teams;
            $scope.joinedTeamsNumber = $scope.joinedTeams.length;
            $rootScope.notifyLoader = false ;
        }
    });
    $scope.remove = function (teamId) {

    }
};

ijust.controller('ContestTeamsCtrl',ContestTeamsCtrl);