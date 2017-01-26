(function() {

    angular
        .module('plan')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$scope', 'planData'];
    function profileCtrl($scope, planData) {

        $scope.user = {};

        planData.getProfile()
            .success(function (data) {
                $scope.user = data;
            })
            .error(function (e) {
                console.log(e);
            });

    }

})();