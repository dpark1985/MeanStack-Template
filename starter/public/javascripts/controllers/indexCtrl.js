
angular.module('index', ['common'])



.controller('indexCtrl', ['$scope', '$http', function ($scope, $http) {

	$scope.loginData = {};

	$scope.toLogin = function(){
		window.location = "/login";
	};

	$scope.toRegister = function(){
		window.location = "/register";
	};

	$scope.doLogin = function(){
		$('#modal-login').modal('hide');
		var data = {
			login: $scope.loginData.userID,
			password: $scope.loginData.userPW
		};
		$http.post('/login', data)
		.then(function successCallback(res){
			if(res.data.indexOf("아이디 또는 비밀번호가 맞지 않습니다.") > 0){
				$scope.errorMsg = "아이디 또는 비밀번호가 맞지 않습니다.";
				$('#modal-warning').modal('show')
			} else {
				window.location = '/';
			}
		}, function errorCallback(res){
			console.log(res)
		});
	};

	$scope.doLogout = function(){
		$http.get('/logout')
		.then(function successCallback(res){
			window.location = '/';
		}, function errorCallback(res){
			console.log(res)
		});
	};


}]);
