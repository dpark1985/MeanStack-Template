var h3Framework = angular.module('h3Framework')

.controller('adsMgmtCtrl', ['$scope', '$wr_ads', '$wr_s', function ($scope, $wr_ads, $wr_s) {
  $amc = this;

  $amc.tabActivatedClick = function() {
    $scope.$parent.ads.tabClick($scope.$parent.ads.tabConfig[1]);
  };

  $amc.tabPendingClick = function() {
    $scope.$parent.ads.tabClick($scope.$parent.ads.tabConfig[2]);
  };

  $amc.tabRejectedClick = function() {
    $scope.$parent.ads.tabClick($scope.$parent.ads.tabConfig[3]);
  };

  $amc.tabExpiredClick = function() {
    $scope.$parent.ads.tabClick($scope.$parent.ads.tabConfig[4]);
  };

  $amc.tabAllEventsClick = function() {
    $scope.$parent.ads.tabClick($scope.$parent.ads.tabConfig[5]);
  };

  $amc.init = function () {
    $wr_ads.getAdStatusCount().then(function (res) {
      if(res.data.adStatusCount) {
        $amc.adStatusCount = res.data.values;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $amc.init();

}]);
