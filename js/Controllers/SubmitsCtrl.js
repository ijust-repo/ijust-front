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
    $scope.showCode = function (sid,lang,name) {
        $('#codeDiv').slideDown(1000);
        $('#codeDiv .segment').addClass('loading');
        $scope.problemName = name ;
        if($scope.code){
            $scope.code = "" ;
            // $('pre').append($('<code>{{code}}</code>'))
        }
        $('pre code').empty();
        SubmissionModel.downloadCode(sid,function (data,status) {
            if (status){
                $scope.code = data ;
                $('pre code').append(data);
                $timeout(function () {
                    $('pre code').each(function(i, block) {
                        hljs.highlightBlock(block);
                    });
                    $('#codeDiv .segment').removeClass('loading');
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
    };
    $('#closeCodeDiv').on('click',function () {
        $('#codeDiv').slideUp();
    });
};

ijust.controller('SubmitsCtrl' , SubmitsCtrl);