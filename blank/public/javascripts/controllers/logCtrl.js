
var aitch3Framework = angular.module('aitch3Framework')


.controller('logCtrl', ['$location', '$scope', '$window', '$SPAaccount', function ($location, $scope, $window, $SPAaccount) {
	var $log = this;

	$SPAaccount.isUserLoggedIn().then(function (res){
		if(res.data.userID !== null){
			$location.path('/');
		} else {
			$log.loginData = {};
			$log.registerData = {};
			$log.errMsgs = [];
		}
	}, function (err){
		console.log(err);
	});

	$log.doLogin = function(){
		var data = {
			login: $log.loginData.userID,
			password: $log.loginData.userPW
		};
		$SPAaccount.login(data).then(function (res){
			$log.errMsgs = $SPAaccount.validation(res.data);
			if($log.errMsgs.length > 0){
				$('#modal-warning').modal('show');
			} else {
				$window.location = '/';
			}
		}, function (err){
			console.log(err);
		});
	};

	$log.doRegister = function(){
		var data = {
			login: $log.registerData.userID,
			password: $log.registerData.userPW,
			passwordConfirm: $log.registerData.userPWC
		};
		$SPAaccount.register(data).then(function (res){
			$log.errMsgs = $SPAaccount.validation(res.data);
			if($log.errMsgs.length > 0){
				$('#modal-warning').modal('show');
			} else {
				$window.location = '/';
			}
		}, function (err){
			console.log(err);
		});
	};
}]);
