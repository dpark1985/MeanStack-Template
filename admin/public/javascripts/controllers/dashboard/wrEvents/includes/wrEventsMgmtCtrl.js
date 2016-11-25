var h3Framework = angular.module('h3Framework')

.controller('wrEventsMgmtCtrl', ['$scope', '$wr_wrEvent', '$wr_s', function ($scope, $wr_wrEvent, $wr_s) {
  var $wremc = this;

  $wremc.tabActivatedClick = function() {
    $scope.$parent.wrEvents.tabClick($scope.$parent.wrEvents.tabConfig[1]);
  };

  $wremc.tabPendingClick = function() {
    $scope.$parent.wrEvents.tabClick($scope.$parent.wrEvents.tabConfig[2]);
  };

  $wremc.tabRejectedClick = function() {
    $scope.$parent.wrEvents.tabClick($scope.$parent.wrEvents.tabConfig[3]);
  };

  $wremc.tabExpiredClick = function() {
    $scope.$parent.wrEvents.tabClick($scope.$parent.wrEvents.tabConfig[4]);
  };

  $wremc.tabAllEventsClick = function() {
    $scope.$parent.wrEvents.tabClick($scope.$parent.wrEvents.tabConfig[5]);
  };

  $wremc.checkExpired = function() {
    $wr_wrEvent.doCheckExpired().then(function(res){
      if(res.data.checkExpired) {
        $scope.$parent.wrEvents.modalContent = {
          title: "이벤트 등록",
          context: "정상적으로 이벤트가 등록되었습니다.",
          state: true
        };
        $('#wrEventStateModal').modal('show');
      } else {
        $scope.$parent.wrEvents.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#wrEventStateModal').modal('show');
      }
    });
  };

  $('#wrEventStateModal').on('hidden.bs.modal', function (e) {
    $wr_s.reloadPage();
  });

  $wremc.init = function () {
    $wremc.eventStatusCount = null;
    $wr_wrEvent.getEventStatusCount().then(function (res) {
      if(res.data.eventStatusCount) {
        $wremc.eventStatusCount = res.data.values;

        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $wremc.init();
}]);
