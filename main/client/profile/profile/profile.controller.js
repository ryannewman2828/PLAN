(function() {

    angular
        .module('plan')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$scope', '$location', 'planData', 'authentication'];
    function profileCtrl($scope, $location, planData, authentication) {

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