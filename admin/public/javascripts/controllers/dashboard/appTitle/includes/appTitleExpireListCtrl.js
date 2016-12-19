var h3Framework = angular.module('h3Framework')

.controller('appTitleExpireListCtrl', ['$scope', '$wr_appTitle', '$wr_s', function ($scope, $wr_appTitle, $wr_s) {
  $atelc = this;

  $atelc.unExpire = function(data) {
    $wr_appTitle.doUnExpire(data).then(function (res) {
      if(res.data.unExpire) {
        $scope.$parent.appTitle.modalContent = {
          title: "상태 변경",
          context: "정상적으로 이벤트 상태가 변경되었습니다.",
          state: true
        };
        $('#appTitleModal').modal('show');
      } else {
        $scope.$parent.appTitle.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#appTitleModal').modal('show');
      }
    });
  };

  $atelc.delete = function(data) {
    $wr_appTitle.doDelete(data).then(function (res) {
      if(res.data.doDelete) {
        $scope.$parent.appTitle.modalContent = {
          title: "상태 변경",
          context: "정상적으로 이벤트 상태가 변경되었습니다.",
          state: true
        };
        $('#appTitleModal').modal('show');
      } else {
        $scope.$parent.appTitle.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#appTitleModal').modal('show');
      }
    });
  };

  $atelc.detail = function(data) {
    for(var i=0; i<data.titleImage.length; i++){
      data.titleImage[i].src = data.titleImage[i].src.replace("public/", "");
    }

    $scope.$parent.appTitle.selectedItem = data;
    $('#detailsModalWithoutEdit').modal('show');
  };

  $('#appTitleModal').on('hidden.bs.modal', function (e) {
    $wr_s.reloadPage();
  });

  $atelc.init = function () {
    $atelc.allExpiredList = null;
    $wr_appTitle.getAllExpiredList().then(function(res) {
      if(res.data.allExpiredList) {
        $atelc.allExpiredList = res.data.list;

        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $atelc.init();

}]);
