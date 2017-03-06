ijust.factory('AuthInterceptor', function ($q , $window , $location , $injector ,
                                            $localStorage) {
    return {
        'request': function (config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
                // config.headers['Access-Token'] = $localStorage.token;
                config.headers['Access-Token'] = $localStorage.token;
                // config.headers['Content-Type'] = 'application/json';
            }
            // config.data = angular.toJson(config.data) ;
            // console.log(config.timeout);
            return config;
        },
        'responseError': function (response) {
            // console.log(response.status == '401' && !$rootScope.isAuthenticated);
            console.log(response);
            if(response.status == 401){
                $location.path('/');
            }
            return $q.reject(response);
        }
    };
});