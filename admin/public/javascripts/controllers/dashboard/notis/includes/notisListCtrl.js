var h3Framework = angular.module('h3Framework')

.controller('notisListCtrl', ['$scope', '$wr_notis', '$wr_s', function ($scope, $wr_notis, $wr_s) {
  $nlc = this;

  $nlc.delete = function(data) {
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

  $nlc.detail = function(data) {
    $scope.$parent.notis.selectedItem = data;
    $('#detailsModalWithoutEdit').modal('show');
  }

  $nlc.init = function () {
    $nlc.allNotisList = null;
    $wr_notis.getAllNotisList().then(function (res) {
      if(res.data.allNotisList){
        $nlc.allNotisList = res.data.list;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $nlc.init();

}]);
