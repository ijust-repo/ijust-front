var mtNotify = angular.module("mtNotify" , [])
.run(function ($rootScope ) {
    $rootScope.mtNotifyMessage = " Done! " ;
    $rootScope.mtNotifyDisplay = false   ;
    $rootScope.mtNotifyStatus = 1 ;
    $rootScope.mtNotifyLoader = false ;
 })
.service("mtNotifyService" , function ($rootScope , $timeout ) {
    var mtNotifyTimeoutDuration = 4000 ;
    var _wait = 0 ;

    var load = function ( wait) {
        if ( wait ) { _wait = wait ; }
        $rootScope.mtNotifyLoader = true ;
    } ;
    var unLoad = function () {
        if ( _wait > 0 ) {
            _wait -= 1 ;
        }
        if ( _wait == 0 ) {
            //$rootScope.mtNotifyLoader = false ;
            $timeout(function(){$rootScope.mtNotifyLoader = false}, 2000);
        }
    } ;

    var show = function (msg , type ) {
        $rootScope.mtNotifyMessage = msg  ;
        //$rootScope.mtNotifyLoader = false ;
        _wait = 0 ;
        $timeout(function(){$rootScope.mtNotifyLoader = false}, 100);
        $rootScope.mtNotifyStatus = type ;
        $rootScope.mtNotifyDisplay = true ; 
       // $timeout(function () {
       //     $rootScope.mtNotifyDisplay = false
       // } , mtNotifyTimeoutDuration )
    } ;
    $rootScope.hideNotify = function () {
        $rootScope.mtNotifyDisplay = false
    };
    return {
        show : show ,
        load : load ,
        unLoad : unLoad
    }
})
.directive("mtNotify" , function () {
    return {
        templateUrl : "js/Directives/mtNotify.html" ,
        link : function ( scope , elem , attr ) {
        }
    }
});
