
var aitch3AdminFramework = angular.module('aitch3AdminFramework')

.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
	$routeProvider.when('/admin', {
		templateUrl: 'templates/admin/admin.html',
		controller: 'adminCtrl',
		controllerAs: 'admin'
	});

	$routeProvider.when('/admin/dashboard', {
		templateUrl: 'templates/admin/views/dashboard.html',
		controller: 'dashboardCtrl',
		controllerAs: 'dashboard'
	});

	$routeProvider.when('/admin/users', {
		templateUrl: 'templates/admin/views/users.html',
		controller: 'usersCtrl',
		controllerAs: 'users'
	});

	$routeProvider.when('/admin/config/server', {
		templateUrl: 'templates/admin/views/server.html',
		controller: 'serverCtrl',
		controllerAs: 'server'
	});

	// $routeProvider.when('/admin/:category', {
	// 	templateUrl: 'templates/admin/adminMenus.html',
	// 	controller: 'adminSubCtrl',
	// 	controllerAs: 'adminSub'
	// });
	//
	// $routeProvider.when('/admin/:category/preview', {
	// 	templateUrl: 'templates/admin/adminPreview.html',
	// 	controller: 'adminSubCtrl',
	// 	controllerAs: 'adminSub'
	// });

	$routeProvider.otherwise({
		templateUrl: 'templates/common/404.html'
	});
  $locationProvider.html5Mode(true).hashPrefix('!');
}]);
