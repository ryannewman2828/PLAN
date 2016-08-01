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
        
        var addFriend = function (sender, receiver) {
            var url = 'api/friend/' + receiver;
            return $http.post(url, {sender : sender});
        };
        
        var acceptFriend = function (sender, receiver) {
            var url = 'api/accept-friend/' + receiver;
            return $http.post(url, {sender : sender});
        };

        var rejectFriend = function (sender, receiver) {
            var url = 'api/reject-friend/' + receiver;
            return $http.post(url, {sender : sender});
        };

        var deleteFriend = function (sender, receiver) {
            var url = 'api/delete-friend/' + receiver;
            return $http.post(url, {sender : sender});
        };

        return {
            getProfile : getProfile,
            getProfileById : getProfileById,
            sendMessage : sendMessage,
            addFriend : addFriend,
            acceptFriend : acceptFriend,
            rejectFriend : rejectFriend,
            deleteFriend : deleteFriend
        };
    }

})();