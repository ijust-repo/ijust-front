ijust.factory('AuthInterceptor', function ($q, $window, $location, $injector,Constants,
                                           $localStorage, $rootScope) {
    return {
        'request': function (config) {
            config.headers = config.headers || {};
            if($localStorage.token){
                config.headers['Access-Token'] = $localStorage.token;
            }
            return config;
        },
        'responseError': function (response) {
            if (response.status == 401) {
                if ($localStorage.token) {
                    var $http = $injector.get('$http');
                    $http.post(Constants.server + Constants.version + 'user/login_with_token', {'Access-Token': $localStorage.token})
                        .success(function (data, status) {
                            $rootScope.isAuthenticated = true;
                            $location.path('/home');
                        })
                        .error(function (data, status) {
                            delete $localStorage.token;
                            $rootScope.isAuthenticated = false;
                            $location.path('/');
                        })
                }
                else {
                    $rootScope.isAuthenticated = false;
                    //
                    //if()
                   if( $location.path() !=='/about_us')
                        $location.path('/');
                   else
                       $location.path('/about_us');
                }
            }
            return $q.reject(response);
        }
    };
});