var SubmitsCtrl = function ($scope, $rootScope, SubmissionModel, SubmissionServices, $timeout) {

    $rootScope.notifyLoader = true;
    $scope.submitsInfo = {};
    $scope.reason = {};
    $scope.code = "";
    document.title = "Contest Submits";
    try {
        if ($rootScope.myTeam.id) {
            SubmissionModel.getAllSubmissionInContest($rootScope.contestId, $rootScope.myTeam.id, function (data, status) {
                if (status) {
                    console.log(data);
                    $scope.submitsInfo = data.submissions;
                    $rootScope.notifyLoader = false;
                }
            });
        }
        else {
            SubmissionModel.getAllSubmissionInContest_admin($rootScope.contestId, function (data, status) {
                if (status) {
                    console.log(data);
                    $scope.submitsInfo = data.submissions;
                    $rootScope.notifyLoader = false;
                }
            });
        }
    }
    catch (e) {
        // console.log(e);
    }

    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };

    $scope.showCode = function (sid, lang, name, file) {
        $('#codeDiv').slideDown(1000);
        $('#codeDiv .segment').addClass('loading');
        $scope.problemName = name;
        $scope.filename = file;
        if ($scope.code) {
            $scope.code = "";
            $('pre code').removeClass(className);
        }
        $('pre code').empty();
        SubmissionModel.downloadCode(sid, function (data, status) {
            if (status) {
                $scope.code = data;
                $timeout(function () {
                    var html = Prism.highlight($scope.code, Prism.languages.cpp);
                    Prism.plugins.NormalizeWhitespace.setDefaults({
                        'remove-trailing': true,
                        'remove-indent': true,
                        'left-trim': true,
                        // 'right-trim': true,
                        'break-lines': 80,
                        'indent': 2
                        // 'remove-initial-line-feed': false,
                        // 'tabs-to-spaces': 4,
                        // 'spaces-to-tabs': 4*
                    });
                    className = SubmissionServices.getLang(lang);
                    $('pre code').addClass(className);
                    $('pre code').append('<br>' + html);
                    // console.log(html);
                    $('#codeDiv .segment').removeClass('loading');
                }, 500);
            }
            else {
                //
            }
        })
    };

    $scope.showReasonModal = function (p,f,s,r) {
        $scope.reason = {
            problem : p ,
            filename : f ,
            status : s ,
            reason : r
        };
        $('#reasonModal')
            .modal('show')
        ;
    };

    $('#closeCodeDiv').on('click', function () {
        $('#codeDiv').slideUp();
    });
};

ijust.controller('SubmitsCtrl', SubmitsCtrl);