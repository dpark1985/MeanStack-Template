var h3Framework = angular.module('h3Framework')

.factory('$wr_notis', ['$http', function ($http) {

  return {
    doRegistNewNoti : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/notis/registNewNoti', data: data});
    },

    getAllNotisList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/notis/allNotisList'});
    },

    getAllPendingNotisList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/notis/allPendingNotisList'});
    },

    doActivateNoti : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/notis/activateNoti', data: data});
    },

    doRejectNoti : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/notis/rejectNoti', data: data});
    },

    getAllActiveNotisList : function(data) {
      return $http({method: 'GET', url: '/wr/api/v1/notis/allActiveNotisList'});
    },

    doDeActivateNoti : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/notis/deActivateNoti', data: data});
    },

    getAllRejectedNotisList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/notis/allRejectedNotisList'});
    },

    doUnReject : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/notis/unRejectNoti', data: data});
    },

    getNotisStatusCount : function() {
      return $http({method: 'GET', url: '/wr/api/v1/notis/notisStatusCount'});
    },

    doDelete : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/notis/deleteNoti', data: data});
    }

  }


}]);
