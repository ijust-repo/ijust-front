var RankListCtrl = function ($scope , $rootScope , SubmissionModel , ContestModel) {
    $rootScope.notifyLoader = true;
    $scope.rankList = {} ;
    $scope.result = {};
    $scope.problemNumbers = [];
    $scope.problems = {} ;
    $scope.resultKeys =[];
    $scope.problemsKeys=[];
    $scope.teamsKeys=[];

    ContestModel.getResult($rootScope.contestId,function (data,status) {
        if(status){
            $scope.result = data ;
            $rootScope.notifyLoader = false;
            // $scope.resultKeys = Object.keys(data.result);
            // $scope.problemsKeys = Object.keys(data.problems);
            // $scope.teamsKeys = Object.keys(data.teams);
            // $scope.findTeam(data.result , data.teams , $scope.rankList)
            // $scope.result.result = $scope.fillTheBlanks($scope.result.result , $scope.result.problems);
            console.log($scope.result);
            // if($scope.result.result){
            //     for(var obj in $scope.result.result){
            //         $scope.problems = $scope.result.result[obj].problems ;
            //         break;
            //     }
            // }
        }
    });
    //
    // $scope.fillTheBlanks = function (resultList , problemsObj) {
    //     for(var i=0 ; i<resultList.length ; i++){
    //         var ii = resultList[i].problems ;
    //         for(var problemId in problemsObj){
    //             for(var j=0 ; j< ii ; j++){
    //                 if (!problemId == ii[j]){
    //                     // resultList[i].problems[j] =
    //                 }
    //             }
    //         }
    //     }
    // };

    $scope.getTeamName = function (id) {
        for (var i=0; i<$scope.result.teams.length ; i++){
            if($scope.result.teams[i].id == id){
                return $scope.result.teams[i].name ;
            }
        }
    };

    $scope.getProblemName=function(id) {
        for (var i=0; i<$scope.result.problems.length ; i++){
            if($scope.result.problems[i].id == id){
                return $scope.result.problems[i].title ;
            }
        }
    };

    // ContestModel.getContestInfoByName($scope.contestName , function (data , status) {
    //     if(status){
    //         $scope.contestInfo = data ;
    //         $scope.contestId = data.id ;
    //         $rootScope.contestId = $scope.contestId ;
    //         UserModel.getUserProfile(function (data , status) {
    //             if(status){
    //                 $scope.username = data.username ;
    //                 $scope.userId = data.id ;
    //                 UserModel.getUserTeams($scope.userId , function (data , status) {
    //                     $scope.myTeams = data.teams ;
    //                     for (var i=0 ; i < data.teams.length ; i++ ){
    //                         for(var j=0 ; j<data.teams[i].contests.length ; j++){
    //                             Temp.joinedContests.push(data.teams[i].contests[j].name) ;
    //                             if (data.teams[i].contests[j].name == $scope.contestName){
    //                                 if(data.teams[i].contests[j].status == 'accepted'){
    //                                     // $scope.teamName = data.teams[i].name ;
    //                                     $scope.teamId = data.teams[i].id ;
    //                                     Temp.teamName = data.teams[i].name ;
    //                                     $scope.isJoined = true ;
    //                                     Temp.userState = "joined" ;
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 });
    //                 if($scope.contestInfo.owner.username == $scope.username){
    //                     $scope.isOwner = true ;
    //                     $scope.teamId = 'dudeAdmin' ;
    //                     ContestModel.getPendingTeams($scope.contestId , function (data , status) {
    //                         if(status){
    //                             $scope.pendingTeamsNumber = data.teams.length ;
    //                             $scope.isShowTeamButton = true ;
    //                             $scope.pendingTeams = data.teams ;
    //                             $rootScope.notifyLoader = false;
    //                         }
    //                         else {
    //                             //nth
    //                         }
    //                     });
    //                 }
    //                 else {
    //                     $rootScope.notifyLoader = false;
    //                 }
    //             }
    //         });
    //         $('.thisContest').removeClass('loading');
    //         ContestModel.getRankList($rootScope.contestId , function (data , status) {
    //             if(status){
    //                 // console.log(data);
    //                 $scope.rankList = data.teams;
    //                 for(var i=0; i<data.problem_num ; i++){
    //                     $scope.problemNumbers[i] = i+1 ;
    //                 }
    //                 for( i=0 ; i<data.teams.length ; i++){
    //                     var teamIndex = $scope.rankList[i];
    //                     if(data.teams[i].team.name == Temp.teamName){
    //                         $scope.myTeamObj = data.teams[i] ;
    //                     }
    //                     var lenghteKharKosde = teamIndex.problems_list.length;
    //                     for( var j=0 ; j<lenghteKharKosde ; j++ ) {
    //                         var order = teamIndex.problems_list[j].order ;
    //                         if ( order != j+1 ){
    //                             teamIndex.problems_list[order-1]=$scope.rankList[i].problems_list[j];
    //                             delete $scope.rankList[i].problems_list[j];
    //                         }
    //                     }
    //                     console.log($scope.myTeamObj)
    //                 }
    //
    //                 $scope.getProblemsList=function (araye) {
    //                     for(var i=0 ; i<araye.length ; i++){
    //                         if(araye[i] == undefined){
    //                             araye[i]=({
    //                                 failed_tries:0 ,
    //                                 failed_tries_reason:"no tries to accept" ,
    //                                 order:null ,
    //                                 problem_id:null ,
    //                                 solved: "unknown" ,
    //                                 solved_on : "null"
    //                             })
    //                         }
    //                     }
    //                     return araye ;
    //                 };
    //             }
    //         });
    //     }
    //     else{
    //         //nth
    //     }
    // });
    $scope.mapToString = function (num) {
        switch (num) {
            case 0 : return 'A' ;
                break;
            case 1 : return 'B' ;
                break;
            case 2 : return 'C' ;
                break ;
            case 3 : return 'D' ;
                break ;
            case 4 : return 'E' ;
                break;
            case 5 : return 'F' ;
                break ;
            case 6 : return 'G' ;
                break ;
            case 7 : return 'H' ;
                break;
            case 8 : return 'I' ;
                break;
            case 9 : return 'J' ;
                break;
            default : return num ;
        }
    }
};

ijust.controller('RankListCtrl' , RankListCtrl);