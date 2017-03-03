var ijust = angular.module("ijust",
    [
        'ui.router', "ngStorage", "ngFileUpload", "ngCookies",
        "mtNotify",
        "userModule", "teamModule" , "contestModule"
    ])

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
        // $httpProvider.defaults.withCredentials = true ;
        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: '/templates/landing.html',
                controller: 'LandingCtrl'
            })
            .state('teams' , {
                url : '/teams' ,
                templateUrl: '/templates/teams.html' ,
                controller : 'TeamsCtrl'
            })
            .state('contest' , {
                url : '/contest/:contestName' ,
                templateUrl: '/templates/contest.html' ,
                controller : 'ContestCtrl'
            })
            .state('rank_list' , {
                url : '/contest/:contestName/rank_list' ,
                templateUrl: '/templates/rankList.html' ,
                controller : 'RankListCtrl'
            })
            .state('submitted' , {
                url : '/contest/:contestName/submitted' ,
                templateUrl: '/templates/submitted.html' ,
                controller : 'RankListCtrl'
            })
            .state('problems' , {
                url : '/contest/:contestId/:teamId/problems' ,
                templateUrl: '/templates/problems.html' ,
                controller : 'ProblemsCtrl'
            })
            .state('problem' , {
                url : '/contest/:contestId/:teamId/problems/:problemId' ,
                templateUrl: '/templates/problem.html' ,
                controller : 'ProblemCtrl'
            })
            .state('create_contest', {
                url: '/create_contest' ,
                templateUrl : '/templates/createContest.html' ,
                controller : 'CreateContestCtrl'
            })
            .state('home', {
                url: '/home' ,
                templateUrl: '/templates/home.html' ,
                controller: 'HomeCtrl' ,
                cache : false
            });
        //     .state('profile', {
        //         url: '/profile',
        //         templateUrl: '/templates/profile.html',
        //         controller: 'ProfileCtrl',
        //         resolve: {
        //             "AuthStatus": function (AuthService) {
        //                 return AuthService.validate()
        //             }
        //         }
        //     });
        $urlRouterProvider.otherwise('/');
    })
    //
    .run(function ($rootScope, $timeout, $location, $templateCache, AuthService, $state , $window) {

        AuthService.init(function (data, status) {
            if (status) {
                // just a force to get some info . not using the callback
                // UserModel.setUserInfo(data);
            }
        });

        $rootScope.$on('$viewContentLoaded', function () {
            // $timeout(function() {
            //   componentHandler.upgradeAllRegistered();
            // })
        });

        $rootScope.$on("$stateChangeError", function (event, current, previous, rejection) {
            // mtNotifyService.unLoad() ;
            $state.go("accessDenied");
        });
        $rootScope.$on('$stateChangeStart', function (event, toUrl, fromUrl) {

        });

        $rootScope.$on("$stateChangeSuccess", function (event, current) {
            // mtNotifyService.unLoad() ;
            if ($state.current.name != '/') {
                $('#mainMenu').show();
            }
            else {
                $('#mainMenu').hide();
            }
        })


    })
    .service('scopeService', function () {
        return {
            safeApply: function ($scope, fn) {
                var phase = $scope.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if (fn && typeof fn === 'function') {
                        fn();
                    }
                } else {
                    $scope.$apply(fn);
                }
            }
        };
    })

    .filter('range', function () {
        return function (input, total) {
            total = parseInt(total);

            for (var i = 0; i < total; i++) {
                input.push(i);
            }

            return input;
        };
    });

