var SubmissionModel = function ($http, Constants) {
    var getAllSubmissionInContest = function (contestId, teamId, callback) {
        $http.get(Constants.server + Constants.version + 'submission/contest/' + contestId + '/team/' + teamId)
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
                        msg = "Token is invalid or has expired.please sign in again";
                        break;
                    case 403:
                        msg = "You aren't owner or member of the team Or You aren't owner or admin of the contest";
                        break;
                    case 404:
                        msg = 'Team or contest does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var getAllSubmissionInContest_admin = function (contestId, callback) {
        $http.get(Constants.server + Constants.version + 'submission/contest/' + contestId)
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
                        msg = "Token is invalid or has expired.please sign in again";
                        break;
                    case 403:
                        msg = "You aren't owner or member of the team Or You aren't owner or admin of the contest";
                        break;
                    case 404:
                        msg = 'Team or contest does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var getAllSubmissionInContestOfProblem = function (teamId, contestId, problemId, callback) {
        $http.get(Constants.server + Constants.version + 'submission/contest/' + contestId + '/problem/' + problemId + '/team/' + teamId)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 400:
                        msg = 'Bad request';
                        break;
                    case 403:
                        msg = "You aren't owner or member of the team Or You aren't owner or admin of the contest";
                        break;
                    case 404:
                        msg = 'Team or contest does not exist';
                        break;
                    case 401:
                        msg = 'Token is invalid or has expired.please sign in again';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };

    var downloadCode = function (submissionId, callback) {
        $http.get(Constants.server + Constants.version + 'submission/' + submissionId + '/code')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg ;
                switch (status){
                    case 403:
                        msg = "You aren't owner or member of the team Or You aren't owner or admin of the contest";
                        break;
                    case 401:
                        msg = "Token is invalid or has expired.please sign in again";
                        break;
                    case 404:
                        msg = 'Submission does not exist';
                        break;
                    default :
                        msg = 'Unknown Error!Try again';
                }
                callback(msg, false);
            })
    };
    return {
        getAllSubmissionInContest: getAllSubmissionInContest,
        getAllSubmissionInContest_admin: getAllSubmissionInContest_admin,
        getAllSubmissionInContestOfProblem: getAllSubmissionInContestOfProblem,
        downloadCode: downloadCode
    }
};
submissionModule.factory("SubmissionModel", SubmissionModel);