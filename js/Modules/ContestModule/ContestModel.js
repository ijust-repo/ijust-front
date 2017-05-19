var ContestModel = function ($http, Constants) {
    var getAllContestsList = function (callback) {
        $http.get(Constants.server + Constants.version + 'contest')
            .success(function (data, status) {
                callback(data, true)
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

    var createContest = function (JSON, callback) {
        $http.post(Constants.server + Constants.version + 'contest', JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 400:
                        msg = 'Bad request';
                        break;
                    case 406:
                        msg = 'EndTime must be greater than StartTime and StartTime must be greater than CreationTime';
                        break;
                    case 409 :
                        msg = 'Contest already exists';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var deleteContest = function (id, callback) {
        $http.delete(Constants.server + Constants.version + 'contest/'+id)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't owner of the contest";
                        break;
                    case 404:
                        msg = 'Contest does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var getAdminContests = function (callback) {
        $http.get(Constants.server + Constants.version + 'contest/admin')
            .success(function (data, status) {
                callback(data, true)
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

    var getOwnerContests = function (callback) {
        $http.get(Constants.server + Constants.version + 'contest/owner')
            .success(function (data, status) {
                callback(data, true)
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

    var getContestsOfTeam = function (teamId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/team/' + teamId)
            .success(function (data, status) {
                callback(data, true)
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

    var getContestInfoById = function (contestId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId)
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
                        msg = 'Contest does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var editContest = function (contestId, JSON, callback) {
        $http.put(Constants.server + Constants.version + 'contest/' + contestId, JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 400:
                        msg = 'Bad request';
                        break;
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't owner or admin of the contest";
                        break;
                    case 404:
                        msg = 'Contest does not exist';
                        break;
                    case 406:
                        msg = 'EndTime must be greater than StartTime and StartTime must be greater than CreationTime';
                        break;
                    case 409:
                        msg = 'Contest name already exists';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var getContestAdminList = function (contestId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/admin')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't owner of the contest";
                        break;
                    case 404:
                        msg = 'Contest does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var addAdmin = function (contestId, callback) {
        $http.post(Constants.server + Constants.version + 'contest/' + contestId + '/admin')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 400:
                        msg = 'Bad request';
                        break;
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 404:
                        msg = "You aren't owner of the contest";
                        break;
                    case 403:
                        msg = 'Contest or user does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var removeAdmin = function (contestId, userId, callback) {
        $http.delete(Constants.server + Constants.version + 'contest/' + contestId + '/admin/' + userId)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 400:
                        msg = 'Bad request';
                        break;
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't owner of the contest";
                        break;
                    case 404:
                        msg = 'Contest or user does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var getProblemsList = function (contestId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/problem')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't allowed to see problems";
                        break;
                    case 404:
                        msg = 'Contest does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var problemChangeOrder = function (contestId, JSON, callback) {
        $http.patch(Constants.server + Constants.version + 'contest/' + contestId + '/problem', JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 400:
                        msg = 'Bad request';
                        break;
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't owner or admin of the contest";
                        break;
                    case 404:
                        msg = 'Contest does not exist';
                        break;
                    case 406:
                        msg = 'Bad order format';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var createProblem = function (contestId, JSON, callback) {
        $http.post(Constants.server + Constants.version + 'contest/' + contestId + '/problem', JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 400:
                        msg = 'Bad request';
                        break;
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = " You aren't owner or admin of the contest";
                        break;
                    case 404:
                        msg = 'Contest does not exist';
                        break;
                    case 406:
                        msg = "You can't create more problems";
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var deleteProblem = function (contestId, problemId, callback) {
        $http.delete(Constants.server + Constants.version + 'contest/' + contestId + '/problem/' + problemId)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't owner or admin of the contest";
                        break;
                    case 404:
                        msg = 'Contest or problem does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var getProblemInfo = function (contestId, problemId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/problem/' + problemId)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't allowed to see problem";
                        break;
                    case 404:
                        msg = 'Contest or problem does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })

    };

    var editProblem = function (contestId, problemId, JSON, callback) {
        $http.put(Constants.server + Constants.version + 'contest/' + contestId + '/problem/' + problemId, JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 400:
                        msg = 'Bad request';
                        break;
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't owner or admin of the contest";
                        break;
                    case 404:
                        msg = 'Contest or problem does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })

    };

    var problemDownloadBody = function (contestId, problemId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/problem/' + problemId + '/body')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't allowed to see problem body";
                        break;
                    case 404:
                        msg = 'Contest or problem does not exist, File does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })

    };

    // var problemUploadBody = function (contestId, problemId, FormData , callback) {
    //     $http.post(Constants.server + Constants.version + 'contest/' + contestId + '/problem/' + problemId + '/body',FormData)
    //         .success(function (data, status) {
    //             callback(data, true);
    //         })
    //         .error(function (data, status) {
    //             var msg ;
    //             switch (status){
    //                 case 401:
    //                     msg = 'Token is invalid or has expired';
    //                     break;
    //                 default :
    //                     msg = 'Unknown Error';
    //             }
    //             callback(msg, false);
    //         })
    //
    // };

    var getPendingTeams = function (contestId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/pending_teams')
            .success(function (data , status) {
                callback(data,true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't owner or admin of the contest";
                        break;
                    case 404:
                        msg = 'Contest does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var getAcceptedTeams = function (contestId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/accepted_teams')
            .success(function (data , status) {
                callback(data,true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't owner or admin of the contest";
                        break;
                    case 404:
                        msg = 'Contest does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var teamGetList = function (contestId, callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/team')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 400:
                        msg = 'Bad request';
                        break;
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't owner of the team";
                        break;
                    case 404:
                        msg = 'Contest or Team does not exist';
                        break;
                    case 409:
                        msg = 'You are already accepted';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var teamJoin = function (contestId, JSON, callback) {
        $http.post(Constants.server + Constants.version + 'contest/' + contestId + '/team' , JSON)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 400:
                        msg = 'Bad request';
                        break;
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't owner of the team";
                        break;
                    case 404:
                        msg = 'Contest or Team does not exist';
                        break;
                    case 409:
                        msg = 'You are already accepted';
                        break;
                    default :
                        msg = 'Unknown Error';
                }
                callback(msg, false);
            })
    };

    var teamUnJoin = function (contestId, teamId, callback) {
        $http.delete(Constants.server + Constants.version + 'contest/' + contestId + '/team/' + teamId)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 400:
                        msg = 'Bad request';
                        break;
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't owner of the team";
                        break;
                    case 404:
                        msg = 'Contest or Team does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var teamReject = function (contestId, teamId, callback) {
        $http.delete(Constants.server + Constants.version + 'contest/' + contestId + '/team/' + teamId + '/acceptation')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't owner or admin of the contest";
                        break;
                    case 404:
                        msg = 'Contest or Team does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var teamAccept = function (contestId, teamId, callback) {
        $http.patch(Constants.server + Constants.version + 'contest/' + contestId + '/team/' + teamId + '/acceptation')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't owner or admin of the contest";
                        break;
                    case 404:
                        msg = 'Contest or Team does not exist';
                        break;
                    default :
                        msg = 'Unknown Error';
                }
                callback(msg, false);
            })
    };

    var getResult = function (contestId , callback) {
        $http.get(Constants.server + Constants.version + 'contest/' + contestId + '/result')
            .success(function (data,status) {
                callback(data,true);
            })
            .error(function (data,satus) {
                var msg ;
                switch (status){
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    case 403:
                        msg = "You aren't owner or admin of the contest";
                        break;
                    case 404:
                        msg = 'Contest or Team does not exist';
                        break;
                    default :
                        msg = 'Unknown Error';
                }
                callback(msg, false);
            })
    };

    return {
        getAllContestsList: getAllContestsList,
        createContest: createContest,
        deleteContest:deleteContest,
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
        // problemUploadBody:problemUploadBody,
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