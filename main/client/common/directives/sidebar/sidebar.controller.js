(function () {

    angular
        .module('meanApp')
        .controller('sidebarCtrl', sidebarCtrl);

    sidebarCtrl.$inject = ['$scope','authentication'];
    function sidebarCtrl($scope, authentication) {
    }

})();