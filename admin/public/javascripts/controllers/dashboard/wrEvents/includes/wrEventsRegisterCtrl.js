var h3Framework = angular.module('h3Framework')

.controller('wrEventsRegisterCtrl', ['$scope', '$location', '$wr_wrEvent', '$wr_s', function ($scope, $location, $wr_wrEvent, $wr_s) {
  var $wrerc = this;


  $wrerc.submit = function() {
    $wr_wrEvent.doRegistNewEvent($wrerc.eventInfo).then(function (res) {
      if(res.data.registNewEvent){
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

  $wrerc.eventRegisterInit = function() {
    $wrerc.eventInfo = {
      title: null,
      href: null,
      desc: null,
      imgThumbSrc: null,
    };

    $wr_s.hideLoading();
  };

  $wrerc.init = function () {
    $wrerc.eventRegisterInit();
  };

  $wrerc.init();

}]);
