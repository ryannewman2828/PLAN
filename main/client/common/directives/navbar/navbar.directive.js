(function () {

    angular
        .module('plan')
        .directive('navbar', navbar);

    function navbar () {
        return {
            restrict: 'EA',
            templateUrl: '/common/directives/navbar/navbar.template.html',
            controller: 'navbarCtrl'
        };
    }

})();