var HomeCtrl = function ( $scope , mtNotifyService , ContestModel , UserModel , $rootScope) {

    $rootScope.notifyLoader = true ;
    
    $scope.ownedContets = {} ;
    $scope.contestsList = {} ;
    $scope.contestsList = {} ;

    var contestsList = {} ;
    var contestsList_copy = {} ;
    var contestsCount = 0 ;
    var userInfo = {} ;
    var myUserName ;
    var myId ;
    var ownedContests = {} ;
    var myContestsNames = [];
    var joinedContests = {} ;

    UserModel.getUserProfile(function (data , status) {
        if (status){
            userInfo = data ;
            myUserName = userInfo.username ;
            myId = userInfo.id ;
            UserModel.getUserTeams( myId , function (data , status) {
                if (status){
                    for(var i=0 ; i <data.teams.length ; i++){
                        if(data.teams[i].contests[0] !=undefined){
                            if(data.teams[i].contests[0].status == "accepted"){
                                myContestsNames[i] = data.teams[i].contests[0].name ;
                            }
                        }
                    }
                }
                else{
                    //nth
                }
            });
            ContestModel.getContestsList(function (data , status) {
                if(status){
                    contestsList = data.contests ;

                    // owned Contests:

                    for (var i=0 ; i<contestsList.length ; i++ ){
                        if (contestsList[i].owner.username == myUserName ){
                            ownedContests[i] = contestsList[i];
                            delete contestsList[i];
                        }
                    }
                    $scope.ownedContets = ownedContests ;
                    $('.ownedContests').removeClass('loading');

                    // // joined Contests
                    //
                    // for ( var j=0 ; j < myContestsNames.length ; j++) {
                    //     for( var k=0 ; k < contestsList.length ; k++){
                    //         if ( contestsList[k] != undefined){
                    //             if ( myContestsNames[j] == contestsList[k].name ){
                    //                 joinedContests[j] = contestsList[k];
                    //                 delete contestsList[k];
                    //             }
                    //         }
                    //     }
                    // }
                    // $scope.joinedContests = joinedContests ;
                    // $('.joinedContests').removeClass('loading');

                    // all Contests

                    for (var a=0 ; a<contestsList.length ; a++) {
                        if(contestsList[a] != undefined){
                            contestsCount++ ;
                        }
                    }
                    for (var b=0 ; b<contestsCount ; b++) {
                        for ( var c=0 ; c<contestsList.length ; c++) {
                            if(contestsList[c] != undefined){
                                contestsList_copy[b]=contestsList[c] ;
                                delete contestsList[c];
                                break ;
                            }
                        }
                    }
                    $scope.contestsList = contestsList_copy ;
                    $('.otherContests').removeClass('loading');
                    
                    $rootScope.notifyLoader = false ;
                }
                else {
                    //nth
                }
            });
        }
        else{
            //nth
        }
    });
};

ijust.controller('HomeCtrl' , HomeCtrl);