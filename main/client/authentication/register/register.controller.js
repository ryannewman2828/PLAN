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
        
        $scope.onSubmit = function () {
            console.log('Checking registration...');

            authentication
                .register($scope.credentials)
                .error(function(err){
                    alert(err.message);
                })
                .then(function () {
                    $location.path('profile');
                    console.log('Submitting registration');
                });
        };

    }

})();