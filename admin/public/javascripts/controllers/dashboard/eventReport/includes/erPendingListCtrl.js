var h3Framework = angular.module('h3Framework')

.controller('erPendingListCtrl', ['$scope', '$wr_eventReport', '$wr_s', function ($scope, $wr_eventReport, $wr_s) {
  $erplc = this;

  $erplc.regist = function(data) {
    $wr_eventReport.doRegistEventReport(data).then(function (res) {
      if(res.data.registEventReport) {
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

  $erplc.reject = function(data) {
    $wr_eventReport.doRejectEventReport(data).then(function (res) {
      if(res.data.rejectEventReport) {
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

  $erplc.detail = function(data) {
    for(var i=0; i<data.img.length; i++){
      data.img[i].src = data.img[i].src.replace("public/", "");
    }

    $scope.$parent.er.selectedItem = data;
    $('#detailsModalWithoutEdit').modal('show');
  };

  $erplc.init = function () {
    $wr_eventReport.getExamedEventsReport().then(function (res) {
      if(res.data.examedEventsReport){
        $erplc.examedEventsReport = res.data.list;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $erplc.init();

}]);
