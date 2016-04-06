
angular.module('SPAroutes', ['ngRoute', 'SPAcontrollers'])

.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/login', { templateUrl: 'templates/log/login.html', controller: 'logCtrl', controllerAs: 'log' });
		$routeProvider.when('/register', { templateUrl: 'templates/log/register.html', controller: 'logCtrl', controllerAs: 'log' });
		$routeProvider.otherwise({ templateUrl: 'templates/common/404.html' });
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

