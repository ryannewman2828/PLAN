(function() {

    angular
        .module('meanApp')
        .controller('settingsCtrl', settingsCtrl);

    settingsCtrl.$inject = ['$scope', '$location', 'meanData', 'meanConfig'];
    function settingsCtrl($scope, $location, meanData, meanConfig) {
        var tempUser = {};
        $scope.indices = [];
        $scope.passwords = {};
        $scope.email = "";

        meanData.getProfile()
            .success(function (data) {
                tempUser = data;
            })
            .error(function (error) {
                console.log(error);
            })
            .then(function () {
                meanConfig.getCollection(tempUser.username)
                    .success(function (data) {
                        $scope.collection = data.collection;
                    })
                    .error(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        for(var i = 0; i < $scope.collection.length; i += 4){
                            $scope.indices.push(i);
                        }
                    });
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

        $scope.onClickProfilePic = function (characterIndex) {
            tempUser.profilePic = $scope.collection[characterIndex].name;
            meanData.changeProfilePic(tempUser)
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