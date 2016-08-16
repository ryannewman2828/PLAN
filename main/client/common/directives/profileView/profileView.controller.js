(function () {

    angular
        .module('meanApp')
        .controller('profileViewCtrl', profileViewCtrl);

    profileViewCtrl.$inject = ['$scope','$location','meanData','authentication'];
    function profileViewCtrl($scope, $location, meanData, authentication) {

        $scope.userSidebar = {};
        $scope.searchID = "";

        $scope.isLoggedIn = authentication.isLoggedIn();

        $scope.logOut = function () {
            console.log('logout');
            authentication.logout();
            $location.path('/');
        };
        
        if($scope.isLoggedIn) {
            meanData.getProfile()
                .success(function (data) {
                    $scope.userSidebar = data;
                })
                .error(function (e) {
                    console.log(e);
                });
        }

        $scope.search = function(keyCode){
            if(keyCode === 13){
                $location.path('profile/' + $scope.searchID);
            }
        };
    }

})();