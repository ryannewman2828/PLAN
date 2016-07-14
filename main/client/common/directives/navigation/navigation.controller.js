(function () {

    angular
        .module('meanApp')
        .controller('navigationCtrl', navigationCtrl);

    navigationCtrl.$inject = ['$scope','authentication'];
    function navigationCtrl($scope, authentication) {

        $scope.isLoggedIn = authentication.isLoggedIn();
        $scope.currentUser = authentication.currentUser();
    }

})();