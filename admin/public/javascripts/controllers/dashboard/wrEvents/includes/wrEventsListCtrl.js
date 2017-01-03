var h3Framework = angular.module('h3Framework')

.controller('wrEventsListCtrl', ['$scope', '$wr_wrEvent', '$wr_s', function ($scope, $wr_wrEvent, $wr_s) {
  var $wrelc = this;

  $wrelc.detail = function(data) {
    for(var i=0; i<data.imgThumbSrc.length; i++){
      data.imgThumbSrc[i].src = data.imgThumbSrc[i].src.replace("public/", "");
    }

    $scope.$parent.wrEvents.selectedItem = data;
    $('#detailsModal').modal('show');
  };

  $wrelc.init = function () {
    $wrelc.allEventList = null;
    $wr_wrEvent.getAllEventsList().then(function (res) {
      if(res.data.getAllEventsList) {
        $wrelc.allEventList = res.data.list;

        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $wrelc.init();



}]);
