var TeamModel = function ($http, Constants) {
    var getMyTeams = function (callback) {
        $http.get(Constants.server + Constants.version + 'team')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var getTeamInfo = function (teamID, callback) {
        $http.get(Constants.server + Constants.version + 'team/' + teamID)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var createTeam = function (JSON,callback) {
        $http.post(Constants.server + Constants.version + 'team' , JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var editTeam = function (teamID, JSON, callback) {
        $http.put(Constants.server + Constants.version + 'team/' + teamID , JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
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