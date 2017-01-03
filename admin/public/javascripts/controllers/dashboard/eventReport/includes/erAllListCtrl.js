var h3Framework = angular.module('h3Framework')

.controller('erAllListCtrl', ['$scope', '$wr_eventReport', '$wr_s', function ($scope, $wr_eventReport, $wr_s) {
  $eralc = this;


  $eralc.detail = function(data) {
    for(var i=0; i<data.img.length; i++){
      data.img[i].src = data.img[i].src.replace("public/", "");
    }

    $scope.$parent.er.selectedItem = data;
    $('#detailsModalWithoutEdit').modal('show');
  };

  $eralc.init = function () {
    $wr_eventReport.getAllEventsReport().then(function (res) {
      if(res.data.allEventsReport){
        $eralc.allEventsReport = res.data.list;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $eralc.init();

}]);
