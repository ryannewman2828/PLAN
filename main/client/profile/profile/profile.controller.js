(function() {

    angular
        .module('meanApp')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$scope', '$routeParams', '$uibModal', 'meanData'];
    function profileCtrl($scope, $routeParams, $uibModal, meanData) {

        var id = $routeParams.id;
        $scope.user = {};

        $scope.open = function (size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/profile/profile/profile.message.modal.html',
                controller: 'ModalInstanceCtrl',
                size: size
            });

            modalInstance.result.then(function (message){
                console.log($scope.myUsername);
                console.log($scope.user.username);
                meanData.sendMessage($scope.myUsername, $scope.user.username, message)
                    .error(function (err) {
                        console.log(err);
                    })
                    .then(function () {
                        console.log('Message sent correctly');
                    });
            });
        };

        if(id){
            meanData.getProfileById(id)
                .success(function (data) {
                    $scope.user = data;
                    meanData.getProfile().success(function (innerData) {
                            $scope.myUsername = innerData.username;
                            $scope.myProfile = innerData.username === data.username;
                        })
                })
                .error(function (e) {
                    console.log(e);
                });
        } else {
            meanData.getProfile()
                .success(function (data) {
                    $scope.user = data;
                    $scope.myProfile = true;
                })
                .error(function (e) {
                    console.log(e);
                });
        }
    }

})();