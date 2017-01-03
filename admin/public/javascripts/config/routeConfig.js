var h3Framework = angular.module('h3Framework')

.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {

		var routeConfig = [
			{path: '/',								templateUrl: 'templates/views/index/index.html',							controller: 'indexCtrl',			controllerAs: 'index'},
			// {path: '/dashboard',			templateUrl: 'templates/views/dashboard/dashboard.html',			controller: 'dashCtrl',				controllerAs: 'dash'},
			{path: '/dashboard/overview', templateUrl: 'templates/views/dashboard/overview/overview.html', controller: 'overViewCtrl', controllerAs: 'over'},
			{path: '/dashboard/analytices', templateUrl: 'templates/views/dashboard/analytics/analytics.html', controller: '', controllerAs: ''},
			{path: '/dashboard/appTitle', templateUrl: 'templates/views/dashboard/appTitle/appTitle.html', controller: 'appTitleCtrl', controllerAs: 'appTitle'},
			{path: '/dashboard/events', templateUrl: 'templates/views/dashboard/events/events.html', controller: 'eventsCtrl', controllerAs: 'events'},
			{path: '/dashboard/ads', templateUrl: 'templates/views/dashboard/ads/ads.html', controller: 'adsCtrl', controllerAs: 'ads'},
			{path: '/dashboard/wrEvents', templateUrl: 'templates/views/dashboard/wrEvents/wrEvents.html', controller: 'wrEventsCtrl', controllerAs: 'wrEvents'},
			{path: '/dashboard/notice', templateUrl: 'templates/views/dashboard/notice/notice.html', controller: 'notisCtrl', controllerAs: 'notis'},
			{path: '/dashboard/inquiries', templateUrl: 'templates/views/dashboard/inquiries/inquiries.html', controller: 'inquiryCtrl', controllerAs: 'ic'},
			{path: '/dashboard/eventReports', templateUrl: 'templates/views/dashboard/eventReports/eventReports.html', controller: 'eventReportCtrl', controllerAs: 'er'},
		]

		for(var i=0; i<routeConfig.length; i++){
			$routeProvider.when(routeConfig[i].path, {
				templateUrl:	routeConfig[i].templateUrl,
				controller:		routeConfig[i].controller,
				controllerAs:	routeConfig[i].controllerAs
			});
		};


		$routeProvider.otherwise({
			templateUrl: 'templates/common/404.html'
		});
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);
