var h3Framework = angular.module('h3Framework')

.controller('eventMgmtCtrl', ['$scope', '$wr_event', '$wr_s', function ($scope, $wr_event, $wr_s) {
  var $emc = this;

  $emc.tabActivatedClick = function() {
    $scope.$parent.events.tabClick($scope.$parent.events.tabConfig[1]);
  };

  $emc.tabPendingClick = function() {
    $scope.$parent.events.tabClick($scope.$parent.events.tabConfig[2]);
  };

  $emc.tabRejectedClick = function() {
    $scope.$parent.events.tabClick($scope.$parent.events.tabConfig[3]);
  };

  $emc.tabExpiredClick = function() {
    $scope.$parent.events.tabClick($scope.$parent.events.tabConfig[4]);
  };

  $emc.tabAllEventsClick = function() {
    $scope.$parent.events.tabClick($scope.$parent.events.tabConfig[5]);
  };

  $emc.checkExpired = function() {
    $wr_event.doCheckExpired().then(function(res){
      if(res.data.checkExpired) {
        $scope.$parent.events.modalContent = {
          title: "상태 변경",
          context: "정상적으로 이벤트 상태가 변경되었습니다.",
          state: true
        };
        $('#eventStateModal').modal('show');
      } else {
        $scope.$parent.events.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#eventStateModal').modal('show');
      }
    });
  };

  $('#eventStateModal').on('hidden.bs.modal', function (e) {
    $wr_s.reloadPage();
  });

  $emc.init = function () {
    $wr_event.getEventStatusCount().then(function (res) {
      if(res.data.eventStatusCount) {
        $emc.eventStatusCount = res.data.values;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $emc.init();
}]);
