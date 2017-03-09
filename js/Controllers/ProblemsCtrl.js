var ProblemsCtrl = function ($scope, $rootScope, ContestModel, UserModel, $stateParams , Temp) {

    $rootScope.problemsInfo = {} ;
    $scope.showProblemsEmptyError = false ;

    ContestModel.getProblemsList($rootScope.contestId ,function (data, status) {
        if (status) {
            $rootScope.problemsInfo = data.problems ;
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

ijust.controller("ProblemsCtrl", ProblemsCtrl);