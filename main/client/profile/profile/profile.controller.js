(function() {

    angular
        .module('meanApp')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$scope', '$routeParams', 'meanData'];
    function profileCtrl($scope, $routeParams, meanData) {

        var id = $routeParams.id;
        $scope.user = {};

        if(id){
            meanData.getProfileById(id)
                .success(function (data) {
                    $scope.user = data;
                })
                .error(function (e) {
                    console.log(e);
                });
        } else {
            meanData.getProfile()
                .success(function (data) {
                    $scope.user = data;
                    console.log($scope.user);
                })
                .error(function (e) {
                    console.log(e);
                });
        }
    }

})();