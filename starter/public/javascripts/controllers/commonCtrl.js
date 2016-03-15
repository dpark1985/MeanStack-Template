
angular.module('common', ['ngRoute'])



.controller('navCtrl', ['$scope', '$location', function ($scope, $location) {
/************************************************************************
*																		*
*						Navbar & Footer Helper 							*
*																		*
*	Navbar and Footer are made by angular.js directives. Express does 	*
*	not recognize it. Therefore, EJS template syntex can't be used. 	*
*	To modify navbar and footer, user's status and ID must be stored in *
*	angular scope variables.											*
*																		*
*	    <script>														*
*    	    var isLoggedIn = <%= everyauth.loggedIn %>;					*
*      	 	<% if(everyauth.loggedIn) { %>								*
*        	    var userID = "<%= userID %>";							*
*        	<% } %>														*
*    	</script>														*
*																		*
*	Every page must have the above code to correctly view nav & footer. *																		*
*																		*
*************************************************************************
*	$scope.isLoggedIn = isLoggedIn;										*
*		Description: "Check if the user logged in"						*
*		return: "[True/False]"											*
*************************************************************************
*	$scope.userID = userID;												*
*		Description: "If the user is logged in, userID will have its 	*
*		ID"																*   
*		return: "user's id"												* 
************************************************************************/
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

.controller('footCtrl', ['$scope', '$location', function ($scope, $location) {





}])

/************************************************************************
*																		*
*	common templates directives											*
*																		*
*************************************************************************
*	templates															*
*		|-	naverBar.html												*
*		|-	footer.html													*
*	javascripts															*
*		|-	controllers													*
*			|-	commonCtrl.js 											*
************************************************************************/

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
		controller: 'footCtrl'
	};
});
