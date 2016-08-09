
var aitch3Framework = angular.module('aitch3Framework')

.controller('indexCtrl', ['$http', '$window', '$SPAaccount', function ($http, $window, $SPAaccount) {
	var $index = this;

	$index.init = function(){
		$index.userData = $SPAaccount.getUserData();
		$index.title = $('title').text();
	}

	$index.doLogin = function(){
		$('#modal-login').modal('hide');
		var data = {
			login: $index.loginData.userID,
			password: $index.loginData.userPW
		};
		$SPAaccount.login(data).then(function (res){
			$index.errMsgs = $SPAaccount.validation(res.data);
			if($index.errMsgs.length > 0){
				$('#modal-warning').modal('show');
			} else {
				$window.location = '/';
			}
		}, function (err){
			console.log(err);
		});
	};

	$index.doLogout = function(){
		$SPAaccount.logout();
	};

	$index.testing = function(){
		var data = { title : $index.title };
		$http.post('/ctrls/create/file', data).then(function (res){
			console.log(res);
			if(res.statusText === 'OK'){
				$window.location = '/';
			}
		}, function (res){

		})
	};

	$index.toAdmin = function(){
		$window.location = '/admin';
	}

	$index.init();

}]);
