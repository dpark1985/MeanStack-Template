var h3Framework = angular.module('h3Framework')

.controller('wrEventsActiveListCtrl', ['$scope', '$wr_wrEvent', '$wr_s', function ($scope, $wr_wrEvent, $wr_s) {
  var $wrealc = this;

  $wrealc.deActivate = function(data) {
    $wr_wrEvent.doDeActivateEvent(data).then(function (res){
      if(res.data.deActivateEvent){
        $scope.$parent.wrEvents.modalContent = {
          title: "이벤트 등록",
          context: "정상적으로 이벤트가 등록되었습니다.",
          state: true
        };
        $('#wrEventStateModal').modal('show');
      } else {
        $scope.$parent.wrEvents.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#wrEventStateModal').modal('show');
      }
    });
  };

  $wrealc.expire = function(data) {
    $wr_wrEvent.doExpireEvent(data).then(function (res) {
      if(res.data.doExpireEvent) {
        $scope.$parent.wrEvents.modalContent = {
          title: "이벤트 등록",
          context: "정상적으로 이벤트가 등록되었습니다.",
          state: true
        };
        $('#wrEventStateModal').modal('show');
      } else {
        $scope.$parent.wrEvents.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#wrEventStateModal').modal('show');
      }
    });
  };

  $('#wrEventStateModal').on('hidden.bs.modal', function (e) {
    $wr_s.reloadPage();
  });

  $wrealc.detail = function(data) {
    for(var i=0; i<data.imgThumbSrc.length; i++){
      data.imgThumbSrc[i].src = data.imgThumbSrc[i].src.replace("public/", "");
    }

    $scope.$parent.wrEvents.selectedItem = data;
    $('#detailsModal').modal('show');
  }

  $wrealc.init = function () {
    $wrealc.allActiveEventsList = null;
    $wr_wrEvent.getAllActiveEventsList().then(function(res) {
      if(res.data.allActiveEventsList){
        $wrealc.allActiveEventsList = res.data.list;

        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $wrealc.init();
}]);
