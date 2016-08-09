
var aitch3Framework = angular.module('aitch3Framework')

.directive('footerCustom', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/common/footer.html',
		controller: 'footCtrl',
		controllerAs: 'foot'
	};
});
