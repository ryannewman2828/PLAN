(function () {

    angular
        .module('plan')
        .controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$location', '$scope', 'authentication'];
    function registerCtrl($location, $scope, authentication) {

        $scope.errorPresent = false;
        $scope.errorMsg = [];

        $scope.credentials = {
            username: "",
            password : "",
            confirmPass : ""
        };


        var onError = function (err) {
            console.log('Registration failed due to incorrect field values');
            $scope.errorPresent = true;
            $scope.errorMsg = err.errorMessage;
        };
        
        $scope.onSubmit = function () {
            console.log('Checking registration...');

            authentication
                .register($scope.credentials)
                .error(onError)
                .then(function () {
                    $location.path('profile');
                    console.log('Submitting registration');
                });
        };

    }

})();