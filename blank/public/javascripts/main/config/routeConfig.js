
var aitch3Framework = angular.module('aitch3Framework')

.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: 'templates/views/index.html',
			controller: 'indexCtrl',
			controllerAs: 'index'
		});

		$routeProvider.when('/blog', {
			templateUrl: 'templates/views/blog.html',
			controller: 'blogCtrl',
			controllerAs: 'blog'
		});

		$routeProvider.when('/testing', {
			templateUrl: 'templates/views/testing.html',
			controller: 'testingCtrl',
			controllerAs: 'testing'
		});

		$routeProvider.when('/login', {
			templateUrl: 'templates/views/login.html',
			controller: 'logCtrl',
			controllerAs: 'log'
		});

		$routeProvider.when('/register', {
			templateUrl: 'templates/views/register.html',
			controller: 'logCtrl',
			controllerAs: 'log'
		});

		$routeProvider.otherwise({
			templateUrl: 'templates/common/404.html'
		});

    $locationProvider.html5Mode(true).hashPrefix('!');
}]);
