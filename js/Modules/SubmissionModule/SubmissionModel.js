var SubmissionModel = function ($http, Constants) {
    var getAllSubmissionInContest = function (contestId, teamId, callback) {
        $http.get(Constants.server + Constants.version + 'submission/contest/' + contestId + '/team/' + teamId)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var getAllSubmissionInContest_admin = function (contestId, callback) {
        $http.get(Constants.server + Constants.version + 'submission/contest/' + contestId)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };

    var getAllSubmissionInContestOfProblem = function (teamId, contestId, problemId, callback) {
        $http.get(Constants.server + Constants.version + 'submission/team/' + teamId + '/contest/' + contestId + '/problem/' + problemId)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
            })
    };
    var downloadCode = function (submissionId, callback) {
        $http.get(Constants.server + Constants.version + 'submission/' + submissionId + '/code')
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                callback(data, false);
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