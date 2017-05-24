var LandingCtrl = function ($scope , UserModel , $cookies ,
                            mtNotifyService , $rootScope ,
                            $state , $localStorage , Constants ) {

    // check for authentication
    // if($rootScope.isAuthenticated && $localStorage.token){
    //     $state.go('home');
    // }
    $rootScope.notifyDisplay=false;
    $rootScope.notifyMessage = "";
    $rootScope.userInfo = {} ;
    if($localStorage.token){
        UserModel.loginWithToken({'Access-Token':$localStorage.token},function (data , status) {
            if (status){
                $rootScope.isAuthenticated = true ;
                $state.go('home');
            }
            else{
                delete $localStorage.token;
                $rootScope.isAuthenticated = false;
            }
        });
    }

    // make page ready
    mtNotifyService.unLoad();

    // variables
    $scope.LoginInfo = {} ;
    $scope.signUpInfo = {};
    $scope.isLoginBoxShow = true;
    $scope.isSignUpBoxShow = false;
    $scope.dataSiteKey = Constants.dataSiteKey;

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
        if ( !($scope.LoginInfo.login) || !($scope.LoginInfo.password)){
            // mtNotifyService.show(" Username/E-mail and Password required" , 0);
            $rootScope.notifyDisplay=true;
            $rootScope.notifyMessage = " Username/E-mail and Password required";
            return ;
        }
        if ( !($scope.LoginInfo.login) && ($scope.LoginInfo.password)) {
            // mtNotifyService.show("Please enter Username/E-mail" , 0);
            $rootScope.notifyDisplay=true;
            $rootScope.notifyMessage = " Please enter Username/E-mail";
            return;
        }
        if (($scope.LoginInfo.login) && !($scope.LoginInfo.password)) {
            // mtNotifyService.show("Please enter Password" , 0)
            $rootScope.notifyDisplay=true;
            $rootScope.notifyMessage = " Please enter Password";
            return;
        }
        UserModel.login( $scope.LoginInfo , function (data , status) {
            if (status){
                $localStorage.token = data.token ;
                $rootScope.userInfo.username = $scope.LoginInfo.login ;
                $rootScope.isAuthenticated = true ;
                $state.go('home');
                mtNotifyService.unLoad();
            }
            else {
                // mtNotifyService.show(data , 0)
                $rootScope.notifyDisplay=true;
                $rootScope.notifyMessage = data;
            }
        }) ;
    };

    $scope.signUp = function () {
        mtNotifyService.load();
        $scope.signUpInfo.recaptcha = $("#g-recaptcha-response").val();
        // console.log($scope.signUpInfo);
        if ( !$scope.signUpInfo.email ){
            // mtNotifyService.show("please enter E-mail" , 0);
            $rootScope.notifyDisplay=true;
            $rootScope.notifyMessage = " Please enter Password";
            return;
        }
        if ( !$scope.signUpInfo.username ){
            // mtNotifyService.show("please enter Username" , 0)
            $rootScope.notifyDisplay=true;
            $rootScope.notifyMessage = "please enter Username";
            return;
        }
        if ( !$scope.signUpInfo.password ){
            // mtNotifyService.show("please enter Password" , 0);
            $rootScope.notifyDisplay=true;
            $rootScope.notifyMessage = "please enter Password";
            return;
        }
        if ( !$scope.confirmPassword ){
            // mtNotifyService.show("please enter confirm Password" , 0);
            $rootScope.notifyDisplay=true;
            $rootScope.notifyMessage = "please enter confirm Password";
            return;
        }
        if( $scope.signUpInfo.password != $scope.confirmPassword) {
            // mtNotifyService.show("Password doesn't Match");
            $rootScope.notifyDisplay=true;
            $rootScope.notifyMessage = "Password doesn't Match";
            return;
        }
        UserModel.signUp($scope.signUpInfo , function (data , status) {
           if(status) {
               $scope.LoginInfo.login = $scope.signUpInfo.username ;
               $scope.LoginInfo.password = $scope.signUpInfo.password ;
               $rootScope.userInfo.username = $scope.signUpInfo.username ;
               $scope.login();
               mtNotifyService.unLoad()
           }
            else {
               grecaptcha.reset();
               // mtNotifyService.show(data , 0);
               $rootScope.notifyDisplay=true;
               $rootScope.notifyMessage = data;
           }
        })
    }
};

ijust.controller('LandingCtrl' , LandingCtrl);