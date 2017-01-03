var h3Framework = angular.module('h3Framework')

.controller('erSuccessListCtrl', ['$scope', '$wr_eventReport', '$wr_s', function ($scope, $wr_eventReport, $wr_s) {
  $erslc = this;

  $erslc.unRegist = function(data) {
    $wr_eventReport.doUnRegistEventReport(data).then(function (res) {
      if(res.data.unRegistEventReport) {
        $scope.$parent.er.modalContent = {
          title: "상태 변경",
          context: "정상적으로 이벤트 상태가 변경되었습니다.",
          state: true
        };
        $('#eventReportStateModal').modal('show');
      } else {
        $scope.$parent.er.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#eventReportStateModal').modal('show');
      }
    });
  };

  $('#eventReportStateModal').on('hidden.bs.modal', function (e) {
    $wr_s.reloadPage();
  });

  $erslc.detail = function(data) {
    if(data.img){
      for(var i=0; i<data.img.length; i++){
        data.img[i].src = data.img[i].src.replace("public/", "");
      }
    }
    
    $scope.$parent.er.selectedItem = data;
    $('#detailsModalWithoutEdit').modal('show');
  };

  $erslc.init = function () {
    $wr_eventReport.getRegisteredEventsReport().then(function (res) {
      if(res.data.registeredEventsReport){
        $erslc.registeredEventsReport = res.data.list;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $erslc.init();

}]);
