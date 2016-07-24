(function() {

    angular
        .module('meanApp')
        .service('meanData', meanData);

    meanData.$inject = ['$http', 'authentication'];
    function meanData ($http, authentication) {

        var getProfile = function () {
            return $http.get('/api/profile', {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };

        var getProfileById = function(id){
            var url = '/api/profile/' + id;
            return $http.get(url);
        }

        return {
            getProfile : getProfile,
            getProfileById : getProfileById
        };
    }

})();