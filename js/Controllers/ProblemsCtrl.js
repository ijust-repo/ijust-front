var ProblemsCtrl = function ($scope, $rootScope, ContestModel, UserModel, $stateParams , Temp) {

    $rootScope.problemsInfo = {} ;
    $scope.showProblemsEmptyError = false ;

    ContestModel.getProblemsList($rootScope.contestId ,function (data, status) {
        if (status) {
            $rootScope.problemsInfo = data.problems ;
            console.log(data);
            if($rootScope.problemsInfo.length==0){
                $rootScope.showProblemsEmptyError = true;
            }
            $('.problemsList').removeClass('loading');
        }
        else {
            //nth
        }
    });

    $scope.mapToString = function (num) {
      switch (num) {
          case 1 : return 'A' ;
              break;
          case 2 : return 'B' ;
              break;
          case 3 : return 'C' ;
              break ;
          case 4 : return 'D' ;
              break ;
          case 5 : return 'E' ;
              break;
          case 6 : return 'F' ;
              break ;
          case 7 : return 'G' ;
              break ;
          case 8 : return 'H' ;
              break;
          default : return num ;
      }
    }

};

ijust.controller("ProblemsCtrl", ProblemsCtrl);