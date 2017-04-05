(function() {

    angular
        .module('plan')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$scope', '$location', '$routeParams', 'planData', 'authentication'];
    function profileCtrl($scope, $location, $routeParams, planData, authentication) {

        var username = $routeParams.view;
        $scope.myProfile = true;

        if (username) {
            $scope.myProfile = false;
        }

        $scope.user = {};

        $scope.logout = function () {
            authentication.logout();
            $location.path('/');
        };

        planData.getProfile()
            .success(function (data) {
                $scope.user = data;
            })
            .error(function (err) {
                console.log(err);
            });

    }

})();