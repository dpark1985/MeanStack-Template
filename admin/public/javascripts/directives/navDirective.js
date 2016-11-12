
var h3Framework = angular.module('h3Framework')

.directive('navCustom', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/common/navBar.html',
		controller: 'navCtrl',
		controllerAs: 'nav'
	};
});
