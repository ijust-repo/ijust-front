var SubmitsCtrl = function ($scope , $rootScope , SubmissionModel) {
    $rootScope.notifyLoader = true ;
    $scope.submitsInfo = {};
    SubmissionModel.getAllSubmissionInContest( $rootScope.contestId , $rootScope.myTeam.id , function (data,status) {
        if (status){
            console.log(data);
            $scope.submitsInfo = data.submissions ;
            $rootScope.notifyLoader = false ;
        }
    })
};

ijust.controller('SubmitsCtrl' , SubmitsCtrl);