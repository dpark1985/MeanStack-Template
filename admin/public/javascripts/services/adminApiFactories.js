var h3Framework = angular.module('h3Framework')

.factory('$wr_auth', ['$http', function ($http) {

  return {
    doRegister : function(data) {
      return $http({method: 'POST', url: '/auth/newAdmin', data: data});
    },

    doLogin : function(data) {
      return $http({method: 'POST', url: '/auth/doLogin', data: data});
    },

    isAdminExist : function() {
      return $http({method: 'GET', url: '/wr/api/v1/admin/isAdminExist'});
    },

    isLoggedIn : function() {
      return $http({method: 'GET', url: '/wr/api/v1/admin/isLoggedIn'});
    }



  }


}]);
