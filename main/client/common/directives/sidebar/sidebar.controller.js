(function () {

    angular
        .module('plan')
        .controller('sidebarCtrl', sidebarCtrl);

    sidebarCtrl.$inject = ['$rootScope', 'authentication'];
    function sidebarCtrl($rootScope, authentication) {
        $rootScope.isLoggedIn = authentication.isLoggedIn;
        console.log(authentication.isLoggedIn());
    }

})();