var h3Framework = angular.module('h3Framework')

.controller('adsListCtrl', ['$scope', '$wr_ads', '$wr_s', function ($scope, $wr_ads, $wr_s) {
  $alc = this;


  $alc.detail = function(data) {
    for(var i=0; i<data.adImage.length; i++){
      data.adImage[i].src = data.adImage[i].src.replace("public/", "");
    }

    $scope.$parent.ads.selectedItem = data;
    $('#detailsModalWithoutEdit').modal('show');
  }

  $alc.init = function () {
    $alc.allAdsList = null;
    $wr_ads.getAllAdsList().then(function (res) {
      if(res.data.allAdsList){
        $alc.allAdsList = res.data.list;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $alc.init();

}]);
