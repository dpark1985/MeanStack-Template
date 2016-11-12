var h3Framework = angular.module('h3Framework')

.controller('adsRejectListCtrl', ['$scope', '$wr_ads', '$wr_s', function ($scope, $wr_ads, $wr_s) {
  $arlc = this;

  $arlc.unReject = function(data) {
    $wr_ads.doUnReject(data).then(function (res) {
      if(res.data.unRejectAd) {
        $scope.$parent.ads.modalContent = {
          title: "상태 변경",
          context: "정상적으로 이벤트 상태가 변경되었습니다.",
          state: true
        };
        $('#adStateModal').modal('show');
      } else {
        $scope.$parent.ads.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#adStateModal').modal('show');
      }
    });
  };

  $arlc.delete = function(data) {
    $wr_ads.doDelete(data).then(function (res) {
      if(res.data.doDelete) {
        $scope.$parent.ads.modalContent = {
          title: "상태 변경",
          context: "정상적으로 이벤트 상태가 변경되었습니다.",
          state: true
        };
        $('#adStateModal').modal('show');
      } else {
        $scope.$parent.ads.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#adStateModal').modal('show');
      }
    });
  };

  $('#adStateModal').on('hidden.bs.modal', function (e) {
    $wr_s.reloadPage();
  });

  $arlc.detail = function(data) {
    for(var i=0; i<data.adImage.length; i++){
      data.adImage[i].src = data.adImage[i].src.replace("public/", "");
    }

    $scope.$parent.ads.selectedItem = data;
    $('#detailsModal').modal('show');
  }

  $arlc.init = function () {
    $arlc.allRejectedAdsList = null;
    $wr_ads.getAllRejectedAdsList().then(function (res) {
      if(res.data.allRejectedAdsList){
        $arlc.allRejectedAdsList = res.data.list;

        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $arlc.init();

}]);
