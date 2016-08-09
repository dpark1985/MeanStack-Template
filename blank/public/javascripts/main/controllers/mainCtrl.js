
var aitch3Framework = angular.module('aitch3Framework')

.controller('mainCtrl', ['$scope', '$location', '$SPAaccount', '$SPAsocket', function ($scope, $location, $SPAaccount, $SPAsocket) {
	// mainCtrl is a global controller.
	// every controllers can access to mainCtrl's $scope variable
	$SPAaccount.isUserLoggedIn().then(function (res){
		if(res.data.userID === null){
			$SPAaccount.setUserData({ loggedIn: false, userID: null });
		} else {
			$SPAaccount.setUserData({ loggedIn: true, userID: res.data.userID });
		}
	});



	$SPAsocket.setSocket(socket);

	$scope.titleText = "ABC";

	$scope.bodyStyle = {background: "rgb(255, 255, 255)"};


}]);
