var CreateContestCtrl = function ($scope , $rootScope , ContestModel) {
    // $rootScope.notifyLoader = true ;
    $scope.contestInfo = {};
    $scope.showSuccessMsg = false ;
    $scope.showErrorMsg = false;
    $scope.buttonLoader = false ;
    $scope.successMsg = "" ;
    $scope.errorMsg = "";
    $scope.contestInfo.starts_on=rome(start);
    $scope.contestInfo.ends_on=rome(end);

    function convertlocaltoUCP(date){
        var n_date=new Date(date);
        var d=new Date(moment.utc(n_date).format()).getTime() / 1000;
        //alert(d);
        return (d);
    }


    function convertUTCDateToLocalDate(date) {
        var d = moment(date);
        var n_date = new Date(d);
        var localOffset = n_date.getTimezoneOffset() * 60000;
        var localTime = n_date.getTime();
        date = localTime - localOffset;
        return (moment(date).format('YYYY-MM-DD HH:mm:ss'));
    }

    $scope.create = function () {
        $scope.buttonLoader = true;
        $scope.contestInfo.starts_on = $scope.contestInfo.starts_on.associated.value ;
        $scope.contestInfo.ends_on = $scope.contestInfo.ends_on.associated.value ;
        $scope.contestInfo.starts_on = convertlocaltoUCP($scope.contestInfo.starts_on);
        $scope.contestInfo.ends_on = convertlocaltoUCP($scope.contestInfo.ends_on);
        ContestModel.createContest($scope.contestInfo , function (data , status) {
            if(status){
                $scope.showSuccessMsg = true ;
                $scope.showErrorMsg = false;
                $scope.successMsg = "contest created successfully.";
                $scope.buttonLoader = false ;
            }
            else {
                $scope.showErrorMsg = true ;
                $scope.showSuccessMsg = false ;
                $scope.errorMsg = "Error" ;
                $scope.buttonLoader = false ;
            }
        })
    };
    // $rootScope.notifyLoader = false ;
};

ijust.controller('CreateContestCtrl' , CreateContestCtrl);