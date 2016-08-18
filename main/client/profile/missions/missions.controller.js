(function () {

    angular
        .module('meanApp')
        .controller('missionCtrl', missionCtrl);

    missionCtrl.$inject = ['$scope', '$routeParams', 'meanData', 'meanConfig'];
    function missionCtrl($scope, $routeParams, meanData, meanConfig) {

        var tempUser = {};

        meanData.getProfile()
            .success(function (data) {
                tempUser = data;
            })
            .error(function (error) {
                console.log(error);
            })
            .then(function () {
                meanConfig.getMissions(tempUser.username)
                    .success(function (data) {
                        $scope.missions = data.missions;
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            });
    }
})();