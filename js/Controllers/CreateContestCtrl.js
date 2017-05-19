var CreateContestCtrl = function ($scope , $rootScope , ContestModel,$location, Constants) {
    // $rootScope.notifyLoader = true ;
    $scope.contestInfo = {};
    $scope.showSuccessMsg = false ;
    $scope.showErrorMsg = false;
    $scope.buttonLoader = false ;
    $scope.successMsg = "" ;
    $scope.errorMsg = "";
    $scope.contestInfo.starts_at=rome(start);
    $scope.contestInfo.ends_at=rome(end);
    $scope.dataSiteKey = Constants.dataSiteKey;

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
        if ($scope.contestInfo.starts_at.associated.value){
            $scope.contestInfo.starts_at = $scope.contestInfo.starts_at.associated.value ;
            if($scope.contestInfo.starts_at == moment(new Date()).format("YYYY-MM-DD HH:mm") ){
                $scope.showErrorMsg = true ;
                $scope.showSuccessMsg = false ;
                $scope.errorMsg = 'start time should at least one minute later than now' ;
                $scope.buttonLoader = false ;
                $scope.contestInfo.starts_at=rome(start);
                $scope.contestInfo.ends_at=rome(end);
                return;
            }
            $scope.contestInfo.starts_at = convertlocaltoUCP($scope.contestInfo.starts_at);
        }
        if ($scope.contestInfo.ends_at.associated.value){
            $scope.contestInfo.ends_at = $scope.contestInfo.ends_at.associated.value ;
            $scope.contestInfo.ends_at = convertlocaltoUCP($scope.contestInfo.ends_at);
        }
        $scope.contestInfo.recaptcha = $("#g-recaptcha-response").val();
        ContestModel.createContest($scope.contestInfo , function (data , status) {
            if(status){
                $scope.showSuccessMsg = true ;
                $scope.showErrorMsg = false;
                $scope.successMsg = "contest created successfully.";
                $scope.buttonLoader = false ;
                $location.url('/contest/'+data.id);
            }
            else {
                grecaptcha.reset();
                $scope.showErrorMsg = true ;
                $scope.showSuccessMsg = false ;
                $scope.errorMsg = data ;
                $scope.buttonLoader = false ;
                $scope.contestInfo.starts_at=rome(start);
                $scope.contestInfo.ends_at=rome(end);
            }
        })
    };
    // $rootScope.notifyLoader = false ;
};

ijust.controller('CreateContestCtrl' , CreateContestCtrl);