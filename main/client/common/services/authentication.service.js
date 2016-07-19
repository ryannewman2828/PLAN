(function () {

    angular
        .module('meanApp')
        .service('authentication', authentication);

    authentication.$inject = ['$http', '$window'];
    function authentication ($http, $window) {

        var saveToken = function (token) {
            $window.localStorage['token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['token'];
        };

        var isLoggedIn = function() {
            var token = getToken();
            var payload;

            if(token){
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function() {
            if(isLoggedIn()){
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    email : payload.email,
                    name : payload.name
                };
            }
        };

        var register = function(user) {
            return $http.post('/api/register', user).success(function(data){
                saveToken(data.token);
            });
        };

        var login = function(user) {
            return $http.post('/api/login', user).success(function(data) {
                saveToken(data.token);
            });
        };

        var logout = function() {
            console.log("qwe");
            $window.localStorage.removeItem('token');
        };

        return {
            currentUser : currentUser,
            saveToken : saveToken,
            getToken : getToken,
            isLoggedIn : isLoggedIn,
            register : register,
            login : login,
            logout : logout
        };
    }

})();