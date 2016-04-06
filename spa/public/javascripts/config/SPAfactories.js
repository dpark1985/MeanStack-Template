
angular.module('SPAfactories', [])

.factory('$SPAaccount', ['$http', '$window', function ($http, $window){
	var userStatus = {
		loggedIn: false,
		userID: null
	};

	return {
		isUserLoggedIn: function(){
			return $http.get('/models/get/userStatus');
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
			var errMsgs = [];

			if(data.indexOf("아이디 또는 비밀번호가 맞지 않습니다.") > 0){
				errMsgs.push("아이디 또는 비밀번호가 맞지 않습니다.");
			}

			if(data.indexOf("이미 등록된 아이디 입니다.") > 0){
				errMsgs.push("이미 등록된 아이디 입니다.");
			}

			if(data.indexOf("아이디가 정확히 입력되지 않았습니다.") > 0){
				errMsgs.push("아이디가 정확히 입력되지 않았습니다.");
			}

			if(data.indexOf("비밀번호가 정확히 입력되지 않았습니다.") > 0){
				errMsgs.push("비밀번호가 정확히 입력되지 않았습니다.");
			} 

			if(data.indexOf("비밀번호가 8글자 이하입니다.") > 0){
				errMsgs.push("비밀번호가 8글자 이하입니다.");
			} 

			if(data.indexOf("비밀번호가 32글자 이상입니다.") > 0){
				errMsgs.push("비밀번호가 8글자 이하입니다.");
			} 

			if(data.indexOf("비밀번호가 정확히 입력되지 않았습니다.") > 0){
				errMsgs.push("비밀번호가 정확히 입력되지 않았습니다.");
			} 

			if(data.indexOf("입력하신 비밀번호가 일치하지 않습니다.") > 0){
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
}])

.factory('$SPAsocket', function(){
	var socket;

	return {
		setSocket: function(io){
			socket = io;
		},
		getSocket: function(){
			return socket;
		}
	};
});
