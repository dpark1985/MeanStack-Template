var h3Framework = angular.module('h3Framework')

.factory('$wr_ads', ['$http', function ($http) {

  return {

    doRegistNewAd : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/ads/registNewAd', data: data});
    },

    getAllAdsList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/ads/allAdsList'});
    },

    getAllPendingEventsList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/ads/allPendingAdsList'});
    },

    doActivateAd : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/ads/activateAd', data: data});
    },

    doRejectAd : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/ads/rejectAd', data: data});
    },

    getAllActiveAdsList : function(data) {
      return $http({method: 'GET', url: '/wr/api/v1/ads/allActiveAdsList'});
    },

    doExpireAd : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/ads/expireAd', data: data});
    },

    getAllExpiredAdsList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/ads/allExpiredAdsList'});
    },

    doUnExpire : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/ads/unExpireAd', data: data});
    },

    getAllRejectedAdsList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/ads/allRejectedAdsList'});
    },

    doUnReject : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/ads/unRejectAd', data: data});
    },

    getAdStatusCount : function() {
      return $http({method: 'GET', url: '/wr/api/v1/ads/adStatusCount'});
    },

    doDelete : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/ads/deleteAd', data: data});
    }

  }


}]);
