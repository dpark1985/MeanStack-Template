var h3Framework = angular.module('h3Framework')

.controller('dashCtrl', ['$scope', '$location', '$wr_s', function ($scope, $location, $wr_s) {
	var $dash = this;

	$dash.firstMenuConfig = [
		{name: '전체요약', en: 'overview', href: '/dashboard/overview', active: true},
		{name: '분석지표', en: 'analytices', href: '/dashboard/analytices', active: false}
	];

	$dash.secondMenuConfig = [
		{name: '행사', en: 'events', href: '/dashboard/events', active: false},
		{name: '광고', en: 'ads', href: '/dashboard/ads', active: false},
		{name: '이벤트', en: 'wrEvents', href: '/dashboard/wrEvents', active: false},
		{name: '공지사항', en: 'notice', href: '/dashboard/notice', active: false},
	];

	$dash.thridMenuConfig = [
		{name: '문의하기', en: 'inquiries', href: '/dashboard/inquiries', active: false},
		{name: '이벤트 제보', en: 'eventReports', href: '/dashboard/eventReports', active: false},
	];

	$dash.menuConfigs = [$dash.firstMenuConfig, $dash.secondMenuConfig, $dash.thridMenuConfig];

	$dash.clearActive = function(menuConfigs){
		for(var i=0; i<menuConfigs.length; i++){
			for(var j=0; j<menuConfigs[i].length; j++){
				menuConfigs[i][j].active = false;
			}
		}
	};

	$dash.setActiveLink = function(menu, menuConfigs) {
		$dash.clearActive(menuConfigs);
		for(var i=0; i<menuConfigs.length; i++){
			for(var j=0; j<menuConfigs[i].length; j++){
				if(menuConfigs[i][j].en == menu){
					menuConfigs[i][j].active = true;
				}
			}
		}
	}

	$dash.menuClick = function(menu) {
		$dash.clearActive($dash.menuConfigs);
		menu.active = true;
	};

	$scope.$on('$routeChangeStart', function (next, current) {
		$dash.setActiveLink($location.path().split('/')[2], $dash.menuConfigs);
		if(!$dash.userData){
			$dash.userData = $wr_s.getUser();
		}
	});



}]);
