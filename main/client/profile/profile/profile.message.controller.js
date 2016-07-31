(function () {

    angular
        .module('meanApp')
        .controller('ModalInstanceCtrl', ModalInstanceCtrl);

    ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
    function ModalInstanceCtrl($scope, $uibModalInstance) {

        $scope.message;

        $scope.ok = function () {
            if($scope.message) {
                $uibModalInstance.close($scope.message);
            }
            else {
                $uibModalInstance.dismiss('cancel');
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();