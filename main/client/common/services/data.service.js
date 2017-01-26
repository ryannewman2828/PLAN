(function() {

    angular
        .module('plan')
        .service('planData', planData);

    planData.$inject = ['$http', 'authentication'];
    function planData ($http, authentication) {

        var getProfile = function () {
            return $http.get('/api/profile', {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        return {
            getProfile : getProfile
        };
    }

})();