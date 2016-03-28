
angular.module('SPA', ['ngRoute', 'SPAroutes'])
.controller('mainCtrl', ['$scope', '$SPAaccount', '$SPAsocket', function ($scope, $SPAaccount, $SPAsocket) {
	// mainCtrl is a global controller.
	// every controllers can access to mainCtrl's $scope variable
	$SPAaccount.isUserLoggedIn().success(function (data){
		if(data.userID === null){
			$scope.userData = {
				loggedIn: false,
				userID: null
			};
		} else {
			$scope.userData = {
				loggedIn: true,
				userID: data.userID
			};
		}
	});

	

	$SPAsocket.setSocket(socket);

	$scope.title = $('title').text();

	$scope.logout = function(){
		$SPAaccount.logout();
	};


	



}]);