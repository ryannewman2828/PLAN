(function () {

    angular
        .module('plan')
        .controller('navbarCtrl', navbarCtrl);

    navbarCtrl.$inject = ['$rootScope', 'authentication'];
    function navbarCtrl($rootScope, authentication) {
        $rootScope.isLoggedIn = authentication.isLoggedIn;
    }

})();
