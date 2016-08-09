
var aitch3AdminFramework = angular.module('aitch3AdminFramework')

.controller('adminCtrl', ['$scope', '$http', '$window', '$adminFactory', '$SPAaccount', function ($scope, $http, $window, $adminFactory, $SPAaccount) {
	var $admin = this;
	$admin.userStatus = $adminFactory.getUserData();
	$admin.doLogin = function(){
		var data = {
			login: $admin.userInput.userID,
			password: $admin.userInput.password
		};
		$SPAaccount.login(data).then(function (res){
			$admin.errMsgs = $SPAaccount.validation(res.data);
			if($admin.errMsgs.length > 0){
				$('#modal-warning').modal('show');
			} else {
				$window.location = '/admin';
			}
		}, function (err){
			console.log(err);
		});
	};
}]);
