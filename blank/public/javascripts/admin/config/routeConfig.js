
var aitch3AdminFramework = angular.module('aitch3AdminFramework')

.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/admin', {
			templateUrl: 'templates/admin/admin.html',
			controller: 'adminCtrl',
			controllerAs: 'admin'
		});


		$routeProvider.when('/admin/:category', {
			templateUrl: 'templates/admin/adminSub.html',
			controller: 'adminSubCtrl',
			controllerAs: 'adminSub'
		});

		$routeProvider.when('/admin/:category/preview', {
			templateUrl: 'templates/admin/adminPreview.html',
			controller: 'adminSubCtrl',
			controllerAs: 'adminSub'
		});

		$routeProvider.otherwise({
			templateUrl: 'templates/common/404.html'
		});
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);
