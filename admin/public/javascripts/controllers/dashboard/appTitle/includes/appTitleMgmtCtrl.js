var h3Framework = angular.module('h3Framework')

.controller('appTitleMgmtCtrl', ['$scope', '$wr_appTitle', '$wr_s', function ($scope, $wr_appTitle, $wr_s) {
  $atmc = this;

  $atmc.tabActivatedClick = function() {
    $scope.$parent.appTitle.tabClick($scope.$parent.appTitle.tabConfig[1]);
  };

  $atmc.tabPendingClick = function() {
    $scope.$parent.appTitle.tabClick($scope.$parent.appTitle.tabConfig[2]);
  };

  $atmc.tabRejectedClick = function() {
    $scope.$parent.appTitle.tabClick($scope.$parent.appTitle.tabConfig[3]);
  };

  $atmc.tabExpiredClick = function() {
    $scope.$parent.appTitle.tabClick($scope.$parent.appTitle.tabConfig[4]);
  };

  $atmc.tabAllEventsClick = function() {
    $scope.$parent.appTitle.tabClick($scope.$parent.appTitle.tabConfig[5]);
  };

  $atmc.init = function () {

    $wr_appTitle.getStatusCount().then(function (res) {
      console.log(res);
      if(res.data.statusCount) {
        $atmc.statusCount = res.data.values;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });

    $wr_s.hideLoading();
  };

  $atmc.init();

}]);
