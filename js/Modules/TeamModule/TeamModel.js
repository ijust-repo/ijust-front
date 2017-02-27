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
        $http.get(Constants.server + Constants.version + 'team' + teamID)
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
        $http.post(Constants.server + Constants.version + 'team')
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
                callback(msg, false);
            })
    };

    var editTeam = function (teamID, JSON, callback) {
        $http.put(Constants.server + Constants.version + 'team/' + teamID)
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
                callback(msg, false);
            })
    };

    //create new team
    // var createTeam = function ( JSON , callback) {
    //     $http.post(Constants.server + "team/create/" , JSON)
    //         .success(function (data, status) {
    //             callback(data, true);
    //         })
    //         .error(function (data, status) {
    //             // var msg ;
    //             // switch (status){
    //             //     case 406 :
    //             //         msg = "Number of members must be under three!" ;
    //             //         break;
    //             //     case 409 :
    //             //         msg = "name of team already exists" ;
    //             //         break;
    //             //     default :
    //             //         msg = data
    //             // }
    //             callback(data, false);
    //         })
    // };
    //111
    // var joinRequest = function (JSON , callback) {
    //     $http.post(Constants.server + 'team/join_request/' , JSON)
    //         .success(function (data , status) {
    //             callback(data , true);
    //         })
    //         .error(function (data , status) {
    //             callback(data , false);
    //         })
    // };

    return {
        getMyTeams: getMyTeams,
        getTeamInfo: getTeamInfo,
        createTeam: createTeam,
        editTeam: editTeam
        // joinRequest : joinRequest
    }
};


teamModule.factory("TeamModel", TeamModel);