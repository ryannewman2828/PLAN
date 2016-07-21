(function () {

    angular
        .module('meanApp')
        .controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$location', '$scope', 'authentication'];
    function registerCtrl($location, $scope, authentication) {

        $scope.errorPresent = false;
        $scope.errorMsg = "";

        $scope.credentials = {
            name : "",
            username: "",
            email : "",
            password : "",
            confirmPass : ""
        };


        var onError = function (err) {
            console.log('Registration failed due to incorrect field values');
            $scope.errorPresent = true;
            $scope.errorMsg = err.errorMessage;
        }
        
        $scope.onSubmit = function () {
            console.log('Checking registration...');

            console.log('Submitting registration');
            authentication
                .register($scope.credentials)
                .error(onError)
                .then(function () {
                    $location.path('profile');
                });
        };

    }

})();