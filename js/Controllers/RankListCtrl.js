var RankListCtrl = function ($scope, $rootScope, SubmissionModel, ContestModel) {

    $rootScope.notifyLoader = true;
    $scope.result = {};
    $scope.problems = {};

    $scope.updateRankList = function () {
        $rootScope.notifyLoader = true;
        $scope.result = {};
        $scope.problems = {};

        ContestModel.getResult($rootScope.contestId, function (data, status) {
            if (status) {

                $scope.result = data;
                $scope.problems = data.problems ;

                teams = $scope.result.teams;
                problems = $scope.result.problems;
                result = $scope.result.result;

                for (var i = 0; i < teams.length; i++)
                {
                    teams[i].penalty = 0;
                    teams[i].solved_count = 0;
                    teams[i].problems = new Array(problems.length).fill({solved: 'unknown',failed_tries:0,penalty:0});

                    var tid = teams[i].id;
                    if (result[tid] != undefined)
                    {
                        teams[i].penalty = result[tid].penalty;
                        teams[i].solved_count = result[tid].solved_count;

                        for (var j = 0; j < problems.length; j++)
                        {
                            var pid = problems[j].id;
                            if (result[tid].problems[pid] != undefined)
                                teams[i].problems[j] = result[tid].problems[pid];
                        }
                    }
                }

                console.log(data);
                $rootScope.notifyLoader = false;
            }
        });
    };

    $scope.updateRankList();
};

ijust.controller('RankListCtrl', RankListCtrl);