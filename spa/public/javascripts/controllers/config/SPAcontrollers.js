
angular.module('SPAcontrollers', ['ngRoute', 'SPAfactories', 'SPAdirectives', 'ui.ace'])






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






.controller('adminCtrl', ['$http', '$location', '$window', '$sce', '$route', '$routeParams', '$SPAaccount', function ($http, $location, $window, $sce, $route, $routeParams, $SPAaccount) {
	var admin = this;

	// check user loggin
	$SPAaccount.isUserLoggedIn().then(function (res){
		if(res.data.userID === null){
			$location.path('/');
		}
	}, function (err){
		console.log(err);
	});

	admin.titleText = $('title').text();
	admin.params = $routeParams;


	

	admin.editTitle = function(){
		var data = {
			oldTitle: admin.titleText,
			newTitle: admin.inputData.title
		};

		//console.log(data);


		$http.post('/ctrls/set/title', data).then(function (res) {
			if(res.data == 'OK. Redirecting to /'){
				$window.location = '/';
			}
		}, function (err){
			console.log(err);
		});


	};


	admin.dataRetrive = function(category){
		admin.codeData = null;
		$http.get('/ctrls/get/blockCode/'+category).then(function (res){
			admin.codeDataTrusted = $sce.trustAsHtml(res.data);
			admin.codeData = res.data;
		}, function (err){
			console.log(err);
		});
	};


	function resetActive(at) {
		$('#'+at).parent().siblings().removeClass('active');
		$('#'+at).parent().addClass('active');
	}


	admin.toSubmenu = function(category){
		$location.path('/admin/'+category);
		resetActive(category);
	}


	admin.aceLoaded = function(_editor) {
    	_editor.setHighlightActiveLine(true);
    	_editor.$blockScrolling = Infinity;

    	admin.editData = function(){
    		//console.log(admin.params);
    		var data = {data: _editor.getValue()};
			$http.post('/ctrls/set/blockCode/'+admin.params.category, data).then(function (res){
				if(res.data === 'OK.'){
					$window.location = '/admin/'+admin.params.category;
				}
			}, function (err){
				console.log(err);
			});
    	};
	};

	admin.aceChanged = function(e){
		admin.codeDataTrusted = $sce.trustAsHtml(admin.codeData);
	};

	admin.aceBlured = function(e){
		//console.log($scope.codeData);
		//var preview = e.getValue();
		//admin.codeDataTrusted = $sce.trustAsHtml(preview);
	};

	


	if(admin.params.category === 'title'){
		resetActive(admin.params.category);
		admin.contentView = "../../templates/admin/title.html";
	} else if (admin.params.category === 'header'){
		resetActive(admin.params.category);
		admin.dataRetrive(admin.params.category);
		admin.contentView = "../../templates/admin/header.html";
	} else if (admin.params.category === 'footer'){
		resetActive(admin.params.category);
		admin.dataRetrive(admin.params.category);
		admin.contentView = "../../templates/admin/footer.html";
	}

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





