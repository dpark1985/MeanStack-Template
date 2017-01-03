var h3Framework = angular.module('h3Framework')

.controller('notisPendingListCtrl', ['$scope', '$wr_notis', '$wr_s', function ($scope, $wr_notis, $wr_s) {
  $nplc = this;


  $nplc.rejectNoti = function(data) {
    $wr_notis.doRejectNoti(data).then(function (res) {
      if(res.data.rejectNoti) {
        $scope.$parent.notis.modalContent = {
          title: "상태 변경",
          context: "정상적으로 공지사항 상태가 변경되었습니다.",
          state: true
        };
        $('#notiStateModal').modal('show');
      } else {
        $scope.$parent.notis.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#notiStateModal').modal('show');
      }
    });
  };

  $nplc.activateNoti = function(data) {
    $wr_notis.doActivateNoti(data).then(function (res) {
      if(res.data.activateNoti) {
        $scope.$parent.notis.modalContent = {
          title: "상태 변경",
          context: "정상적으로 공지사항 상태가 변경되었습니다.",
          state: true
        };
        $('#notiStateModal').modal('show');
      } else {
        $scope.$parent.notis.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#notiStateModal').modal('show');
      }
    });
  };

  $('#notiStateModal').on('hidden.bs.modal', function (e) {
    $wr_s.reloadPage();
  });

  $nplc.detail = function(data) {
    $scope.$parent.notis.selectedItem = data;
    $('#detailsModal').modal('show');
  }

  $nplc.init = function () {
    $nplc.allPendingNotisList = null;

    $wr_notis.getAllPendingNotisList().then(function (res) {
      if(res.data.allPendingNotisList){
        $nplc.allPendingNotisList = res.data.list;

        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $nplc.init();

}]);
