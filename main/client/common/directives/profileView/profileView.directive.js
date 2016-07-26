(function () {

    angular
        .module('meanApp')
        .directive('profileview', profileview);

    function profileview () {
        return {
            restrict: 'EA',
            templateUrl: '/common/directives/profileView/profileView.template.html',
            controller: 'profileViewCtrl'
        };
    }

})();