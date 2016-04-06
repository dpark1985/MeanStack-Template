
angular.module('SPAdirectives', ['ngRoute'])

.directive('navCustom', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/common/navBar.html',
		controller: 'navCtrl',
		controllerAs: 'nav'
	};
})

.directive('footerCustom', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/common/footer.html',
		controller: 'footCtrl',
		controllerAs: 'foot'
	};
});




