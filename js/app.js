angular
    .module('myApp', ['ngRoute', 'firebase'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/all.html',
                controller: 'todoCtrl'
            })
            .when('/details/all', {
                templateUrl: 'views/all.html',
                controller: 'todoCtrl'
            })
            .when('/details/personal', {
                templateUrl: 'views/personal.html',
                controller: 'todoCtrl'
            })
            .when('/details/work', {
                templateUrl: 'views/work.html',
                controller: 'todoCtrl'
            })
            .when('/details/other', {
                templateUrl: 'views/other.html',
                controller: 'todoCtrl'
            })
            .when('/details/completed', {
                templateUrl: 'views/completed.html',
                controller: 'todoCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    })
    .controller('todoCtrl', function() {
        return true
    })