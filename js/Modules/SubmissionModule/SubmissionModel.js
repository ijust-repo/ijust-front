var SubmissionModel = function ($http, Constants) {
    var getAllSubmissionInContest = function (contestId, teamId, callback) {
        $http.get(Constants.server + Constants.version + 'submission/contest/' + contestId + '/team/' + teamId)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg;
                if (status == 400) {
                    msg = "لطفا دوباره تلاش کنید"
                } else if (status == 401) {
                    msg = "نشست شما به پایان رسیده است"
                } else if (status == 403) {
                    msg = "شما عضو این تیم نیستید"
                } else if (status == 404) {
                    msg = "تیم یا مسابقه مورد نظر یافت نشد"
                } else {
                    msg = "خطای ناشناخته"
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
                var msg;
                if (status == 400) {
                    msg = "لطفا دوباره تلاش کنید"
                } else if (status == 401) {
                    msg = "نشست شما به پایان رسیده است"
                } else if (status == 403) {
                    msg = "شما عضو این تیم نیستید"
                } else if (status == 404) {
                    msg = "تیم یا مسابقه مورد نظر یافت نشد"
                } else {
                    msg = "خطای ناشناخته"
                }
                callback(msg, false);
            })
    };

    var getAllSubmissionInContestOfProblem = function (teamId, contestId, problemId, callback) {
        $http.get(Constants.server + Constants.version + 'submission/team/' + teamId + '/contest/' + contestId + '/problem/' + problemId)
            .success(function (data, status) {
                callback(data, true);
            })
            .error(function (data, status) {
                var msg;
                if (status == 400) {
                    msg = "لطفا دوباره تلاش کنید"
                } else if (status == 401) {
                    msg = "نشست شما به پایان رسیده است"
                } else if (status == 403) {
                    msg = "شما عضو این تیم نیستید"
                } else if (status == 404) {
                    msg = "تیم یا مسابقه مورد نظر یافت نشد"
                } else {
                    msg = "خطای ناشناخته"
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
                var msg;
                if (status == 401) {
                    msg = "نشست شما به پایان رسیده است"
                } else if (status == 403) {
                    msg = "شما عضو این تیم نیستید"
                } else if (status == 404) {
                    msg = "کد مورد نظر یافت نشد"
                } else {
                    msg = "خطای ناشناخته"
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