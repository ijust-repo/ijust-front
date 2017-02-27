var RootCtrl = function ($scope, $rootScope, UserModel ,
                         $cookies , $state , $localStorage ,
                         TeamModel) {

    $scope.newTeamInfo = {};
    $scope.newTeamInfo.members = [];
    $scope.showCreateTeamError = false ;
    $scope.showCreateTeamSuccess = false ;
    
    if(!$localStorage.token){
        $state.go('/');
    }

    $scope.logOut = function () {
        $scope.logOutLoader = true ;
        // UserModel.logOut(function (data , status) {
        //     if(status){
        //         $rootScope.isAuthenticated = false ;
        //         delete $localStorage.token ;
        //         setTimeout($scope.logOutLoader = false ,1000);
        //         $state.go('/');
        //     }
        // }) ;
        $rootScope.isAuthenticated = false ;
        delete $localStorage.token ;
        setTimeout($scope.logOutLoader = false ,2000);
        $state.go('/');
    };

    $scope.createTeam = function () {
        TeamModel.createTeam($scope.newTeamInfo , function (data , status) {
            if(status){
                $scope.showCreateTeamSuccess = true ;
                $scope.createTeamSuccess = "Your Team Created Successfully" ;
                $scope.newTeamInfo = {};
            }
            else{
                $scope.showCreateTeamError = true ;
                $scope.createTeamError = data.errors ;
                $scope.newTeamInfo = {};
            }
        })
    };

    $('#createTeam').on('click',function () {
        $('.small.modal')
            .modal('show')
        ;
    });

};

ijust.controller("RootCtrl", RootCtrl);
