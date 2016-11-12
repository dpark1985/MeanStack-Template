var h3Framework = angular.module('h3Framework')

.controller('adsActiveListCtrl', ['$scope', '$wr_ads', '$wr_s', function ($scope, $wr_ads, $wr_s) {
  $aalc = this;

  $aalc.detail = function(data) {
    for(var i=0; i<data.adImage.length; i++){
      data.adImage[i].src = data.adImage[i].src.replace("public/", "");
    }

    $scope.$parent.ads.selectedItem = data;
    $('#detailsModalWithoutEdit').modal('show');
  };

  $aalc.expire = function(data){
    $wr_ads.doExpireAd(data).then(function (res) {
      if(res.data.expireAd) {
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

  $aalc.init = function () {
    $aalc.allActiveAdsList = null;
    $wr_ads.getAllActiveAdsList().then(function(res) {
      if(res.data.allActiveAdsList) {
        $aalc.allActiveAdsList = res.data.list;

        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $aalc.init();

}]);
