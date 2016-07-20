(function () {

    angular
        .module('meanApp')
        .controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$location', '$scope', 'authentication'];
    function registerCtrl($location, $scope, authentication) {

        $scope.error = false;
        $scope.errorMsg = "";

        $scope.credentials = {
            name : "",
            username: "",
            email : "",
            password : ""
        };

        $scope.confirmPass = "";

        $scope.onSubmit = function () {
            console.log('Submitting registration');
            authentication
                .register($scope.credentials)
                .error(function(err){
                    alert(err);
                })
                .then(function(){
                    $location.path('profile');
                });
        };

    }

})();