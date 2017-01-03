var h3Framework = angular.module('h3Framework')

.service('$wr_s', ['$location', '$cookies', '$window', function ($location, $cookies, $window) {

  this.setUser = function (data) {
    $cookies.putObject('userInfo', data);
  };

  this.getUser = function() {
    return $cookies.getObject('userInfo');
  };

  this.loginCheckReDirect = function() {
    if(this.getUser()) {
      return this.getUser();
    } else {
      $location.path('/');
    }
  };

  this.logout = function() {
    $cookies.remove('userInfo');
    $window.location = '/logout';
  }

  this.showLoading = function() {
    $('#loadingModal').modal({
      backdrop: 'static',
      keyboard: false,
    });
  };

  this.hideLoading = function() {
    $('#loadingModal').modal('hide');
  };

  this.showServerError = function() {
    $('#severFail').modal({
      backdrop: 'static',
      keyboard: false,
    });
  }

  this.reloadPage = function() {
    $window.location.reload();
  }
}]);
