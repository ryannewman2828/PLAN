(function () {

    angular
        .module('meanApp')
        .directive('sidebar', sidebar);

    function sidebar () {
        return {
            restrict: 'EA',
            templateUrl: '/common/directives/sidebar/sidebar.template.html',
            controller: 'sidebarCtrl'
        };
    }

})();