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
                size: size,
                resolve: {
                    //TODO put stuff here
                }
            });

            modalInstance.result.then(function () {

            });
        };

        if(id){
            meanData.getProfileById(id)
                .success(function (data) {
                    $scope.user = data;
                    meanData.getProfile().success(function (innerData) {
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