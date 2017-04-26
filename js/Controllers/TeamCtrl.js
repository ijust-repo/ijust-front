var TeamCtrl = function ($scope , mtNotifyService , TeamModel , ContestModel , $rootScope ,$stateParams,$state) {

    $rootScope.notifyLoader = true ;
    $scope.teamId = $stateParams.teamId ;
    $scope.teamInfo = {} ;
    $scope.contestsList = {} ;
    $scope.joinedContetsEmptyError = false ;
    $scope.pendingContetsEmptyError = false ;
    $scope.isOwner = false ;
    $scope.showDeleteTeamError = false ;
    $scope.deleteTeamErrorMsg = "" ;
    $scope.editTeamInfo = {};

    TeamModel.getTeamInfo($scope.teamId , function (data , status) {
        if (status) {
            $scope.teamInfo = data ;
            $scope.editTeamInfo = jQuery.extend(true,{}, $scope.teamInfo); // should be solved somehow good
            console.log($scope.editTeamInfo,'ds');
            if($scope.teamInfo.owner.username == $rootScope.userInfo.username){
                $scope.isOwner = true ;
            }
            $('.teamInfo').removeClass('loading');
            console.log(data);
        }
    });
    ContestModel.getContestsOfTeam($scope.teamId,function (data,status) {
        if (status){
            $scope.contestsList = data ;
            $('.otherContests').removeClass('loading');
            if (data.joined_contests.length==0){
                $scope.joinedContetsEmptyError = true ;
            }
            if (data.waiting_contests.length==0){
                $scope.pendingContetsEmptyError = true ;
            }
            $rootScope.notifyLoader = false ;
        }
    });

    $scope.goToEdit = function () {
        $scope.isEdit = true ;
        $scope.editTeamInfo = jQuery.extend(true,{}, $scope.teamInfo); // should be solved somehow good
        $('.editMem').removeClass('error');
        $('.editName').removeClass('error');
    };

    $scope.editTeam = function () {
        $('#submitBtn').addClass('loading');
        var Json = {
            name:$scope.editTeamInfo.name,
            members:[]
        };
        // Json.name = $scope.editTeamInfo.name ;
        if($scope.editTeamInfo.members[0]){
            if($scope.editTeamInfo.members[0].username!=''){
                Json.members[0]= $scope.editTeamInfo.members[0].username;
            }
        }
        if($scope.editTeamInfo.members[1]){
            if($scope.editTeamInfo.members[1].username!='') {
                Json.members[1] = $scope.editTeamInfo.members[1].username;
            }
        }
        TeamModel.editTeam($scope.teamInfo.id , Json , function (data,status) {
            if(status < 300){
                $scope.teamInfo = jQuery.extend(true,{}, $scope.editTeamInfo);
                $scope.isEdit = false;
                $('#submitBtn').removeClass('loading');
            }
            else {
                console.log(data);
                $('#submitBtn').removeClass('loading');
                if(status==404){
                    $('.editMem').addClass('error');
                }
                else if (status == 409){
                    $('.editName').addClass('error')
                }
            }
        })
    };

    $scope.deleteTeam = function () {
        $('#showDeleteModal').addClass('loading');
        TeamModel.deleteTeam($scope.teamInfo.id , function (data,status) {
            if(status){
                $('#showDeleteModal').removeClass('loading');
                $state.go('home');
            }
            else {
                $scope.showDeleteTeamError = true ;
                $scope.deleteTeamErrorMsg = data ;
                alert(data);
            }
        })
    };

    $('#showDeleteModal').on('click',function () {
        $('#deleteModal')
            .modal('show')
        ;
    })

};

ijust.controller('TeamCtrl' , TeamCtrl);
