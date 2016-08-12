
var aitch3Framework = angular.module('aitch3Framework')

.controller('navCtrl', ['$location', '$window', '$SPAaccount', function ($location, $window, $SPAaccount) {

	var $nav = this;

	// Init navCtrl
	$nav.init = function() {

		$nav.userData = $SPAaccount.getUserData(); // Pull user data

		$nav.title = $('title').text(); // Set nav title

		// Menu route config
		$nav.menuRouteConfig = [
			{href:"home",		name:"Home",	active:false},
			{href:"aaa",		name:"aaaa",	active:false},
			{href:"blog",		name:"Blog",	active:false}
		];

		// Menu route config
		$nav.logRouteConfig = [
			{href:"login",		name:"Login",			active:false},
			{href:"register",	name:"Register",	active:false},
		];

		// automatically adds/removes class="active"
		var current = $location.url().split('/')[1];
		if(current != ""){
			$("a[href="+current+"]").parent().addClass('active');
			$("a[href="+current+"]").append('<span class="sr-only">(current)</span>');
		}
	}

	// Clear all active class if Brand link is clicked
	$nav.clearActive = function() {
		$nav.removeActiveClassMenu();
		$nav.removeActiveClassLog();
	}

	// Add active class to the menu
	$nav.addActiveClassMenu = function(route) {
		$nav.removeActiveClassMenu();
		$nav.removeActiveClassLog();
		route.active = true;
	}

	// Add active class to the log menu
	$nav.addActiveClassLog = function(route) {
		$nav.removeActiveClassMenu();
		$nav.removeActiveClassLog();
		route.active = true;
	}

	// Remove all active class from menu
	$nav.removeActiveClassMenu = function(){
		for(let i in $nav.menuRouteConfig){
			$nav.menuRouteConfig[i].active = false;
		}
	}


	// Remove all active calss from log Menu
	$nav.removeActiveClassLog = function(){
		for(let i in $nav.logRouteConfig){
			$nav.logRouteConfig[i].active = false;
		}
	}

	// Logout
	$nav.doLogout = function(){
		$SPAaccount.logout();
	};

	// Start navCtrol
	$nav.init();

}]);
