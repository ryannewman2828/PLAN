(function () {

    angular
        .module('meanApp')
        .controller('messageCtrl', messageCtrl);

    messageCtrl.$inject = ['$scope', '$route','meanData'];
    function messageCtrl($scope, $route, meanData) {

        var username;

        meanData.getProfile()
            .success(function (data) {
                $scope.messages = data.messages;
                username = data.username;
            })
            .error(function (error) {
                console.log(error);
            });

        $scope.deleteMessage = function (id) {
            meanData.deleteMessage(username, id)
                .success(function (data) {
                    $route.reload();
                    console.log(data.message);
                })
                .error(function (error) {
                    console.log(error);
                });
        }
    }

})();