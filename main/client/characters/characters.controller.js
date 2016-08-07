(function() {

    angular
        .module('meanApp')
        .controller('charCtrl', charCtrl);

    charCtrl.$inject = ['$scope', '$routeParams','$route', '$uibModal', 'meanData'];
    function charCtrl($scope, $routeParams, $route, $uibModal, meanData) {


    }

})();