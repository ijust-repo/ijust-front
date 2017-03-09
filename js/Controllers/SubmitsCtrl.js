var SubmitsCtrl = function ($scope , $rootScope , SubmissionModel) {
    $rootScope.notifyLoader = true ;
    $scope.submitsInfo = {};
    SubmissionModel.getAllSubmissionInContest($rootScope.myTeam.id , $rootScope.contestId , function (data,status) {
        if (status){
            console.log(data);
            $scope.submitsInfo = data ;
        }
    })
};

ijust.controller('SubmitsCtrl' , SubmitsCtrl);