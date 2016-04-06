
angular.module('SPAcontrollers', ['ngRoute', 'SPAfactories', 'SPAdirectives'])






.controller('logCtrl', ['$location', '$scope', '$window', '$SPAaccount', function ($location, $scope, $window, $SPAaccount) {
	var log = this;

	$SPAaccount.isUserLoggedIn().then(function (res){
		if(res.data.userID !== null){
			$location.path('/');
		} else {
			log.loginData = {};
			log.registerData = {};
			log.errMessages = null;
			var errMsgs = [];
		} 
	}, function (err){
		console.log(err);
	});

	log.doLogin = function(){
		var data = {
			login: log.loginData.userID,
			password: log.loginData.userPW
		};
		$SPAaccount.login(data).then(function (res){
			log.errMsgs = $SPAaccount.validation(res.data);
			if(log.errMsgs.length > 0){
				$('#modal-warning').modal('show');
			} else {
				$window.location = '/';
			}
		}, function (err){
			console.log(err);
		});
	};

	log.doRegister = function(){
		var data = {
			login: log.registerData.userID,
			password: log.registerData.userPW,
			passwordConfirm: log.registerData.userPWC
		};
		$SPAaccount.register(data).then(function (res){
			log.errMsgs = $SPAaccount.validation(res.data);
			if(log.errMsgs.length > 0){
				$('#modal-warning').modal('show');
			} else {
				$window.location = '/';
			}
		}, function (err){
			console.log(err);
		});
	};
}])
















.controller('navCtrl', ['$location', '$window', '$SPAaccount', function ($location, $window, $SPAaccount) {

	var nav = this;

	nav.userData = $SPAaccount.getUserData();
	nav.title = $('title').text();


	// automatically adds/removes class="active" 
	var current = $location.url().split('/')[1];

	nav.doLogout = function(){
		$SPAaccount.logout();
	};

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
	nav.rightActive = function(location){
		clearActive();
		$("a[href="+location+"]").parent().siblings().removeClass('active');
		$("a[href="+location+"]").parent().siblings().children().children(".sr-only").remove();
		$("a[href="+location+"]").parent().addClass('active');
		$("a[href="+location+"]").append('<span class="sr-only">(current)</span>');
	};


}])

.controller('footCtrl', ['$scope', function ($scope) {

	var foot = this;

}]);





