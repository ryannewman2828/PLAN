(function () {

    angular
        .module('plan')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['socketFact'];
    function homeCtrl(socketFact) {
        socketFact.on('echo', function (msg) {
            console.log(msg);
        });

    }

})();