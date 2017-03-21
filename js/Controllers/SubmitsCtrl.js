var SubmitsCtrl = function ($scope , $rootScope , SubmissionModel , SubmissionServices , $timeout) {
    $rootScope.notifyLoader = true ;
    $scope.submitsInfo = {};
    $scope.code = "";
    try {
        SubmissionModel.getAllSubmissionInContest( $rootScope.contestId , $rootScope.myTeam.id , function (data,status) {
            if (status){
                console.log(data);
                $scope.submitsInfo = data.submissions ;
                $rootScope.notifyLoader = false ;
            }
        });
    }
    catch (e){
        // console.log(e);
    }
    $scope.showCode = function (sid,lang) {
        if($scope.code){
            $scope.code = "" ;
            // $('pre').append($('<code>{{code}}</code>'))
        }
        $('pre code').empty();
        SubmissionModel.downloadCode(sid,function (data,status) {
            if (status){
                console.log(data[0],data[1]);
                $scope.code = data ;
                console.log(SubmissionServices.getLang(lang));
                console.log(lang);
                $('pre code').append(data);
                $timeout(function () {
                    $('pre code').each(function(i, block) {
                        hljs.highlightBlock(block);
                    });
                },500);
                // $('pre code').addClass(SubmissionServices.getLang(lang)).each(function(i, block) {
                //     hljs.highlightBlock(block);
                // });
                // $('pre code').each(function(i, block) {
                //     hljs.highlightBlock(block);
                // });
            }
            else{
                //
            }
        })
    }
};

ijust.controller('SubmitsCtrl' , SubmitsCtrl);