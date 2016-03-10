
angular.module('index', ['common'])



.controller('indexCtrl', ['$scope', function ($scope) {

	$scope.toLogin = function(){
		window.location = "/login";
	};

	$scope.toRegister = function(){
		window.location = "/register";
	};



}]);
