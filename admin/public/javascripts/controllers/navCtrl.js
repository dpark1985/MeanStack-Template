var h3Framework = angular.module('h3Framework')

.controller('navCtrl', ['$scope', '$location', '$wr_s', function ($scope, $location, $wr_s) {
	var $nav = this;


	$nav.doLogout = function(){
		$wr_s.logout();
	};

	$scope.$on('$routeChangeStart', function (next, current) {
		if(!$nav.userData){
			$nav.userData = $wr_s.getUser();
		}
	});

	$nav.init = function() {
		if($location.path() != '/'){
			$nav.userData = $wr_s.loginCheckReDirect();
		}
	};

	$nav.init();
}]);
