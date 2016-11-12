var h3Framework = angular.module('h3Framework')

.controller('notisRejectListCtrl', ['$scope', '$wr_notis', '$wr_s', function ($scope, $wr_notis, $wr_s) {
  $nrlc = this;

  $nrlc.unReject = function(data) {
    $wr_notis.doUnReject(data).then(function (res) {
      if(res.data.unRejectNoti) {
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

  $nrlc.delete = function(data) {
    $wr_notis.doDelete(data).then(function (res) {
      if(res.data.deleteNoti) {
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

  $nrlc.detail = function(data) {
    $scope.$parent.notis.selectedItem = data;
    $('#detailsModal').modal('show');
  }

  $nrlc.init = function () {
    $nrlc.allRejectedNotisList = null;
    $wr_notis.getAllRejectedNotisList().then(function (res) {
      if(res.data.allRejectedNotisList){
        $nrlc.allRejectedNotisList = res.data.list;

        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $nrlc.init();

}]);
