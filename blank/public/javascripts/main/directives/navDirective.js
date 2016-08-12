
var aitch3Framework = angular.module('aitch3Framework')

.directive('navCustom', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/main/common/navBar.html',
		controller: 'navCtrl',
		controllerAs: 'nav'
	};
});
