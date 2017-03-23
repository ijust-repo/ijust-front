var ContestTeamsCtrl = function ($scope , $rootScope,ContestModel) {
    $rootScope.notifyLoader = true ;
    $scope.joinedTeams = {} ;

    try {
        ContestModel.getAcceptedTeams($rootScope.contestId,function (data , status) {
            if (status){
                $scope.joinedTeams = data.accepted_teams;
                $scope.joinedTeamsNumber = $scope.joinedTeams.length;
                $rootScope.notifyLoader = false ;
            }
        });
    }
    catch (e){}
    $scope.remove = function (teamId) {

    }
};

ijust.controller('ContestTeamsCtrl',ContestTeamsCtrl);