(function () {
    angular
        .module('plan')
        .factory('socketFact', socketFact);

    socketFact.$inject = ['$rootScope', '$window', 'authentication'];
    function socketFact($rootScope, $window, authentication) {

        var on = function (eName, callback) {
            $window.socket.on(eName, function () {
                var argus = arguments;
                $rootScope.$apply(function () {
                    callback.apply( $window.socket, argus);
                });
            });
        };

        var emit = function (eName, data, callback) {
            $window.socket.emit(eName, data, function () {
                var argus = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply( $window.socket, argus);
                    }
                });
            })
        };

        var destroy = function () {
            $window.socket.removeAllListeners();
        };

        $window.socket = io('http://localhost:3000');
        emit('socket-register', $window.localStorage['id']);

        return {
            on: on,
            emit: emit,
            destroy: destroy
        };
    }
})();