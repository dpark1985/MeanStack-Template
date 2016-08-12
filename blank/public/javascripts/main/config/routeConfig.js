
var aitch3Framework = angular.module('aitch3Framework')

.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: 'templates/main/index.html',
			controller: 'indexCtrl',
			controllerAs: 'index'
		});

		$routeProvider.when('/blog', {
			templateUrl: 'templates/main/blog.html',
			controller: 'blogCtrl',
			controllerAs: 'blog'
		});

		$routeProvider.when('/testing', {
			templateUrl: 'templates/main/testing.html',
			controller: 'testingCtrl',
			controllerAs: 'testing'
		});

		$routeProvider.when('/login', {
			templateUrl: 'templates/main/login.html',
			controller: 'logCtrl',
			controllerAs: 'log'
		});

		$routeProvider.when('/register', {
			templateUrl: 'templates/main/register.html',
			controller: 'logCtrl',
			controllerAs: 'log'
		});

		$routeProvider.otherwise({
			templateUrl: 'templates/common/404.html'
		});

    $locationProvider.html5Mode(true).hashPrefix('!');
}]);
