(function () {

    angular
        .module('meanApp')
        .controller('sidebarCtrl', sidebarCtrl);

    sidebarCtrl.$inject = ['$scope','meanData','authentication'];
    function sidebarCtrl($scope, meanData, authentication) {

        $scope.user = {};

        if(authentication.isLoggedIn()) {
            meanData.getProfile()
                .success(function (data) {
                    $scope.user = data;
                })
                .error(function (e) {
                    console.log(e);
                });
        }
    }

})();