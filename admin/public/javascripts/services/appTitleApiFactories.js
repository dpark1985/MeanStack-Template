var h3Framework = angular.module('h3Framework')

.factory('$wr_appTitle', ['$http', function ($http) {

  return {

    doRegistNewTitle : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/appTitle/registNewTitle', data: data});
    },

    getAllTitleList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/appTitle/allTitleList'});
    },

    getAllPendingList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/appTitle/allPendingList'});
    },

    doActivate : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/appTitle/activate', data: data});
    },

    doReject : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/appTitle/reject', data: data});
    },

    getAllActiveList : function(data) {
      return $http({method: 'GET', url: '/wr/api/v1/appTitle/allActiveList'});
    },

    doExpireAd : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/appTitle/expire', data: data});
    },

    getAllExpiredList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/appTitle/allExpiredList'});
    },

    doUnExpire : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/appTitle/unExpire', data: data});
    },

    getAllRejectedList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/appTitle/allRejectedList'});
    },

    doUnReject : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/appTitle/unReject', data: data});
    },

    getStatusCount : function() {
      return $http({method: 'GET', url: '/wr/api/v1/appTitle/statusCount'});
    },

    doDelete : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/appTitle/deleteImg', data: data});
    }

  }


}]);
