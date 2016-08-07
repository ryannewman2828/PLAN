(function() {

    angular
        .module('meanApp')
        .controller('charCtrl', charCtrl);

    charCtrl.$inject = ['$scope', 'meanConfig'];
    function charCtrl($scope, meanConfig) {
        $scope.indices = [];
        $scope.displayChar;
        $scope.attackIndex = 0;
        meanConfig.getCharacters()
            .success(function (data) {
                console.log(data);
                $scope.characters = data.characters;
            })
            .error(function (e) {
                console.log(e);
            })
            .then(function () {
                $scope.displayChar = $scope.characters[0];
                for(var i = 0; i < $scope.characters.length; i += 4){
                    $scope.indices.push(i);
                }
            });

        $scope.changeDisplay = function (index) {
            $scope.displayChar = $scope.characters[index];
            $scope.attackIndex = 0;
        }

        $scope.changeAttack = function (index) {
            $scope.attackIndex = index;
        }
    }

})();