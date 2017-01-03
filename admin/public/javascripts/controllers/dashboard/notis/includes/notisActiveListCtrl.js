var h3Framework = angular.module('h3Framework')

.controller('notisActiveListCtrl', ['$scope', '$wr_notis', '$wr_s', function ($scope, $wr_notis, $wr_s) {
  $nalc = this;

  $nalc.detail = function(data) {
    $scope.$parent.notis.selectedItem = data;
    $('#detailsModalWithoutEdit').modal('show');
  };

  $nalc.deActivate = function(data) {
    $wr_notis.doDeActivateNoti(data).then(function (res){
      if(res.data.deActivateNoti){
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

  $nalc.init = function () {
    $nalc.allActiveNotisList = null;
    $wr_notis.getAllActiveNotisList().then(function(res) {
      if(res.data.allActiveNotisList) {
        $nalc.allActiveNotisList = res.data.list;

        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $nalc.init();

}]);
