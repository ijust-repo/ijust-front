var UserModel = function ($http, Constants) {

    var login = function (JSON, callback) {
        $http.post(Constants.server + Constants.version + 'user/login', JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 404:
                        msg = 'User does not exist';
                        break;
                    case 406:
                        msg = 'Wrong username or password';
                        break;
                    case 400:
                        msg = 'Bad request';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var signUp = function (JSON, callback) {
        $http.post(Constants.server + Constants.version + 'user/signup', JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 400:
                        msg = 'Bad request';
                        break;
                    case 409:
                        msg = 'Email or username already exists';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var logOut = function (callback) {
        $http.post(Constants.server + Constants.version + 'user/logout')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg;
                if (status == 401) {
                    msg = "Token is invalid or has expired.please sign in again"
                }
                else {
                    msg = "unknown error , please try later"
                }
                callback(msg, false);
            })
    };

    var getUserProfile = function (userID, callback) {
        $http.get(Constants.server + Constants.version + 'user/' + userID)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg;
                if (status == 401) {
                    msg = "Token is invalid or has expired.please sign in again"
                } else if (status == 404) {
                    msg = "User does not exist"
                } else {
                    msg = "unknown error , please try later"
                }
                callback(msg, false);
            })
    };

    var getMyInfo = function (callback) {
        $http.get(Constants.server + Constants.version + 'user')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg;
                if (status == 401) {
                    msg = "Token is invalid or has expired.please sign in again"
                } else if (status == 404) {
                    msg = "this account does not exist"
                } else {
                    msg = "unknown error , please try later"
                }
                callback(msg, false);
            })
    };

    var loginWithToken = function (token,callback) {
        $http.post(Constants.server + Constants.version + 'user/login_with_token',token)
            .success(function (data, status) {
                callback(data, true)
            })
            .error(function (data, status) {
                var msg;
                if (status == 401) {
                    msg = "Token is invalid or has expired.please sign in again"
                } else {
                    msg = "unknown error , please try later"
                }
                callback(msg, false);
            })
    };

    return {
        login: login,
        loginWithToken: loginWithToken,
        signUp: signUp,
        logOut: logOut,
        getUserProfile: getUserProfile,
        getMyInfo: getMyInfo
    }
};

userModule.factory("UserModel", UserModel);
