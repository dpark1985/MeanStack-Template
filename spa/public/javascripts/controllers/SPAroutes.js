
angular.module('SPAroutes', ['ngRoute', 'SPAcontrollers', 'SPAdirectives'])

.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'templates/views/index.html',
			controller: 'indexCtrl',
			controllerAs: 'index'
		})
		.when('/login', {
			templateUrl: 'templates/views/login.html',
			controller: 'logCtrl',
			controllerAs: 'log'
		})
		.when('/register', {
			templateUrl: 'templates/views/register.html',
			controller: 'logCtrl',
			controllerAs: 'log'
		})
		.when('/blog', {
			templateUrl: 'templates/views/blog.html',
			controller: 'blogCtrl',
			controllerAs: 'blog'
		})
		.when('/testing', {
			templateUrl: 'templates/views/testing.html',
			controller: 'testingCtrl',
			controllerAs: 'testing'
		})
		.when('/admin', {
			templateUrl: 'templates/views/admin.html',
			controller: 'adminCtrl',
			controllerAs: 'admin'
		})


		.otherwise({
			templateUrl: 'templates/views/404.html'
		});

    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

