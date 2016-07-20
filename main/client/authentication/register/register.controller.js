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
            password : ""
        };

        $scope.confirmPass = "";

        $scope.onSubmit = function () {
            console.log('Checking registration...');

            if($scope.confirmPass === "" ||
                $scope.credentials.name === "" ||
                $scope.credentials.username === "" ||
                $scope.credentials.email === "" ||
                $scope.credentials.password === ""){
                $scope.errorPresent = true;
                $scope.errorMsg = "A field or more has been left empty";
            }

            if(!$scope.errorPresent) {
                console.log('Submitting registration');
                authentication
                    .register($scope.credentials)
                    .error(function (err) {
                        alert(err);
                    })
                    .then(function () {
                        $location.path('profile');
                    });
            } else {
                console.log('Registration failed due to incorrect field values');
            }
        };

    }

})();