var RootCtrl = function ($scope, $rootScope, UserModel,
                         $cookies, $state, $localStorage,
                         TeamModel,UserModel) {

    $scope.newTeamInfo = {};
    $scope.newTeamInfo.members = [];
    $rootScope.thisUserInfo={};
    $scope.init_CreateTeam = function () {
        $scope.showCreateTeamError = false;
        $scope.showCreateTeamSuccess = false;
        $scope.createTeamError = "";
        $scope.createTeamSuccess = "";
    };
    $rootScope.userProfileLoader=false;
    $scope.init_CreateTeam();
    $rootScope.userInfo = {};

    if (!$localStorage.token) {
        $state.go('/');
    }

    UserModel.getMyInfo(function (data, status) {
        if (status) {
            $rootScope.userInfo = data;
        }
    });

    $scope.logOut = function () {
        $('#logOutBtn').addClass('loading');
        $scope.logOutLoader = true;
        UserModel.logOut(function (data, status) {
            if (status) {
                $rootScope.isAuthenticated = false;
                delete $localStorage.token;
                delete $rootScope.userInfo;
                delete  $localStorage.myTeams;
                setTimeout($scope.logOutLoader = false, 1000);
                $state.go('/');
                $('#logOutBtn').removeClass('loading');
            }
        });
    };

    $scope.emptyTeamInfo = function () {
        $scope.showCreateTeamError = false;
        $scope.showCreateTeamSuccess = false;
        $scope.createTeamError = "";
        $scope.createTeamSuccess = "";
        $scope.newTeamInfo = {};
        $scope.newTeamInfo.members = [];
    };

    $scope.createTeam = function () {
        console.log($scope.newTeamInfo);
        TeamModel.createTeam($scope.newTeamInfo, function (data, status) {
            if (status) {
                $scope.showCreateTeamError = false;
                $scope.showCreateTeamSuccess = true;
                $scope.createTeamSuccess = "Your Team is Created Successfully";
                $scope.newTeamInfo = {};
                $rootScope.myTeams.push(data);
                // $localStorage.myTeams.push(data);
                $rootScope.teamsEmptyError = false;
                console.log($rootScope.myTeams);
            }
            else {
                $scope.showCreateTeamSuccess = false;
                $scope.showCreateTeamError = true;
                $scope.createTeamError = data;
                $scope.newTeamInfo = {};
                $scope.newTeamInfo.members = [];
                console.log(data);
            }
        })
    };

    $scope.getDate = function (timestamp) {
        var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
            dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };

    $scope.getTime = function (timestamp) {
        if(timestamp){
            var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
                hh = d.getHours(),
                h = hh,
                min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
                ampm = 'AM',
                time;

            if (hh > 12) {
                h = hh - 12;
                ampm = 'PM';
            } else if (hh === 12) {
                h = 12;
                ampm = 'PM';
            } else if (hh == 0) {
                h = 12;
            }

            // ie: 8:35 AM
            time = h + ':' + min + ' ' + ampm;
        }
        else {
            time = "--";
        }
        return time;
    };

    $('#createTeam').on('click', function () {
        $scope.init_CreateTeam();
        $('.small.modal.createTeamModal')
            .modal('show')
        ;
    });
    $rootScope.openUserModal=function(userId) {
        $rootScope.userProfileLoader=true;
        $('.small.modal.userModal')
            .modal('show')
        ;
        UserModel.getUserProfile(userId,function (data,status) {
           if(status){
               $rootScope.userProfileLoader=false;
               $rootScope.thisUserInfo=data;
           }
           else {
               //nth
           }
        });
    };
    $('.ui.dropdown')
        .dropdown();

};

ijust.controller("RootCtrl", RootCtrl);
