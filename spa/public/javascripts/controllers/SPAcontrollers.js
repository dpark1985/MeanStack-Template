
angular.module('SPAcontrollers', ['ngRoute', 'SPAfactories', 'SPAdirectives'])



.controller('testingCtrl', ['$scope', function ($scope) {



}])

.controller('indexCtrl', ['$http', '$scope', '$SPAaccount', function ($http, $scope, $SPAaccount) {


	this.doLogin = function(){
		$('#modal-login').modal('hide');

		var data = {
			login: this.loginData.userID,
			password: this.loginData.userPW
		};

		$SPAaccount.login(data).success(function (res){
			$scope.errMsgs = $SPAaccount.validation(res);

			if($scope.errMsgs.length > 0){
				console.log($scope.errMsgs);
				$('#modal-warning').modal('show');
			} else {
				window.location = '/';
			}
		});
	};


}])

.controller('blogCtrl', ['$scope', function ($scope) {


}])

.controller('logCtrl', ['$http', '$location', '$scope', '$SPAaccount', function ($http, $location, $scope, $SPAaccount) {

	$SPAaccount.isUserLoggedIn().then(function (res){
		if(res.data.userID !== null){
			$location.path('/');
		} else {
			this.loginData = {};
			this.registerData = {};
			$scope.errMessages = null;
			var errMsgs = [];
		} 
	}, function (err){
		console.log(err);
	});



	this.doLogin = function(){
		var data = {
			login: this.loginData.userID,
			password: this.loginData.userPW
		};

		$SPAaccount.login(data).then(function (res){
			$scope.errMsgs = $SPAaccount.validation(res.data);
			if($scope.errMsgs.length > 0){
				$('#modal-warning').modal('show');
			} else {
				window.location = '/';
			}
		}, function (err){
			console.log(err);
		});
	};



	this.doRegister = function(){
		var data = {
			login: this.registerData.userID,
			password: this.registerData.userPW,
			passwordConfirm: this.registerData.userPWC
		};

		$SPAaccount.register(data).then(function (res){
			$scope.errMsgs = $SPAaccount.validation(res.data);
			if($scope.errMsgs.length > 0){
				$('#modal-warning').modal('show');
			} else {
				window.location = '/';
			}
		}, function (err){
			console.log(err);
		});
	};


}])

.controller('adminCtrl', ['$scope', '$http', '$location', '$route', '$window', '$SPAaccount', function ($scope, $http, $location, $route, $window, $SPAaccount) {

	$SPAaccount.isUserLoggedIn().then(function (res){
		if(res.data.userID === null){
			$location.path('/');
		}
	}, function (err){
		console.log(err);
	});





	this.titleText = $('title').text();

	this.editTitle = function(){

		var data = {
			old: this.titleText,
			title: this.inputData.title
		};

		$http.post('/models/set/title', data)
		.then(function successCallback(res) {
			//console.log(res);
			if(res.data == 'OK. Redirecting to /'){
				$SPAaccount.logout();

				$window.location.reload();

				//$route.reload();
				$location.path('/');
				//window.location.reload()
				//window.location = '/';
			}

		}, function errorCallback(res) {

		});
	}


}])

.controller('navCtrl', ['$location', function ($location) {

	// automatically adds/removes class="active" 
	var current = $location.url().replace("/", "");
	var navList = $('.nav.navbar-nav li');
	function clearActive(){
		navList.siblings().removeClass('active');
		navList.siblings().children().children(".sr-only").remove();
	}
	if(current != ""){
		$("a[href="+current+"]").parent().addClass('active');
		$("a[href="+current+"]").append('<span class="sr-only">(current)</span>');
	}
	$('.navbar-brand').click(function(){
		clearActive();
	});
	navList.click(function(){
		if(!$(this).hasClass("dropdown")){
			clearActive();
	        $(this).addClass('active');
	        $(this).children().append('<span class="sr-only">(current)</span>');
		}
	});
	$('.dropdown-menu li').click(function(){
		clearActive();
	});
	

	// nav.clearNav() must be called when ng-* is used
	this.clearNav = function(){
		clearActive();
	};

}])

.controller('footCtrl', ['$scope', function ($scope) {



}]);





