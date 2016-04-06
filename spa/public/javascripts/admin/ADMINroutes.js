
angular.module('SPAadmin', ['ngRoute', 'SPAfactories', 'ui.ace'])

.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/admin', { 
			templateUrl: 'templates/admin/admin.html', 
			controller: 'adminCtrl', 
			controllerAs: 'admin' 
		});

		$routeProvider.when('/admin/:category', { 
			templateUrl: 'templates/admin/adminSub.html', 
			controller: 'adminSubCtrl', 
			controllerAs: 'adminSub' 
		});

		$routeProvider.when('/admin/:category/preview', { 
			templateUrl: 'templates/admin/adminPreview.html',
			controller: 'adminSubCtrl', 
			controllerAs: 'adminSub'
		});



		$routeProvider.otherwise({ 
			templateUrl: 'templates/common/404.html' 
		});
    $locationProvider.html5Mode(true).hashPrefix('!');
}])



.factory('$adminFactory', function(){
	var userStatus = {
		loggedIn: false,
		userID: null
	};
	return {
		setUserData: function (data){
			if(data.userID === null){
				userStatus.loggedIn = false;
				userStatus.userID = data.userID;
			} else {
				userStatus.loggedIn = true;
				userStatus.userID = data.userID;
			}
		},
		getUserData: function(){
			return userStatus;
		}
	}
})

.controller('mainCtrl', ['$scope', '$http', '$window', '$SPAaccount', '$adminFactory', function ($scope, $http, $window, $SPAaccount, $adminFactory) {
	
	$scope.toMain = function(){
		$window.location = "/";
	}

	$scope.bodyStyle = {background: "rgb(222, 222, 222)"};

	$http.get('/models/get/adminStatus').then(function (res){
		$adminFactory.setUserData({userID : res.data.userID});
		$scope.userData = $adminFactory.getUserData();
		
	}, function (err){
		console.log(err);
	});

	$scope.doLogout = function(){
		$SPAaccount.logout();
	};

	$('a.navbar-brand').mouseenter(function(){
		$(this).children().removeClass("fa fa-arrow-circle-o-left");
		$(this).children().addClass("fa fa-arrow-circle-left");
	});

	$('a.navbar-brand').mouseleave(function(){
		$(this).children().removeClass("fa fa-arrow-circle-left");
		$(this).children().addClass("fa fa-arrow-circle-o-left");
	});


}])

.controller('adminCtrl', ['$scope', '$http', '$window', '$adminFactory', '$SPAaccount', function ($scope, $http, $window, $adminFactory, $SPAaccount) {
	var admin = this;
	admin.userStatus = $adminFactory.getUserData();
	admin.doLogin = function(){
		var data = {
			login: admin.userInput.userID,
			password: admin.userInput.password
		};
		$SPAaccount.login(data).then(function (res){
			admin.errMsgs = $SPAaccount.validation(res.data);
			if(admin.errMsgs.length > 0){
				$('#modal-warning').modal('show');
			} else {
				$window.location = '/admin';
			}
		}, function (err){
			console.log(err);
		});
	};
}])

.controller('adminSubCtrl', ['$http', '$location', '$window', '$sce', '$route', '$timeout', '$routeParams', '$SPAaccount', '$adminFactory', function ($http, $location, $window, $sce, $route, $timeout, $routeParams, $SPAaccount, $adminFactory) {
	var adminSub = this;

	// side menu active state (collapse)
	$('ul.sub-menu li').click(function(){
		var elId = $(this).parent().attr("id");
		$('li[data-target="#'+ elId +'"]').siblings().removeClass("active");
		$('ul.sub-menu').children().removeClass("active");
		$('li[data-target="#'+ elId +'"]').addClass("active");
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});

	// side menu active state (non collapse)
	$('li.singleLink').click(function(){
		$('li[data-toggle="collapse"]').siblings().removeClass("active");
		$('ul.sub-menu li').siblings().removeClass("active");
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});

	// get user authority status
	adminSub.userStatus = $adminFactory.getUserData();
	console.log(adminSub.userStatus.loggedIn);
	if(!adminSub.userStatus.loggedIn){
		$location.path('/admin');
	}

	adminSub.titleText = $('title').text();
	adminSub.params = $routeParams;


	adminSub.editTitle = function(){
		var data = {
			oldTitle: adminSub.titleText,
			newTitle: adminSub.inputData.title
		};

		$http.post('/ctrls/set/title', data).then(function (res) {
			if(res.data == 'OK. Redirecting to /'){
				$window.location = '/';
			}
		}, function (err){
			console.log(err);
		});


	};

	adminSub.doRefresh = function(){
		$window.location = '/admin/'+adminSub.params.category;
	}

	adminSub.dataRetrive = function(category){
		adminSub.codeData = null;
		$http.get('/ctrls/get/blockCode/'+category).then(function (res){
			adminSub.codeDataTrusted = $sce.trustAsHtml(res.data);
			adminSub.codeData = res.data;

		}, function (err){
			console.log(err);
		});
	};

	
	adminSub.aceLoaded = function(_editor) {
    	_editor.setHighlightActiveLine(true);
    	_editor.$blockScrolling = Infinity;

    	adminSub.editData = function(){
    		var data = {data: _editor.getValue()};
			$http.post('/ctrls/set/blockCode/'+adminSub.params.category, data).then(function (res){
				if(res.data === 'OK.'){
					$window.location = '/admin/'+adminSub.params.category;
				}
			}, function (err){
				console.log(err);
			});
    	};

    	adminSub.editPreviewData = function(){
    		var data = {data: _editor.getValue()};
			$http.post('/ctrls/set/blockCode/'+adminSub.params.category, data).then(function (res){
				if(res.data === 'OK.'){
					$window.close();
				}
			}, function (err){
				console.log(err);
			});
    	};
	};


	adminSub.aceChanged = function(e){
		$('#previewCode').removeClass('panel-default');
		$('#previewCode').addClass('panel-warning');

		$timeout(function(){
			$('#previewCode').removeClass('panel-warning');
			$('#previewCode').addClass('panel-default');
		}, 300);

		adminSub.codeDataTrusted = $sce.trustAsHtml(adminSub.codeData);
	};

	adminSub.aceBlured = function(e){


	};

	function resetActive(at) {
		$('#'+at).parent().siblings().removeClass('active');
		$('#'+at).parent().addClass('active');
	}

	adminSub.toSubmenu = function(category){
		$location.path('/admin/'+category);
		resetActive(category);
	};

	if(adminSub.params.category === 'title'){
		resetActive(adminSub.params.category);
		adminSub.contentView = "../../templates/admin/title.html";
	} else if (adminSub.params.category === 'header'){
		resetActive(adminSub.params.category);
		adminSub.dataRetrive(adminSub.params.category);
		adminSub.contentView = "../../templates/admin/header.html";
	} else if (adminSub.params.category === 'footer'){
		resetActive(adminSub.params.category);
		adminSub.dataRetrive(adminSub.params.category);
		adminSub.contentView = "../../templates/admin/footer.html";
	}

}]);



