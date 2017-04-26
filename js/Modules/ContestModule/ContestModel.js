var ContestModel = function ($http, Constants) {
    var getAllContestsList = function (callback) {
        $http.get(Constants.server + Constants.version + 'contest')
            .success(function (data, status) {
                callback(data, true)
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var createContest = function (JSON, callback) {
        $http.post(Constants.server + Constants.version + 'contest', JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var getAdminContests = function (callback) {
        $http.get(Constants.server + Constants.version + 'contest/admin')
            .success(function (data, status) {
                callback(data, true)
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var getOwnerContests = function (callback) {
        $http.get(Constants.server + Constants.version + 'contest/owner')
            .success(function (data, status) {
                callback(data, true)
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var getContestsOfTeam = function (teamId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/team/' + teamId)
            .success(function (data, status) {
                callback(data, true)
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var getContestInfoById = function (contestId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var editContest = function (contestId, JSON, callback) {
        $http.put(Constants.server + Constants.version + 'contest/' + contestId, JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var getContestAdminList = function (contestId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/admin')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var addAdmin = function (contestId, callback) {
        $http.post(Constants.server + Constants.version + 'contest/' + contestId + '/admin')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var removeAdmin = function (contestId, userId, callback) {
        $http.delete(Constants.server + Constants.version + 'contest/' + contestId + '/admin/' + userId)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var getProblemsList = function (contestId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/problem')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var problemChangeOrder = function (contestId, JSON, callback) {
        $http.patch(Constants.server + Constants.version + 'contest/' + contestId + '/problem', JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var createProblem = function (contestId, JSON, callback) {
        $http.post(Constants.server + Constants.version + 'contest/' + contestId + '/problem', JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var deleteProblem = function (contestId, problemId, callback) {
        $http.delete(Constants.server + Constants.version + 'contest/' + contestId + '/problem/' + problemId)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var getProblemInfo = function (contestId, problemId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/problem/' + problemId)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })

    };

    var editProblem = function (contestId, problemId, JSON, callback) {
        $http.put(Constants.server + Constants.version + 'contest/' + contestId + '/problem/' + problemId, JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(status, false);
            })

    };

    var problemDownloadBody = function (contestId, problemId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/problem/' + problemId + '/body')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })

    };

    var problemUploadBody = function (contestId, problemId, FormData , callback) {
        $http.post(Constants.server + Constants.version + 'contest/' + contestId + '/problem/' + problemId + '/body',FormData)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })

    };

    var getPendingTeams = function (contestId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/pending_teams')
            .success(function (data , status) {
                callback(data,true);
            })
            .error(function (data, status) {
                callback(data,false);
            })
    };

    var getAcceptedTeams = function (contestId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/accepted_teams')
            .success(function (data , status) {
                callback(data,true);
            })
            .error(function (data, status) {
                callback(data,false);
            })
    };

    var teamGetList = function (contestId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/team')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var teamJoin = function (contestId, JSON, callback) {
        $http.post(Constants.server + Constants.version + 'contest/' + contestId + '/team' , JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var teamUnJoin = function (contestId, teamId, callback) {
        $http.delete(Constants.server + Constants.version + 'contest/' + contestId + '/team/' + teamId)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var teamReject = function (contestId, teamId, callback) {
        $http.delete(Constants.server + Constants.version + 'contest/' + contestId + '/team/' + teamId + '/acceptation')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var teamAccept = function (contestId, teamId, callback) {
        $http.patch(Constants.server + Constants.version + 'contest/' + contestId + '/team/' + teamId + '/acceptation')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var getResult = function (contestId , callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/result')
            .success(function (data,status) {
                callback(data,true);
            })
            .error(function (data,satus) {
                callback(data,false)
            })
    };

    return {
        getAllContestsList: getAllContestsList,
        createContest: createContest,
        getAdminContests: getAdminContests,
        getOwnerContests: getOwnerContests,
        getContestsOfTeam: getContestsOfTeam,
        getContestInfoById: getContestInfoById,
        editContest: editContest,
        getContestAdminList: getContestAdminList,
        addAdmin:addAdmin,
        removeAdmin:removeAdmin,
        getProblemsList:getProblemsList,
        problemChangeOrder: problemChangeOrder,
        createProblem: createProblem,
        deleteProblem: deleteProblem,
        getProblemInfo:getProblemInfo,
        editProblem:editProblem,
        problemDownloadBody:problemDownloadBody,
        problemUploadBody:problemUploadBody,
        getPendingTeams:getPendingTeams,
        getAcceptedTeams:getAcceptedTeams,
        teamGetList: teamGetList,
        teamJoin: teamJoin,
        teamUnJoin: teamUnJoin,
        teamReject: teamReject,
        getResult:getResult,
        teamAccept: teamAccept
    }
};

contestModule.factory("ContestModel", ContestModel);