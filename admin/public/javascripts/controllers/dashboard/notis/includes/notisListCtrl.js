var h3Framework = angular.module('h3Framework')

.controller('notisListCtrl', ['$scope', '$wr_notis', '$wr_s', function ($scope, $wr_notis, $wr_s) {
  $nlc = this;


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
