(function() {

    angular
        .module('plan')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$scope', 'planData', 'authentication'];
    function profileCtrl($scope, planData, authentication) {

        $scope.user = {};

        $scope.logout = authentication.logout;

        planData.getProfile()
            .success(function (data) {
                $scope.user = data;
            })
            .error(function (err) {
                console.log(err);
            });

    }

})();