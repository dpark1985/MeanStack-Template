var h3Framework = angular.module('h3Framework')

.controller('appTitlePendingListCtrl', ['$scope', '$wr_appTitle', '$wr_s', function ($scope, $wr_appTitle, $wr_s) {
  $atplc = this;


  $atplc.reject = function(data) {
    $wr_appTitle.doReject(data).then(function (res) {
      if(res.data.reject) {
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

  $atplc.activate = function(data) {
    $wr_appTitle.doActivate(data).then(function (res) {
      if(res.data.activate) {
        $scope.$parent.appTitle.modalContent = {
          title: "상태 변경",
          context: "정상적으로 이벤트 상태가 변경되었습니다.",
          state: true
        };
        $('#appTitleModal').modal('show');
      } else {
        $scope.$parent.ads.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#appTitleModal').modal('show');
      }
    });
  };

  $('#appTitleModal').on('hidden.bs.modal', function (e) {
    $wr_s.reloadPage();
  });

  $atplc.detail = function(data) {
    for(var i=0; i<data.titleImage.length; i++){
      data.titleImage[i].src = data.titleImage[i].src.replace("public/", "");
    }

    $scope.$parent.appTitle.selectedItem = data;
    $('#detailsModalWithoutEdit').modal('show');
  }

  $atplc.init = function () {
    $atplc.allPendingAdsList = null;

    $wr_appTitle.getAllPendingList().then(function (res) {
      if(res.data.allPendingList){
        $atplc.allPendingList = res.data.list;

        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $atplc.init();

}]);
