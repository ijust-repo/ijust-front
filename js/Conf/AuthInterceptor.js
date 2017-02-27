ijust.factory('AuthInterceptor', function ($q , $window , $location , $injector ,
                                            $localStorage ) {
    return {
        'request': function (config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
                config.headers['token'] = $localStorage.token;
            }
            // config.data = angular.toJson(config.data) ;
            // console.log(config.headers);
            return config;
        },
        'responseError': function (response) {
            if(!$localStorage.token){
                $location.path('/');
            }
        }
    };
});