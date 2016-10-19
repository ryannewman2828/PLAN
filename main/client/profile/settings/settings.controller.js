(function() {

    angular
        .module('meanApp')
        .controller('settingsCtrl', settingsCtrl);

    settingsCtrl.$inject = ['$scope', '$location', 'meanData'];
    function settingsCtrl($scope, $location, meanData) {
        var tempUser = {};
        $scope.passwords = {};
        $scope.email = "";

        meanData.getProfile()
            .success(function (data) {
                tempUser = data;
            })
            .error(function (error) {
                console.log(error);
            });

        $scope.onSubmitPass = function () {
            meanData.changePassword({passwords : $scope.passwords, user : tempUser})
                .success(function (data) {
                    console.log(data.message);
                    $location.path('/');
                })
                .error(function (err) {
                    alert(err.message);
                });
        };

        $scope.onSubmitEmail = function () {
            tempUser.email = $scope.email;
            meanData.changeEmail(tempUser)
                .success(function (data) {
                    console.log(data.message);
                    $location.path('/');
                })
                .error(function (err) {
                    alert(err.message);
                });
        };
    }

})();