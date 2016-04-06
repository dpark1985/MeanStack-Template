
angular.module('SPAcustomConfig', ['ngRoute', 'SPAfactories'])

.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: 'templates/views/index.html',
			controller: 'indexCtrl',
			controllerAs: 'index'
		});

		$routeProvider.when('/blog', {
			templateUrl: 'templates/views/blog.html',
			controller: 'blogCtrl',
			controllerAs: 'blog'
		});

		$routeProvider.when('/testing', {
			templateUrl: 'templates/views/testing.html',
			controller: 'testingCtrl',
			controllerAs: 'testing'
		});
    $locationProvider.html5Mode(true).hashPrefix('!');
}])


.controller('indexCtrl', ['$http', '$window', '$SPAaccount', function ($http, $window, $SPAaccount) {
	var index = this;

	index.userData = $SPAaccount.getUserData();
	index.title = $('title').text();

	index.doLogin = function(){
		$('#modal-login').modal('hide');
		var data = {
			login: index.loginData.userID,
			password: index.loginData.userPW
		};
		$SPAaccount.login(data).then(function (res){
			index.errMsgs = $SPAaccount.validation(res.data);
			if(index.errMsgs.length > 0){
				$('#modal-warning').modal('show');
			} else {
				$window.location = '/';
			}
		}, function (err){
			console.log(err);
		});
	};

	index.doLogout = function(){
		$SPAaccount.logout();
	};

	index.testing = function(){
		var data = { title : index.title };
		$http.post('/ctrls/create/file', data).then(function (res){
			console.log(res);
			if(res.statusText === 'OK'){
				$window.location = '/';
			}
		}, function (res){

		})
	};

	index.toAdmin = function(){
		$window.location = '/admin';
	}

}])

.controller('blogCtrl', ['$http', function ($http) {
	var blog = this;



}])

.controller('testingCtrl', ['$http', function ($http) {
	var testing = this;



}]);


