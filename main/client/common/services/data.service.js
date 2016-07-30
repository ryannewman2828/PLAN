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
        };

        var sendMessage = function(sender, receiver, message) {
            var date = new Date();
            var url = '/api/message/' + receiver;
            var request = {
                sender : sender,
                dateSent : date,
                message : message
            }
            return $http.post(url, request);
        };

        return {
            getProfile : getProfile,
            getProfileById : getProfileById,
            sendMessage : sendMessage
        };
    }

})();