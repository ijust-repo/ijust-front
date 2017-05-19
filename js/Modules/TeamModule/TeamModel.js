var TeamModel = function ($http, Constants) {
    var getMyTeams = function (callback) {
        $http.get(Constants.server + Constants.version + 'team')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
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
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 404:
                        msg = 'Team does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
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
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 404:
                        msg = 'Member does not exist';
                        break;
                    case 406:
                        msg = 'You can't create more teams';
                        break;
                    case 409:
                        msg = 'Team already exists';
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

    var editTeam = function (teamID, JSON, callback) {
        $http.put(Constants.server + Constants.version + 'team/' + teamID , JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 404:
                        msg = 'Team or Member does not exist';
                        break;
                    case 403:
                        msg = "You aren't owner of the team";
                        break;
                    case 409:
                        msg = 'Team name already exists';
                        break;
                    case 400:
                        msg = 'Bad request';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, status);
            })
    };

    var deleteTeam = function (teamId , callback) {
        $http.delete(Constants.server + Constants.version + 'team/' + teamId)
            .success(function (data,status) {
                callback(data,true);
            })
            .error(function (data,status) {
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 404:
                        msg = 'Team does not exist';
                        break;
                    case 403:
                        msg = "You aren't owner of the team";
                        break;
                    case 406:
                        msg = 'The team has participated in a number of contests';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
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