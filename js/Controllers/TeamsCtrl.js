var TeamsCtrl = function ($scope , mtNotifyService , UserModel , $rootScope) {

    $rootScope.notifyLoader = true;
    $scope.teamsInfo = {} ;

    UserModel.getUserProfile(function (data , status) {
        if (status) {
            $scope.userId = data.id ;
            UserModel.getUserTeams( $scope.userId , function (data,status) {
                if (status) {
                    // console.log(data);
                    $scope.teamsInfo = data.teams ;
                    $rootScope.notifyLoader = false ;
                }
            })
        }
    });

};

ijust.controller('TeamsCtrl' , TeamsCtrl);
