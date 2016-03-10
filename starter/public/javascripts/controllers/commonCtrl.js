angular.module('common', ['ngRoute'])




.controller('navCtrl', ['$scope', '$location', function ($scope, $location) {

	/*
	*************************************************************************
	*	$scope.isLoggedIn = isLoggedIn; 									*
	*		if user is logged in it will return True 						*
	*		otherwise False													*
	*																		*
	*	$scope.userID														*
	*		if user is logged in, $scope.userID will have user's ID 		*
	*																		*
	*************************************************************************
	*		var isLoggedIn = <%= everyauth.loggedIn %> 						*
	*		<% if(everyauth.loggedIn) { %> 									*
    *       	var userID = "<%= userID %>";								*
    *	  	<% } %>															*
    *************************************************************************
	*/
		
	$scope.isLoggedIn = isLoggedIn;



	if($scope.isLoggedIn){
		$scope.userID = userID;
	}


	$scope.extra = '';

	if($location.absUrl().split('/')[4] != undefined){
		$scope.extra = '../';		
	}	

	if($location.absUrl().split('/')[5] != undefined){
		$scope.extra = '../../';
	}
	if($location.absUrl().split('/')[6] != undefined){
		$scope.extra = '../../../';
	}
	if($location.absUrl().split('/')[7] != undefined){
		$scope.extra = '../../../../';
	}


}])


/*
*************************************************************************
*																		*
*	common templates													*
*																		*
*************************************************************************
*	templates															*
*		|-	naverBar.html												*
*		|-	footer.html													*
*	javascripts															*
*		|-	controllers													*
*			|-	commonCtrl.js 											*
*************************************************************************
*/
.directive('navCustom', function() {
	return {
		restrict: 'E',
		templateUrl: '../../../templates/common/navBar.html',
		controller: 'navCtrl'
	};
})
.directive('footerCustom', function() {
	return {
		restrict: 'E',
		templateUrl: '../../../templates/common/footer.html',
		controller: 'navCtrl'
	};
});
