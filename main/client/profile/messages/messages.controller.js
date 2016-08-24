(function () {

    angular
        .module('meanApp')
        .controller('messageCtrl', messageCtrl);

    messageCtrl.$inject = ['$scope', 'meanData'];
    function messageCtrl($scope, meanData) {

        meanData.getProfile()
            .success(function (data) {
                $scope.messages = data.messages;
            })
            .error(function (error) {
                console.log(error);
            });
    }

})();