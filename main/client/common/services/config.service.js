(function() {

    angular
        .module('meanApp')
        .service('meanConfig', meanConfig);

    meanConfig.$inject = ['$http', 'authentication'];
    function meanConfig ($http, authentication) {

        var getCharacters = function () {
            return $http.get('/api/characters')
        };

        return {
            getCharacters : getCharacters
        };
    }

})();