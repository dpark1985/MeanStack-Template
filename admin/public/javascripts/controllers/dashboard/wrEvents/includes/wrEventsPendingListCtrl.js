var h3Framework = angular.module('h3Framework')

.controller('wrEventsPendingListCtrl', ['$scope', '$wr_wrEvent', '$wr_s', function ($scope, $wr_wrEvent, $wr_s) {
  var $wreplc = this;

  $wreplc.activateEvent = function(data) {
    $wr_wrEvent.doActivateEvent(data).then(function (res) {
      if(res.data.activateEvent) {
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

  $wreplc.rejectEvent = function(data) {
    $wr_wrEvent.doRejectEvent(data).then(function (res) {
      if(res.data.rejectEvent) {
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

  $wreplc.detail = function(data) {
    for(var i=0; i<data.imgThumbSrc.length; i++){
      data.imgThumbSrc[i].src = data.imgThumbSrc[i].src.replace("public/", "");
    }

    $scope.$parent.wrEvents.selectedItem = data;
    $('#detailsModal').modal('show');
  };

  $wreplc.init = function () {
    $wreplc.allPendingEventsList = null;
    $wr_wrEvent.getAllPendingEventsList().then(function (res) {
      if(res.data.getAllPendingEventsList) {
        $wreplc.allPendingEventsList = res.data.list;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $wreplc.init();
}]);
