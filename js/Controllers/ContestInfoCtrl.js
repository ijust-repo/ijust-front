var ContestInfoCtrl = function ($scope, mtNotifyService, $stateParams,
                                ContestModel, TeamModel, $rootScope) {

    $('.ui.dropdown')
        .dropdown()
    ;
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
};

ijust.controller('ContestInfoCtrl', ContestInfoCtrl);