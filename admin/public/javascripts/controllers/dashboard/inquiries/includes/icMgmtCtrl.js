var h3Framework = angular.module('h3Framework')

.controller('icMgmtCtrl', ['$scope', '$wr_inquiryReport', '$wr_s', function ($scope, $wr_inquiryReport, $wr_s) {
  $icmc = this;

  $icmc.tabActivatedClick = function() {
    $scope.$parent.ic.tabClick($scope.$parent.ic.tabConfig[1]);
  };

  $icmc.tabPendingClick = function() {
    $scope.$parent.ic.tabClick($scope.$parent.ic.tabConfig[2]);
  };

  $icmc.tabRejectedClick = function() {
    $scope.$parent.ic.tabClick($scope.$parent.ic.tabConfig[3]);
  };

  $icmc.tabExpiredClick = function() {
    $scope.$parent.ic.tabClick($scope.$parent.ic.tabConfig[4]);
  };


  $icmc.init = function () {
    $wr_inquiryReport.getInquiryReportStatusCount().then(function (res) {
      if(res.data.inquiryReportStatusCount) {
        $icmc.inquiryReportStatusCount = res.data.values;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $icmc.init();

}]);
