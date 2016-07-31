(function () {

    angular
        .module('meanApp')
        .controller('messageCtrl', messageCtrl);

    messageCtrl.$inject = ['$scope', 'meanData','authentication'];
    function messageCtrl($scope, meanData, authentication) {

        $scope.isLoggedIn = authentication.isLoggedIn();

        if($scope.isLoggedIn) {
            meanData.getProfile()
                .success(function (data) {
                    $scope.messages = data.messages;
                })
                .error(function (e) {
                    console.log(e);
                });
        }
    }

})();