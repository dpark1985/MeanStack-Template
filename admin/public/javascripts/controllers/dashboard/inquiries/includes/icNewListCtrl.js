var h3Framework = angular.module('h3Framework')

.controller('icNewListCtrl', ['$scope', '$wr_inquiryReport', '$wr_s', function ($scope, $wr_inquiryReport, $wr_s) {
  $icnlc = this;

  $icnlc.exam = function(data) {
    $wr_inquiryReport.doExamInquiry(data).then(function (res) {
      if(res.data.examInquiryReport) {
        $scope.$parent.ic.modalContent = {
          title: "상태 변경",
          context: "정상적으로 이벤트 상태가 변경되었습니다.",
          state: true
        };
        $('#inquiryReportStateModal').modal('show');
      } else {
        $scope.$parent.ic.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#inquiryReportStateModal').modal('show');
      }
    });
  };

  $('#inquiryReportStateModal').on('hidden.bs.modal', function (e) {
    $wr_s.reloadPage();
  });

  $icnlc.detail = function(data) {
    for(var i=0; i<data.img.length; i++){
      data.img[i].src = data.img[i].src.replace("public/", "");
    }

    $scope.$parent.ic.selectedItem = data;
    $('#detailsModalWithoutEdit').modal('show');
  };

  $icnlc.init = function () {
    $wr_inquiryReport.getNewInquiriesReport().then(function (res) {
      if(res.data.newInquiriesReport){
        $icnlc.newInquiriesReport = res.data.list;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $icnlc.init();

}]);
