var h3Framework = angular.module('h3Framework')

.controller('erMgmtCtrl', ['$scope', '$wr_eventReport', '$wr_s', function ($scope, $wr_eventReport, $wr_s) {
  $ermc = this;

  $ermc.tabActivatedClick = function() {
    $scope.$parent.er.tabClick($scope.$parent.er.tabConfig[1]);
  };

  $ermc.tabPendingClick = function() {
    $scope.$parent.er.tabClick($scope.$parent.er.tabConfig[2]);
  };

  $ermc.tabRejectedClick = function() {
    $scope.$parent.er.tabClick($scope.$parent.er.tabConfig[3]);
  };

  $ermc.tabExpiredClick = function() {
    $scope.$parent.er.tabClick($scope.$parent.er.tabConfig[4]);
  };

  $ermc.tabAllEventsClick = function() {
    $scope.$parent.er.tabClick($scope.$parent.er.tabConfig[5]);
  };

  $ermc.init = function () {
    $wr_eventReport.getEventReportStatusCount().then(function (res) {
      if(res.data.eventReportStatusCount) {
        $ermc.eventReportStatusCount = res.data.values;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $ermc.init();

}]);
