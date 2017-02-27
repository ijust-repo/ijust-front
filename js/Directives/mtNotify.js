var mtNotify = angular.module("mtNotify" , [])
.run(function ($rootScope ) {
    $rootScope.notifyMessage = "عملیات انجام شد " ;
    $rootScope.notifyDisplay = false   ;
    $rootScope.notifyStatus = 1 ;
    $rootScope.notifyLoader = false ;
 })
.service("mtNotifyService" , function ($rootScope , $timeout ) {
    var notifyTimeoutDuration = 4000 ;
    var _wait = 0 ;

    var load = function ( wait) {
        if ( wait ) { _wait = wait ; }
        $rootScope.notifyLoader = true ;
    } ;
    var unLoad = function () {
        if ( _wait > 0 ) {
            _wait -= 1 ;
        }
        if ( _wait == 0 ) {
            //$rootScope.notifyLoader = false ;
            $timeout(function(){$rootScope.notifyLoader = false}, 2000);
        }
    } ;

    var show = function (msg , type ) {
        $rootScope.notifyMessage = msg  ;
        //$rootScope.notifyLoader = false ;
        _wait = 0 ;
        $timeout(function(){$rootScope.notifyLoader = false}, 100);
        $rootScope.notifyStatus = type ;
        $rootScope.notifyDisplay = true ; 
       // $timeout(function () {
       //     $rootScope.notifyDisplay = false
       // } , notifyTimeoutDuration )
    } ;
    $rootScope.hideNotify = function () {
        $rootScope.notifyDisplay = false
    };
    return {
        show : show ,
        load : load ,
        unLoad : unLoad
    }
})
.directive("mtNotify" , function () {
    return {
        // templateUrl : "js/Directives/mtNotify.html" ,
        link : function ( scope , elem , attr ) {
        }
    }
});
