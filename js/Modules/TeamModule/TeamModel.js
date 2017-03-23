var TeamModel = function ($http, Constants) {
    var getMyTeams = function (callback) {
        $http.get(Constants.server + Constants.version + 'team')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg;
                if (status == 401) {
                    msg = "نشست شما به پایان رسیده است."
                } else {
                    msg = "خطای نا شناخته"
                }
                callback(msg, false);
            })
    };

    var getTeamInfo = function (teamID, callback) {
        $http.get(Constants.server + Constants.version + 'team/' + teamID)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg;
                if (status == 401) {
                    msg = "نشست شما به پایان رسیده است."
                }else if( status == 404 ){
                    msg = "تیم مورد نظر یافت نشد"
                } else{
                    msg = "خطای نا شناخته"
                }
                callback(msg, false);
            })
    };

    var createTeam = function (JSON,callback) {
        $http.post(Constants.server + Constants.version + 'team' , JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg;
                if (status == 400) {
                    msg = "لطفا دوباره تلاش کنید"
                }else if( status == 401 ){
                    msg = "نشست شما به پایان رسیده است"
                } else if( status == 404 ){
                    msg = "اعضای تیم یافت نشدند"
                } else if( status == 406 ){
                    msg = "متاسفانه،شما نمیتوانید تیم بیشتری بسازید"
                } else if( status == 409 ){
                    msg = "تیم مورد نظر وجود دارد"
                } else{
                    msg = "خطای نا شناخته"
                }
                callback(data, false);
            })
    };

    var editTeam = function (teamID, JSON, callback) {
        $http.put(Constants.server + Constants.version + 'team/' + teamID , JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg;
                if (status == 400) {
                    msg = "لطفا دوباره تلاش کنید"
                }else if( status == 401 ){
                    msg = "نشست شما به پایان رسیده است"
                } else if( status == 403 ){
                    msg = "شما مدیر این تیم نیستید . اجازه ویرایش آن را ندارید"
                } else if( status == 404 ){
                    msg = "تیم یا اعضای آن وجود ندارند"
                } else if( status == 409 ){
                    msg = "تیم مورد نظر وجود دارد"
                } else{
                    msg = "خطای نا شناخته"
                }
                callback(data, status);
            })
    };

    var deleteTeam = function (teamId , callback) {
        $http.delete(Constants.server + Constants.version + 'team/' + teamId)
            .success(function (data,status) {
                callback(data,true);
            })
            .error(function (data,status) {
                callback(data,false);
            })
    };

    return {
        getMyTeams: getMyTeams,
        getTeamInfo: getTeamInfo,
        createTeam: createTeam,
        editTeam: editTeam,
        deleteTeam : deleteTeam
    }
};


teamModule.factory("TeamModel", TeamModel);