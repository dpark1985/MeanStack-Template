
angular.module('SPA', ['ngRoute', 'SPAroutes'])
.controller('mainCtrl', ['$scope', '$location', '$SPAaccount', '$SPAsocket', function ($scope, $location, $SPAaccount, $SPAsocket) {
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



	$scope.logout = function(){
		$SPAaccount.logout();
	};


	$SPAsocket.setSocket(socket);



}])