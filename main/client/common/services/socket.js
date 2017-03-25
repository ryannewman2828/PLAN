(function () {
    angular
        .module('plan')
        .factory('socketFact', socketFact);

    socketFact.$inject = ['$rootScope'];
    function socketFact($rootScope) {
        var socket = io.connect('http://localhost:3000');

        return {
            on: function (eName, callback) {
                socket.on(eName, function () {
                    var argus = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, argus);
                    });
                });
            },
            emit: function (eName, data, callback) {
                socket.emit(eName, data, function () {
                    var argus = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, argus);
                        }
                    });
                })
            }
        };
    }
})();