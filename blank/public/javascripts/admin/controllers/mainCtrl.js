
var aitch3AdminFramework = angular.module('aitch3AdminFramework')

.controller('mainCtrl', ['$scope', '$http', '$window', '$location', '$routeParams', '$adminFactory', function ($scope, $http, $window, $location, $routeParams, $adminFactory) {
	$scope.bodyStyle = {background: "rgb(247, 247, 247)"};

	$scope.toMain = function(){
		$window.location = "/";
	};

	$scope.singleMenuReDirect = function(singleObj){
		$scope.clearActivate();
		singleObj.activate = true;
		$location.path(singleObj.href);
	};

	$scope.subMenuReDirect = function(collapseObj, linkObj){
		$scope.clearActivate();
		collapseObj.activate = true;
		linkObj.activate = true;
		$location.path(linkObj.href);
	};

	$scope.clearActivate = function(){
		for(var i=0; i<$scope.singleMenuConfig.length; i++){
			$scope.singleMenuConfig[i].activate = false;
		}
		for(var i=0; i<$scope.collapseMenuConfig.length; i++){
			$scope.collapseMenuConfig[i].activate = false;
			for(var j=0; j<$scope.collapseMenuConfig[i].subMenus.length; j++){
				$scope.collapseMenuConfig[i].subMenus[j].activate = false;
			}
		}
	};

	$scope.init = function(){
		$http.get('/adminCtrl/adminStatus').then(function (res){
			$adminFactory.setUserData({userID : res.data.userID});
			$scope.userStatus = $adminFactory.getUserData();
			if(!$scope.userStatus.loggedIn){
				$location.path('/admin');
			}
		}, function (err){
			console.log(err);
		});

		$scope.singleMenuConfig = [
			{id: "dashboard", name: "Dashboard", href: "admin/dashboard", icon: "fa fa-dashboard fa-lg", activate: false},
			{id: "profile", name: "Profile", href: "admin/profile", icon: "fa fa-user fa-lg", activate: false},
			{id: "users", name: "Users", href: "admin/users", icon: "fa fa-users fa-lg", activate: false},
		];

		$scope.collapseMenuConfig = [
			{
				id: "config",
				name: "Configuration",
				icon: "fa fa-gift fa-lg",
				activate: false,
				subMenus: [
					{id: "summary", name: "Summary", href: "admin/config/summary", activate: false},
					{id: "server", name: "Server", href: "admin/config/server", activate: false},
					{id: "sitemap", name: "SiteMap", href: "admin/config/sitemap", activate: false}
				]
			},
			{
				id: "service",
				name: "Services",
				icon: "fa fa-globe fa-lg",
				activate: false,
				subMenus: [
					{id: "service1", name: "New Service 1", href: "admin/service/service1", activate: false},
					{id: "service2", name: "New Service 2", href: "admin/service/service2", activate: false},
					{id: "service3", name: "New Service 3", href: "admin/service/service3", activate: false}
				]
			},
			{
				id: "new",
				name: "New",
				icon: "fa fa-car fa-lg",
				activate: false,
				subMenus: [
					{id: "new1", name: "New Service 1", href: "admin/new/new1", activate: false},
					{id: "new2", name: "New Service 2", href: "admin/new/new2", activate: false},
					{id: "new3", name: "New Service 3", href: "admin/new/new3", activate: false}
				]
			},
			{
				id: "products",
				name: "UI Elements",
				icon: "fa fa-gift fa-lg",
				activate: false,
				subMenus: [
					{id: "products1", name: "CSS3 Animation", href: "admin/products/products1", activate: false},
					{id: "products2", name: "General", href: "admin/products/products2", activate: false},
					{id: "products3", name: "Buttons", href: "admin/products/products3", activate: false},
					{id: "products4", name: "Tabs & Accordions", href: "admin/products/products4", activate: false},
					{id: "products5", name: "Typography", href: "admin/products/products5", activate: false},
					{id: "products6", name: "FontAwesome", href: "admin/products/products6", activate: false},
					{id: "products7", name: "Slider", href: "admin/products/products7", activate: false},
					{id: "products8", name: "Panels", href: "admin/products/products8", activate: false},
					{id: "products9", name: "Widgets", href: "admin/products/products9", activate: false},
					{id: "products10", name: "Header", href: "admin/products/products10", activate: false},
					{id: "products11", name: "Footer", href: "admin/products/products11", activate: false}
				]
			}
		];

		var currentPath = $location.path().split('/');
		if(currentPath.length === 3){
			for(var i=0; i<$scope.singleMenuConfig.length; i++){
				if($scope.singleMenuConfig[i].id === currentPath[2]){
					$scope.singleMenuConfig[i].activate = true;
				}
			}
		} else if (currentPath.length === 4){
			for(var i=0; i<$scope.collapseMenuConfig.length; i++){
				if($scope.collapseMenuConfig[i].id === currentPath[2]){
					$scope.collapseMenuConfig[i].activate = true;

					for(var j=0; j<$scope.collapseMenuConfig[i].subMenus.length; j++){
						if($scope.collapseMenuConfig[i].subMenus[j].id === currentPath[3]) {
							$scope.collapseMenuConfig[i].subMenus[j].activate = true;
						}
					}
				}
			}
		}
	};

	$scope.init();
}]);
