var h3Framework = angular.module('h3Framework')

.factory('$wr_inquiryReport', ['$http', function ($http) {

  return {

    getAllInquiriesReport : function() {
      return $http({method: 'GET', url: '/wr/api/v1/inquiryReport/allInquiriesReport'});
    },

    getNewInquiriesReport : function() {
      return $http({method: 'GET', url: '/wr/api/v1/inquiryReport/newInquiriesReport'});
    },

    getExamedInquiriesReport : function() {
      return $http({method: 'GET', url: '/wr/api/v1/inquiryReport/examedInquiriesReport'});
    },

    getRegisteredInquiriesReport : function() {
      return $http({method: 'GET', url: '/wr/api/v1/inquiryReport/registeredInquiriesReport'});
    },

    getInquiryReportStatusCount : function() {
      return $http({method: 'GET', url: '/wr/api/v1/inquiryReport/inquiryReportStatusCount'});
    },

    doExamInquiry : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/inquiryReport/examInquiryReport', data: data});
    },

    doRegistInquiry : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/inquiryReport/registInquiryReport', data: data});
    },

    doUnRegistInquiry : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/inquiryReport/unRegistInquiryReport', data: data});
    },

    doRejectInquiry : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/inquiryReport/rejectInquiryReport', data: data});
    },

    doDeleteInquiry : function(data) {
      return $http({method: 'POST', url: '/wr/api/v1/inquiryReport/deleteInquiryReport', data: data});
    }


  }


}]);
