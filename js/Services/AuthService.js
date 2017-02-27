var AuthService = function ($http, Constants, $localStorage,
                            $q, $interval, $rootScope, $state,
                            $window, $cookies ) {

    var _isAuthenticated = false;
    var _isInit = false;

    function init() {
        if($localStorage.token){
            $rootScope.isAuthenticated = true ;
            _isAuthenticated = true ;
        }
        else {
            $rootScope.isAuthenticated = false ;
            _isAuthenticated = false ;
        }
        // $rootScope.isAuthenticated = $cookies.get('isAuthenticated');
        // _isAuthenticated = $rootScope.isAuthenticated ;
        // console.log($cookies.getAll())
        // if ($localStorage.accessToken && $localStorage.refreshToken) {
        //     $http.get(Constants.server + Constants.version + "user")
        //         .success(function (data, status) {
        //             _isAuthenticated = true;
        //             // $window.sessionStorage.setItem("isAuthenticated",true);
        //             $rootScope.isAuthenticated = true;
        //             _isInit = true;
        //             callback(data, true);
        //         })
        //         .error(function (data, status) {
        //             _isInit = true;
        //             _isAuthenticated = false;
        //             // $window.sessionStorage.setItem("isAuthenticated",false);
        //             $rootScope.isAuthenticated = false;
        //             callback(data, false)
        //         })
        // }
        //
        // else {
        //     _isAuthenticated = false;
        //     $window.sessionStorage.setItem("isAuthenticated",false);
        //     _isInit = true;
        //     callback(Constants.errorMessages.TOKEN_NOTFOUND, false);
        // }
    }

    function validate() {
        var defer = $q.defer();
        if (_isInit) {
            if (_isAuthenticated) {
                defer.resolve(true)
            }
            else {
                defer.reject(false);
            }
        }
        else {
            // Not a good solution
            var _interval = $interval(function () {
                if (_isInit) {
                    if (_isAuthenticated) {
                        defer.resolve(true);
                        $interval.cancel(_interval);
                    }
                    else {
                        defer.reject(false);
                        $interval.cancel(_interval);
                    }
                }
            }, 200);
        }

        return defer.promise;
    }

//
//     function logIn(obj, callback) {
//         $http.post(Constants.server + Constants.version + "user/web_authenticate", obj)
//             .success(function (data, status) {
//                 if (status == '200' || status == 200){
//                     _isAuthenticated = true;
//                     $rootScope.isAuthenticated = true;
//                     callback(data, status);
//                 }
//                 else {
//                     callback(data,status);
//                 }
//             })
//             .error(function (data, status) {
//                 var msg;
//                 if (status == 401) {
//                     // msg = "رمز عبور اشتباه است"
//                     msg = "شماره همراه یا رمز عبور اشتباه است"
//                 }
//                 else if (status == 404) {
//                     msg = "این حساب وجود ندارد"
//                 }
//                 else if (status == 406) {
//                     msg = "رمز اینترنتی جدید بسازید"
//                 }
//                 else if (status == 400) {
//                     // msg = "اطلاعات وارد شده نا معتبر است."
//                     msg = "شماره همراه یا رمز عبور اشتباه است"
//                 }
//                 else if (status == 500) {
//                     msg = "با عرض پوزش لطفا دقایقی دیگر تلاش نماید"
//                 }
//                 else if (status == 503) {
//                     msg = "با عرض پوزش لطفا دقایقی دیگر تلاش نماید"
//                 }
//                 else if (status == 403) {
//                     msg = "403"
//                 }
//                 callback(msg, false);
//             })
//     }
//
//     function signUp(obj, callback) {
//         $http.post(Constants.server + Constants.version + "user/register", obj)
//             .success(function (data, status) {
//                 callback(data, true);
//             })
//             .error(function (data, status) {
//                 var msg;
//                 switch (status) {
//                     case 409 :
//                         msg = "این حساب کاربری موجود است";
//                         break;
//                     case 503 :
//                         msg = "با عرض پوزش ، لطفا بعدا ثبت نام کن";
//                         break;
//                     case 500 :
//                         msg = "با عرض پوزش ، لطفا بعدا ثبت نام کن";
//                         break;
//                     default : msg = status ;
//                 }
//                 callback(msg, false);
//             })
//     }
//
//     function activate(obj, callback) {
//         $http.post(Constants.server + Constants.version + "user/activate", obj)
//             .success(function (data, status) {
//                 accessToken = data.access;
//                 refreshToken = data.refresh;
//                 $localStorage.accessToken = accessToken;
//                 $localStorage.refreshToken = refreshToken;
//                 _isAuthenticated = true;
//                 $window.sessionStorage.setItem("isAuthenticated",true);
//                 $rootScope.isAuthenticated = true;
//                 callback(data, true);
//             })
//             .error(function (data, status) {
//                 var msg;
//                 switch (status) {
//                     case 400 :
//                         msg = "کد را وارد کنید";
//                         break;
//                     case 401 :
//                         msg = "کد اشتباه است";
//                         break;
//                     case 404 :
//                         msg = "داداچ داری اشتباه میزنی";
//                         break;
//                     case 503 :
//                         msg = "لطفا بعدا تلاش کن";
//                         break;
//                     default :
//                         msg = "خطای ناشناخته";
//                 }
//                 callback(msg, false);
//             })
//     }
//
//     function forgotPassword(obj , callback) {
//         $http.post(Constants.server + Constants.version + "user/password/forget" , obj)
//             .success(function (data,status) {
//                 callback(data , true);
//             })
//             .error(function (data,status) {
//                 var msg;
//                 if(status == 404){
//                     msg = "شماره یافت نشد" ;
//                 }
//                 else if (status == 400) {
//                     msg = "شماره نامعتبر";
//                 }
//                 else{
//                     msg = data ;
//                 }
//                 callback(msg,false)
//             })
//     }
//
//     function resetPassword(obj , callback) {
//         $http.post(Constants.server + Constants.version + "user/password/reset" , obj)
//             .success(function (data,status) {
//                 accessToken = data.access;
//                 refreshToken = data.refresh;
//                 $localStorage.accessToken = accessToken;
//                 $localStorage.refreshToken = refreshToken;
//                 _isAuthenticated = true;
//                 $window.sessionStorage.setItem("isAuthenticated",true);
//                 $rootScope.isAuthenticated = true;
//                 callback(data,true)
//             })
//             .error(function (data,status) {
//                 var msg;
//                 if (status == 401){
//                     msg = "کد وارد شده اشتباه است"
//                 }
//                 else{
//                     msg = data ;
//                 }
//                 callback(msg,false)
//             })
//     }
//
//     function logOut(callback) {
//         $http.delete(Constants.server + Constants.version + "user/revoke")
//             .success(function (data, status) {
//                 accessToken = null;
//                 refreshToken = null;
//                 $rootScope.isAuthenticated = false;
//                 delete $localStorage.accessToken;
//                 delete $localStorage.refreshToken;
//                 _isAuthenticated = false;
//                 $window.sessionStorage.setItem("isAuthenticated",false);
//                 $state.go('/');
//                 callback(data, true);
//             })
//             .error(function (data, status) {
//                 callback(data, false);
//             });
//     }
//
    function isAuthenticated() {
        return _isAuthenticated;
    }

    return {
        validate: validate,
        init: init,
        // logIn: logIn,
        // logOut: logOut,
        isAuthenticated: isAuthenticated
        // signUp: signUp ,
        // activate: activate ,
        // forgotPassword : forgotPassword,
        // resetPassword : resetPassword
    }
};

ijust.factory("AuthService", AuthService);
