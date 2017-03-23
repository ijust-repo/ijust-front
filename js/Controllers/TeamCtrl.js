var TeamCtrl = function ($scope , mtNotifyService , TeamModel , ContestModel , $rootScope ,$stateParams,$state) {

    $rootScope.notifyLoader = true ;
    $scope.teamId = $stateParams.teamId ;
    $scope.teamInfo = {} ;
    $scope.contestsList = {} ;
    $scope.joinedContetsEmptyError = false ;
    $scope.pendingContetsEmptyError = false ;
    $scope.isOwner = false ;
    $scope.showDeleteTeamError = false ;
    $scope.deleteTeamErrorMsg = "" ;

    TeamModel.getTeamInfo($scope.teamId , function (data , status) {
        if (status) {
            $scope.teamInfo = data ;
            if($scope.teamInfo.owner.username == $rootScope.userInfo.username){
                $scope.isOwner = true ;
            }
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
    });

    $scope.deleteTeam = function () {
        TeamModel.deleteTeam($scope.teamInfo.id , function (data,status) {
            if(status){
                $state.go('home');
            }
            else {
                $scope.showDeleteTeamError = true ;
                $scope.deleteTeamErrorMsg = data ;
            }
        })
    };

    $('#showDeleteModal').on('click',function () {
        $('#deleteModal')
            .modal('show')
        ;
    })

};

ijust.controller('TeamCtrl' , TeamCtrl);
