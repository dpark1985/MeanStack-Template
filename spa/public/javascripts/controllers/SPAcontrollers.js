
angular.module('SPAcontrollers', ['ngRoute', 'SPAfactories', 'SPAdirectives'])



.controller('testingCtrl', ['$scope', function ($scope) {



}])

.controller('indexCtrl', ['$http', '$scope', '$SPAaccount', '$location', function ($http, $scope, $SPAaccount, $location) {


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

.controller('logCtrl', ['$http', '$location', '$scope', '$window', '$SPAaccount', function ($http, $location, $scope, $window, $SPAaccount) {

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
				$window.location = '/';
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
				$window.location = '/';
			}
		}, function (err){
			console.log(err);
		});
	};


}])

.controller('adminCtrl', ['$scope', '$http', '$location', '$route', '$window', '$SPAaccount', function ($scope, $http, $location, $route, $window, $SPAaccount) {
	// check user loggin
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
		$http.post('/ctrls/set/title', data)
		.then(function successCallback(res) {
			if(res.data == 'OK. Redirecting to /'){
				$window.location = '/';
			}
		}, function errorCallback(err) {
			console.log(err);
		});
	};

	function dataRetrive(category){

		console.log(category);

		var data = {};

		if(category == 'header'){

			data = {category: category};

			$http.post('/ctrls/get/blockCode', data)
			.then(function successCallback(res){
				console.log(res);
			}, function errorCallback(err){
				console.log(err)
			})



		}
		

	

	}


	$('#adminTab a').click(function (e){
		e.preventDefault();
		$(this).tab('show');
		
		dataRetrive($(this).attr('href').replace('#', ''));

	});




}])

.controller('navCtrl', ['$location', function ($location) {

	// automatically adds/removes class="active" 
	var current = $location.url().replace("/", "");
	var navList = $('.nav.navbar-nav li');
	function clearRightActive(location){
		$("a[href="+location+"]").parent().siblings().removeClass('active');
		$("a[href="+location+"]").parent().siblings().children().children(".sr-only").remove();
	};
	function clearActive(){
		clearRightActive('login');
		clearRightActive('register');
		navList.siblings().removeClass('active');
		navList.siblings().children().children(".sr-only").remove();
	};
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
	this.rightActive = function(location){
		clearActive();
		$("a[href="+location+"]").parent().siblings().removeClass('active');
		$("a[href="+location+"]").parent().siblings().children().children(".sr-only").remove();
		$("a[href="+location+"]").parent().addClass('active');
		$("a[href="+location+"]").append('<span class="sr-only">(current)</span>');
	};


}])

.controller('footCtrl', ['$scope', function ($scope) {



}]);




