var UserModel = function ($http, Constants) {

    var login = function (JSON, callback) {
        $http.post(Constants.server + Constants.version + 'user/login', JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg;
                if (status == 404) {
                    msg = "این حساب وجود ندارد"
                }
                else if (status == 400) {
                    msg = "لطفا دوباره تلاش کنید"
                }
                else if (status == 406) {
                    msg = "رمز عبور یا نام کاربری اشتباه است"
                }
                else {
                    msg = "خطای نا شناخته"
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
                var msg;
                if (status == 400) {
                    msg = "لطفا دوباره تلاش کنید"
                } else if (status == 409) {
                    msg = "نام کاربری یا ایمیل وجود دارد"
                }
                else {
                    msg = "خطای نا شناخته"
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
                    msg = "نشست شما به پایان رسیده است."
                }
                else {
                    msg = "خطای نا شناخته"
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
                    msg = "نشست شما به پایان رسیده است."
                } else if (status == 404) {
                    msg = "کاربر مورد نظر یافت نشد"
                } else {
                    msg = "خطای نا شناخته"
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
                    msg = "نشست شما به پایان رسیده است."
                } else if (status == 404) {
                    msg = "کاربر مورد نظر یافت نشد"
                } else {
                    msg = "خطای نا شناخته"
                }
                callback(msg, false);
            })
    };

    // var getUserTeams = function (id, callback) {
    //     $http.get(Constants.server + 'user/' + id + '/teams/')
    //         .success(function (data, status) {
    //             callback(data, true);
    //         })
    //         .error(function (data, status) {
    //             callback(data, false);
    //         })
    // };

    // var getUserTeamByContestId = function (userId, contestId, callback) {
    //     $http.get(Constants.server + 'user/' + userId + '/contest/' + contestId + '/')
    //         .success(function (data, status) {
    //             callback(data, true);
    //         })
    //         .error(function (data, status) {
    //             callback(data, false);
    //         })
    // };

    return {
        login: login,
        signUp: signUp,
        logOut: logOut,
        getUserProfile: getUserProfile,
        getMyInfo: getMyInfo
    }
};

userModule.factory("UserModel", UserModel);
