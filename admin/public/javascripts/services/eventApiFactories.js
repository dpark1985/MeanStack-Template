var h3Framework = angular.module('h3Framework')

.factory('$wr_event', ['$http', function ($http) {

  return {
    doInitCategories : function() {
      return $http({method: 'POST', url: '/wr/api/v1/events/initCategories'});
    },

    getCategories : function() {
      return $http({method: 'GET', url: '/wr/api/v1/events/initCategories'});
    },

    doAddMainCategory : function (data) {
      return $http({method: 'POST', url: '/wr/api/v1/events/addMainCategory', data: data});
    },

    doAddSubCategory : function (data) {
      return $http({method: 'POST', url: '/wr/api/v1/events/addSubCategory', data: data});
    },

    doRemoveMainCategory : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/events/removeMainCategory', data: data});
    },

    doRemoveSubCategory : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/events/removeSubCategory', data: data});
    },

    doRegistNewEvent : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/events/registNewEvent', data: data});
    },

    getAllEventsList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/events/allEventsList'});
    },

    getAllPendingEventsList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/events/allPendingEventsList'});
    },

    doActivateEvent : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/events/activateEvent', data: data});
    },

    doRejectEvent : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/events/rejectEvent', data: data});
    },

    getAllActiveEventsList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/events/allActiveEventsList'});
    },

    doDeActivateEvent : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/events/deActivateEvent', data: data});
    },

    doExpireEvent : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/events/expireEvent', data: data});
    },

    getAllExpiredEventsList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/events/allExpiredEventsList'});
    },

    doUnExpire : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/events/unExpireEvent', data: data});
    },

    getAllRejectedEventsList : function() {
      return $http({method: 'GET', url: '/wr/api/v1/events/allRejectedEventsList'});
    },

    doUnReject : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/events/unRejectEvent', data: data});
    },

    doDelete : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/events/deleteEvent', data: data});
    },

    getEventStatusCount : function() {
      return $http({method: 'GET', url: '/wr/api/v1/events/eventStatusCount'});
    },

    doCheckExpired : function() {
      return $http({method: 'POST', url: '/wr/api/v1/events/checkExpiredEvents'});
    }

  }


}]);
