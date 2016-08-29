(function () {

    angular
        .module('meanApp')
        .controller('loreCtrl', loreCtrl);

    loreCtrl.$inject = ['$scope', '$routeParams', 'meanConfig'];
    function loreCtrl($scope, $routeParams, meanConfig) {
        var id = $routeParams.id;

        if(id) {
            meanConfig.getChapter(id)
                .success(function (data) {
                    $scope.chapter = id;
                    $scope.body = data;
                })
                .error(function (error) {
                    console.log(error);
                });
        } else {
            meanConfig.getChapters(id)
                .success(function (data) {
                    $scope.chapters = data;
                })
                .error(function (error) {
                    console.log(error);
                });
        }
    }

})();