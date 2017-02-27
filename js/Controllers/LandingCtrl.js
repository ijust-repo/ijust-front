var LandingCtrl = function ($scope , UserModel , $cookies ,
                            mtNotifyService , $rootScope ,
                            $state , $localStorage ) {
    
    if($rootScope.isAuthenticated){
        $state.go('home');
    }

    mtNotifyService.unLoad();

    $scope.LoginInfo = {} ;
    $scope.signUpInfo = {};
    $scope.isLoginBoxShow = true;
    $scope.isSignUpBoxShow = false;
    $scope.showLoginBox = function () {
        $scope.isLoginBoxShow = true;
        $scope.isSignUpBoxShow = false;
        $rootScope.hideNotify();
    };
    $scope.showSignUpBox = function () {
        $scope.isLoginBoxShow = false;
        $scope.isSignUpBoxShow = true;
        $rootScope.hideNotify();
    };
    $scope.login = function () {
        mtNotifyService.load();
        if ( !($scope.LoginInfo.username) || !($scope.LoginInfo.password)){
            mtNotifyService.show(" Username and Password required" , 0);
            return ;
        }
        if ( !($scope.LoginInfo.username) && ($scope.LoginInfo.password)) {
            mtNotifyService.show("Please enter Username" , 0);
            return;
        }
        if (($scope.LoginInfo.username) && !($scope.LoginInfo.password)) {
            mtNotifyService.show("Please enter Password" , 0);
            return;
        }
        UserModel.login( $scope.LoginInfo , function (data , status) {
            if (status){
                $localStorage.token = data.token ;
                $rootScope.isAuthenticated = true ;
                $state.go('home');
                mtNotifyService.unLoad();
            }
            else {
                mtNotifyService.show(data.errors , 0)
            }
        }) ;
    };

    $scope.signUp = function () {
        mtNotifyService.load();
        // console.log($scope.signUpInfo);
        if ( !$scope.signUpInfo.email ){
            mtNotifyService.show("please enter E-mail" , 0);
            return;
        }
        if ( !$scope.signUpInfo.username ){
            mtNotifyService.show("please enter Username" , 0);
            return;
        }
        if ( !$scope.signUpInfo.password ){
            mtNotifyService.show("please enter Password" , 0);
            return;
        }
        if ( !$scope.confirmPassword ){
            mtNotifyService.show("please enter confirm Password" , 0);
            return;
        }
        if( $scope.signUpInfo.password != $scope.confirmPassword) {
            mtNotifyService.show("Password doesn't Match");
            return;
        }
        UserModel.signUp($scope.signUpInfo , function (data , status) {
           if(status) {
               $scope.LoginInfo.username = $scope.signUpInfo.username ;
               $scope.LoginInfo.password = $scope.signUpInfo.password ;
               $scope.login();
               mtNotifyService.unLoad()
           }
            else {
               mtNotifyService.show(data.errors , 0);
           }
        })
    }
};

ijust.controller('LandingCtrl' , LandingCtrl);