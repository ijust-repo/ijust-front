var AuthService = function ($http, Constants, $localStorage,
                            $q, $interval, $rootScope) {

    var _isAuthenticated = false;
    var _isInit = false;

    function init() {
        if($localStorage.token){
            $rootScope.isAuthenticated = true ;
            _isAuthenticated = true ;
        }
        else {
            $rootScope.isAuthenticated = false ;
            _isAuthenticated = false ;
        }
    }

    function validate() {
        var defer = $q.defer();
        if (_isInit) {
            if (_isAuthenticated) {
                defer.resolve(true)
            }
            else {
                defer.reject(false);
            }
        }
        else {
            // Not a good solution
            var _interval = $interval(function () {
                if (_isInit) {
                    if (_isAuthenticated) {
                        defer.resolve(true);
                        $interval.cancel(_interval);
                    }
                    else {
                        defer.reject(false);
                        $interval.cancel(_interval);
                    }
                }
            }, 200);
        }

        return defer.promise;
    }

    function isAuthenticated() {
        return _isAuthenticated;
    }

    return {
        validate: validate,
        init: init,
        isAuthenticated: isAuthenticated
    }
};

ijust.factory("AuthService", AuthService);
