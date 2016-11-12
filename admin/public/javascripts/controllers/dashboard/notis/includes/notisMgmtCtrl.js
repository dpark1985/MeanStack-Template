var h3Framework = angular.module('h3Framework')

.controller('notisMgmtCtrl', ['$scope', '$wr_notis', '$wr_s', function ($scope, $wr_notis, $wr_s) {
  $nmc = this;

  $nmc.tabActivatedClick = function() {
    $scope.$parent.notis.tabClick($scope.$parent.notis.tabConfig[1]);
  };

  $nmc.tabPendingClick = function() {
    $scope.$parent.notis.tabClick($scope.$parent.notis.tabConfig[2]);
  };

  $nmc.tabRejectedClick = function() {
    $scope.$parent.notis.tabClick($scope.$parent.notis.tabConfig[3]);
  };

  $nmc.tabAllEventsClick = function() {
    $scope.$parent.notis.tabClick($scope.$parent.notis.tabConfig[4]);
  };

  $nmc.init = function () {
    $wr_notis.getNotisStatusCount().then(function (res) {
      if(res.data.notisStatusCount) {
        $nmc.notisStatusCount = res.data.values;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });

    $wr_s.hideLoading();
  };

  $nmc.init();

}]);
