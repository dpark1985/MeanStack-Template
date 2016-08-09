
var aitch3Framework = angular.module('aitch3Framework')

.factory('$SPAaccount', ['$http', '$window', function ($http, $window){
	var userStatus = {
		loggedIn: false,
		userID: null
	};

	return {
		isUserLoggedIn: function(){
			return $http({method:'GET' ,url:'/models/get/userStatus'});
		},
		login: function (data){
			return $http.post('/models/login', data);
		},
		logout: function (){
			return $window.location = '/logout';
		},
		register: function (data){
			return $http.post('/models/register', data);
		},
		validation: function (data){
			let errMsgs = [];

			if(data.indexOf("loginError1") > 0){
				errMsgs.push("아이디 또는 비밀번호가 맞지 않습니다.");
			}

			if(data.indexOf("registerError1") > 0){
				errMsgs.push("이미 등록된 아이디 입니다.");
			}

			if(data.indexOf("registerError2") > 0){
				errMsgs.push("아이디가 정확히 입력되지 않았습니다.");
			}

			if(data.indexOf("registerError3") > 0){
				errMsgs.push("비밀번호가 정확히 입력되지 않았습니다.");
			}

			if(data.indexOf("registerError4") > 0){
				errMsgs.push("비밀번호가 8글자 이하입니다.");
			}

			if(data.indexOf("registerError5") > 0){
				errMsgs.push("비밀번호가 8글자 이하입니다.");
			}

			if(data.indexOf("registerError6") > 0){
				errMsgs.push("비밀번호가 정확히 입력되지 않았습니다.");
			}

			if(data.indexOf("registerError7") > 0){
				errMsgs.push("입력하신 비밀번호가 일치하지 않습니다.");
			}

			return errMsgs;
		},
		setUserData: function (data){
			userStatus.loggedIn = data.loggedIn;
			userStatus.userID = data.userID;
		},
		getUserData: function (){
			return userStatus;
		}
	};
}]);
