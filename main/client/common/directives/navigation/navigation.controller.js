(function () {

    angular
        .module('meanApp')
        .controller('navigationCtrl', navigationCtrl);

    navigationCtrl.$inject = ['$location', '$scope','authentication'];
    function navigationCtrl($location, $scope, authentication) {

        $scope.isLoggedIn = authentication.isLoggedIn();

        $scope.logout = function() {
            authentication.logout();
            $location.path('/');
        }
    }

})();