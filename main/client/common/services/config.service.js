(function() {

    angular
        .module('meanApp')
        .service('meanConfig', meanConfig);

    meanConfig.$inject = ['$http'];
    function meanConfig ($http) {

        var getCharacters = function () {
            return $http.get('/api/characters')
        };

        var getCollection = function (id) {
            var url = '/api/collection/' + id;
            return $http.get(url);
        };

        var getMissions = function (id) {
            var url = '/api/missions/' + id;
            return $http.get(url);
        };

        return {
            getCharacters : getCharacters,
            getCollection : getCollection,
            getMissions : getMissions
        };
    }

})();