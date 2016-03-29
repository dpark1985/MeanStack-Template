
angular.module('SPAcontrollers', ['ngRoute', 'SPAfactories', 'SPAdirectives', 'ui.ace'])



.controller('testingCtrl', ['$scope', function ($scope) {



}])

.controller('indexCtrl', ['$http', '$scope', '$SPAaccount', '$location', function ($http, $scope, $SPAaccount, $location) {


	this.doLogin = function(){
		$('#modal-login').modal('hide');
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






.controller('adminCtrl', ['$scope', '$http', '$location', '$window', '$sce', '$route', '$routeParams', '$SPAaccount', function ($scope, $http, $location, $window, $sce, $route, $routeParams, $SPAaccount) {
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
		$http.post('/ctrls/set/title', data).then(function (res) {
			if(res.data == 'OK. Redirecting to /'){
				$window.location = '/';
			}
		}, function (err){
			console.log(err);
		});
	};

	this.editChange = function(code){
		

		var data = {data: code};

		$http.post('/ctrls/set/blockCode/header', data).then(function (res){
			console.log(res);

			if(res.data === 'OK.'){
				$window.location = '/admin/header';
				
			}
		}, function (err){
			console.log(err);
		});
	}



	this.dataRetrive = function(category){
		if(category === 'header'){
			$http.get('/ctrls/get/blockCode/header').then(function (res){
				$scope.codeData = res.data;
			}, function (err){
				console.log(err);
			});
		}
	};


	function resetActive(at) {
		$('#'+at).parent().siblings().removeClass('active');
		$('#'+at).parent().addClass('active');
	}


	this.toSubmenu = function(category){
		$location.path('/admin/'+category);
		resetActive(category);
	}


	$scope.aceLoaded = function(_editor) {
		//_editor.setReadOnly(true);
		//_editor.setValue($scope.codeData);
		var _session = _editor.getSession();
    	var _renderer = _editor.renderer;

    	_editor.setValue($scope.codeData);
	};

	$scope.aceChanged = function(e){

	};

	$scope.params = $routeParams;

	if($scope.params.category === 'title'){
		resetActive($scope.params.category);

		$scope.contentView = "../../templates/views/admin/title.html";
		
	} else if ($scope.params.category === 'header'){
		resetActive($scope.params.category);
		this.dataRetrive($scope.params.category);
		





		$scope.contentView = "../../templates/views/admin/header.html";





	} else if ($scope.params.category === 'footer'){
		resetActive($scope.params.category);

		$scope.contentView = "../../templates/views/admin/footer.html";
	}



}])









.controller('navCtrl', ['$location', '$window', function ($location, $window) {

	// automatically adds/removes class="active" 
	var current = $location.url().split('/')[1];


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





