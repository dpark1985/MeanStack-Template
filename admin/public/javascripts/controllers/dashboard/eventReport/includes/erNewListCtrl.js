var h3Framework = angular.module('h3Framework')

.controller('erNewListCtrl', ['$scope', '$wr_eventReport', '$wr_s', function ($scope, $wr_eventReport, $wr_s) {
  $ernlc = this;

  $ernlc.exam = function(data) {
    $wr_eventReport.doExamEventReport(data).then(function (res) {
      if(res.data.examEventReport) {
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

  $ernlc.detail = function(data) {
    for(var i=0; i<data.img.length; i++){
      data.img[i].src = data.img[i].src.replace("public/", "");
    }

    $scope.$parent.er.selectedItem = data;
    $('#detailsModalWithoutEdit').modal('show');
  };

  $ernlc.init = function () {
    $wr_eventReport.getNewEventsReport().then(function (res) {
      if(res.data.newEventsReport){
        $ernlc.newEventsReport = res.data.list;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $ernlc.init();

}]);
