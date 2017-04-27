var ProblemsCtrl = function ($scope, $rootScope, ContestModel,$state,Upload,Constants,$timeout) {

    $rootScope.problemsInfo = [] ;
    $scope.showProblemsEmptyError = false ;
    $rootScope.notifyLoader = true;
    $scope.editProblemInfo = {};
    $scope.problemName = '';
    $scope.showEditProblemError = false;

    var toggleState = [1];
    $('.toggleIcon').on('click',function () {
        if(toggleState[0]){
            $('.problemsList').stop().slideToggle();
            $('.toggleIcon i').removeClass('minus').addClass('caret down');
            toggleState.pop();
        }
        else {
            $('.problemsList').stop().slideToggle();
            $('.toggleIcon i').removeClass('caret down').addClass('minus');
            toggleState.push(1);
        }
    });

    ContestModel.getProblemsList($rootScope.contestId ,function (data, status) {
        if (status) {
            $rootScope.problemsInfo = data.problems ;
            console.log(data);
            if($rootScope.problemsInfo.length==0){
                $rootScope.showProblemsEmptyError = true;
            }
            // $('.problemsList').removeClass('loading');
            $rootScope.notifyLoader = false;
        }
        else {
            //nth
        }
    });

    $scope.showDeleteProblemModal = function (id,index,name) {
        $scope.problemName = name ;
        $('#deleteModal')
            .modal('show')
        ;
        $scope.deleteProblem = function () {
            $('#'+id).addClass('loading');
            ContestModel.deleteProblem($rootScope.contestId,id,function (data,status) {
                if(status){
                    $state.go('contest.problems');
                    $scope.problemsInfo.splice(index,1);
                    if($rootScope.problemsInfo.length==0){
                        $rootScope.showProblemsEmptyError = true;
                    }
                    $('#'+id).removeClass('loading');
                }
                else {
                    alert(data.errors)
                }
            })
        }
    };
    $scope.showDropDown = function (id,index) {
        $('.ui.dropdown')
            .dropdown()
        ;

        $scope.showEditProblemError = false;
        $scope.editProblemError = {};
        $scope.editProblem = function () {
            $('#'+id).addClass('loading');
            ContestModel.editProblem($rootScope.contestId,id,$scope.editProblemInfo,function (data,status) {
                if(status){
                    $state.go('contest.problems');
                    if( $scope.editProblemInfo.title)
                        $scope.problemsInfo[index].title = $scope.editProblemInfo.title ;
                    $('#'+id).removeClass('loading');
                    $scope.editProblemInfo = {};
                }
                else{
                  $scope.showEditProblemError = true;
                  $scope.editProblemError = data.error;
                  $('#'+id).removeClass('loading');
                  $scope.editProblemInfo = {};
                  //console.log($scope.editProblemError );
                }
            });
        };
    };

    $scope.uploadBody = function (file, errFiles,id) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            $('#'+id).addClass('loading');
            console.log(file);
            formData = [
                {
                    body:file
                }
            ] ;
            console.log(formData);
            file.upload = Upload.upload({
                method: "POST",
                url: Constants.server + Constants.version + 'contest/' + $rootScope.contestId + '/problem/' + id +'/body',
                data: {body:file}
            });

            file.upload.then(function (response) {
                console.log(response);
                $timeout(function () {
                    file.result = response.data;
                    $scope.buttonLoader = false;
                    if (response.status >= 400){
                        $('#'+id).removeClass('loading');
                        $scope.errorMsg = response.status + ': ' + response.data;
                        alert($scope.errorMsg);
                    }
                    else if (response.status==200){
                        $('#'+id).removeClass('loading');
                    }
                }, 500);
            },function (response) {
                $scope.showEditProblemError = true;
                $scope.editProblemError = response.data.error;
                $('#'+id).removeClass('loading');
            });
            // file.upload();
        }
    };

    $scope.uploadTestCase = function (file, errFiles,id) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            $('#'+id).addClass('loading');
            console.log(file);
            file.upload = Upload.upload({
                method: "POST",
                url: Constants.server + Constants.version + 'contest/' + $rootScope.contestId + '/problem/' + id + '/testcase',
                data: {testcase:file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    $scope.buttonLoader = false;
                    if (response.status >= 400){
                        $scope.errorMsg = response.status + ': ' + response.data;
                        alert($scope.errorMsg);
                        $('#'+id).removeClass('loading');
                    }
                    else if (response.status==200){
                        $('#'+id).removeClass('loading');
                    }
                }, 500);
            },function (response) {
                $scope.showEditProblemError = true;
                $scope.editProblemError = response.data.error;
                $('#'+id).removeClass('loading');
            });
        }
    };

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
    };

};

ijust.controller("ProblemsCtrl", ProblemsCtrl);