(function() {

    angular
        .module('meanApp')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$scope', 'meanData'];
    function profileCtrl($scope, meanData) {

        $scope.user = {};

        meanData.getProfile()
            .success(function(data) {
                $scope.user = data;
            })
            .error(function (e) {
                console.log(e);
            });
    }

})();