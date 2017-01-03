/*
		Aitch3 Framework
		created: 			2016.08.09
		lastUpdated: 	2016.08.31
*/


var h3Framework = angular.module('h3Framework', [
	'ngRoute',
	'ngAnimate',
	'ngSanitize',
	'ngCookies',
	'ckeditor'
])

.run(['$window', '$rootScope', '$wr_s', function($window, $rootScope, $wr_s) {
  $rootScope.online = navigator.onLine;
  $window.addEventListener("offline", function () {
    $rootScope.$apply(function() {
      $rootScope.online = false;
      $wr_s.logout();
			console.log('333');
    });
  }, false);
  $window.addEventListener("online", function () {
    $rootScope.$apply(function() {
      $rootScope.online = true;
			console.log('2222');
    });
  }, false);
}]);
