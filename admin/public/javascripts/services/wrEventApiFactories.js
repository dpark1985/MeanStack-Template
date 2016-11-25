var h3Framework = angular.module('h3Framework')

.factory('$wr_wrEvent', ['$http', function ($http) {

  return {

    doRegistNewEvent : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/wrEvents/registNewEvent', data: data});
    },

    getAllEventsList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/wrEvents/allEventsList'});
    },

    getAllPendingEventsList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/wrEvents/allPendingEventsList'});
    },

    doActivateEvent : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/wrEvents/activateEvent', data: data});
    },

    doRejectEvent : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/wrEvents/rejectEvent', data: data});
    },

    getAllActiveEventsList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/wrEvents/allActiveEventsList'});
    },

    doDeActivateEvent : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/wrEvents/deActivateEvent', data: data});
    },

    doExpireEvent : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/wrEvents/expireEvent', data: data});
    },

    getAllExpiredEventsList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/wrEvents/allExpiredEventsList'});
    },

    doUnExpire : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/wrEvents/unExpireEvent', data: data});
    },

    getAllRejectedEventsList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/wrEvents/allRejectedEventsList'});
    },

    doUnReject : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/wrEvents/unRejectEvent', data: data});
    },

    doDelete : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/wrEvents/deleteEvent', data: data});
    },

    getEventStatusCount : function() {
      return $http({method: 'GET', url: '/wr/api/v1/wrEvents/eventStatusCount'});
    }
  }


}]);
