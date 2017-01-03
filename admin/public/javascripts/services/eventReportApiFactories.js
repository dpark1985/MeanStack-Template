var h3Framework = angular.module('h3Framework')

.factory('$wr_eventReport', ['$http', function ($http) {

  return {

    getNewEventsReport : function() {
      return $http({method: 'GET', url: '/wr/api/v1/eventReport/newEventsReport'});
    },

    getAllEventsReport : function() {
      return $http({method: 'GET', url: '/wr/api/v1/eventReport/allEventsReport'});
    },

    getExamedEventsReport : function() {
      return $http({method: 'GET', url: '/wr/api/v1/eventReport/examedEventsReport'});
    },

    getRegisteredEventsReport : function() {
      return $http({method: 'GET', url: '/wr/api/v1/eventReport/registeredEventsReport'});
    },

    getRejectedEventsReport : function() {
      return $http({method: 'GET', url: '/wr/api/v1/eventReport/rejectedEventsReport'});
    },

    getEventReportStatusCount : function() {
      return $http({method: 'GET', url: '/wr/api/v1/eventReport/eventReportStatusCount'});
    },

    doExamEventReport : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/eventReport/examEventReport', data: data});
    },

    doRegistEventReport : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/eventReport/registEventReport', data: data});
    },

    doUnRegistEventReport : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/eventReport/unRegistEventReport', data: data});
    },

    doRejectEventReport : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/eventReport/rejectEventReport', data: data});
    },

    doUnRejectEventReport : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/eventReport/unRejectEventReport', data: data});
    },

    doDeleteEventReport : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/eventReport/deleteEventReport', data: data});
    },




  }


}]);
