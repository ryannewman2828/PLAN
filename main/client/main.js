(function () {

    angular.module('meanApp', ['ui.bootstrap', 'ngRoute']);

    function config ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/home/home.view.html',
                controller: 'homeCtrl',
            })
            .when('/register', {
                templateUrl: '/authentication/register/register.view.html',
                controller: 'registerCtrl',
            })
            .when('/login', {
                templateUrl: '/authentication/login/login.view.html',
                controller: 'loginCtrl',
            })
            .when('/profile/:id', {
                templateUrl: '/profile/profile/profile.view.html',
                controller: 'profileCtrl',
            })
            .when('/profile', {
                templateUrl: '/profile/profile/profile.view.html',
                controller: 'profileCtrl',
            })
            .otherwise({redirectTo: '/'});

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }

    function run($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
            if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
                $location.path('/');
            }
        });
    }

    angular
        .module('meanApp')
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$rootScope', '$location', 'authentication', run]);

})();