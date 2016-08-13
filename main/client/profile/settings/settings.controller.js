(function() {

    angular
        .module('meanApp')
        .controller('settingsCtrl', settingsCtrl);

    settingsCtrl.$inject = ['$scope', 'meanData', 'meanConfig'];
    function settingsCtrl($scope, meanData, meanConfig) {
        var tempUser = {};
        $scope.indices = [];
        $scope.passwords = {};
        $scope.email = "";

        meanData.getProfile()
            .success(function (data) {
                tempUser = data;
            })
            .error(function (e) {
                console.log(e);
            })
            .then(function () {
                meanConfig.getCollection(tempUser.username)
                    .success(function (data) {
                        $scope.collection = data.collection;
                    })
                    .error(function (err) {
                        console.log(err);
                    })
                    .then(function () {
                        for(var i = 0; i < $scope.collection.length; i += 4){
                            $scope.indices.push(i);
                        }
                    });
            });

        $scope.onSubmitPass = function () {
            meanData.changePassword({passwords : $scope.passwords, user : tempUser})
                .success(function () {

                })
                .error(function () {

                });
        };

        $scope.onSubmitEmail = function () {
            tempUser.email = $scope.email;
            meanData.changeEmail(tempUser)
                .success(function () {
                    
                })
                .error(function () {

                });
        };

        $scope.onClickProfilePic = function (characterIndex) {
            tempUser.profilePic = $scope.collection[characterIndex].name;
            meanData.changeProfilePic(tempUser)
                .success(function () {

                })
                .error(function () {

                });
        };
    }

})();