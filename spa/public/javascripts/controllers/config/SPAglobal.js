
angular.module('SPA', ['ngRoute', 'SPAroutes', 'SPAcustomConfig'])
.controller('mainCtrl', ['$scope', '$SPAaccount', '$SPAsocket', function ($scope, $SPAaccount, $SPAsocket) {
	// mainCtrl is a global controller.
	// every controllers can access to mainCtrl's $scope variable
	$SPAaccount.isUserLoggedIn().success(function (data){
		if(data.userID === null){
			$SPAaccount.setUserData({ loggedIn: false, userID: null });
		} else {
			$SPAaccount.setUserData({ loggedIn: true, userID: data.userID });
		}
	});

	$SPAsocket.setSocket(socket);

	$scope.titleText = "SPA CMS";

	$scope.bodyStyle = {background: "rgb(255, 255, 255)"};

}]);