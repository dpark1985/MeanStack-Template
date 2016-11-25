var h3Framework = angular.module('h3Framework')

.controller('icSuccessListCtrl', ['$scope', '$wr_inquiryReport', '$wr_s', function ($scope, $wr_inquiryReport, $wr_s) {
  $icslc = this;

  $icslc.unRegist = function(data) {
    $wr_inquiryReport.doUnRegistInquiry(data).then(function (res) {
      console.log(res);
      if(res.data.unRegistInquiryReport) {
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

  $icslc.detail = function(data) {
    for(var i=0; i<data.img.length; i++){
      data.img[i].src = data.img[i].src.replace("public/", "");
    }

    $scope.$parent.ic.selectedItem = data;
    $('#detailsModalWithoutEdit').modal('show');
  };

  $icslc.init = function () {
    $wr_inquiryReport.getRegisteredInquiriesReport().then(function (res) {
      if(res.data.registeredInquiriesReport){
        $icslc.registeredInquiriesReport = res.data.list;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $icslc.init();

}]);
