var h3Framework = angular.module('h3Framework')

.controller('wrEventsRejectListCtrl', ['$scope', '$location', '$wr_wrEvent', '$wr_s', function ($scope, $location, $wr_wrEvent, $wr_s) {
  var $wrerlc = this;

  $wrerlc.unReject = function(data) {
    $wr_wrEvent.doUnReject(data).then(function (res) {
      if(res.data.doUnReject) {
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

  $wrerlc.delete = function(data) {
    $wr_wrEvent.doDelete(data).then(function (res) {
      if(res.data.doDelete) {
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

  $wrerlc.detail = function(data) {
    for(var i=0; i<data.imgThumbSrc.length; i++){
      data.imgThumbSrc[i].src = data.imgThumbSrc[i].src.replace("public/", "");
    }

    $scope.$parent.wrEvents.selectedItem = data;
    $('#detailsModal').modal('show');
  }

  $wrerlc.init = function () {
    $wrerlc.allRejectedEventsList = null;
    $wr_wrEvent.getAllRejectedEventsList().then(function(res) {
      if(res.data.getAllRejectedEventsList) {
        $wrerlc.allRejectedEventsList = res.data.list;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    })
  };

  $wrerlc.init();
}]);
