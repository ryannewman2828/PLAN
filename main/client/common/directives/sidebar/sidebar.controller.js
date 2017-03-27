(function () {

    angular
        .module('plan')
        .controller('sidebarCtrl', sidebarCtrl);

    sidebarCtrl.$inject = ['$rootScope', 'authentication', 'planData', 'socketFact'];
    function sidebarCtrl($rootScope, authentication, planData, socketFact) {
        $rootScope.isLoggedIn = authentication.isLoggedIn;
        $rootScope.onlineUsers = [];
        planData.getOnlineUsers()
            .success(function (data) {
                $rootScope.onlineUsers = data;
            })
            .error(function (err) {
                console.log(err)
            });
        socketFact.on('update_list', function (username) {
            console.log("socket recieved update_list");
            console.log(username);
            $rootScope.onlineUsers.push(username);
        });
        socketFact.on('remove_list', function (username) {
            console.log("socket recieved remove_list");
            console.log(username);
            var index = $rootScope.onlineUsers.indexOf(username);
            if (index >= 0) {
                $rootScope.onlineUsers.splice(index, 1);
            }
        });
        $rootScope.$on('$destroy', function (event) {
            socketFact.destroy();
        });
    }

})();