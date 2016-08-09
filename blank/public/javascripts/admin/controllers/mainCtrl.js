
var aitch3AdminFramework = angular.module('aitch3AdminFramework')

.controller('mainCtrl', ['$scope', '$http', '$window', '$SPAaccount', '$adminFactory', function ($scope, $http, $window, $SPAaccount, $adminFactory) {
	$scope.toMain = function(){
		$window.location = "/";
	}

	$scope.bodyStyle = {background: "rgb(247, 247, 247)"};

	$http.get('/models/get/adminStatus').then(function (res){
		$adminFactory.setUserData({userID : res.data.userID});
	}, function (err){
		console.log(err);
	});
}])
