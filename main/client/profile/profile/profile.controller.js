(function() {

    angular
        .module('plan')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$scope', '$routeParams','$route', '$uibModal', 'planData'];
    function profileCtrl($scope, $routeParams, planData) {

        var id = $routeParams.id;
        $scope.user = {};

        planData.getProfile()
            .success(function (data) {
                $scope.user = data;
                $scope.myProfile = true;
            })
            .error(function (e) {
                console.log(e);
            });

    }

})();