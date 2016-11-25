var h3Framework = angular.module('h3Framework')

.controller('inquiryCtrl', ['$wr_s', function ($wr_s) {
  $ic = this;

  $ic.tabSelected = 'icMgmt';

  $ic.tabConfig = [
    {name: "문의사항 관리", en: "icMgmt", active: true, templateUrl: "templates/views/dashboard/inquiries/includes/icMgmt.html", ctrl: "icMgmtCtrl as icmc"},
    {name: "새로운 문의사항", en: "icNew", active: false, templateUrl: "templates/views/dashboard/inquiries/includes/icNew.html", ctrl: "icNewListCtrl as icnlc"},
    {name: "문의사항 검토중", en: "icPending", active: false, templateUrl: "templates/views/dashboard/inquiries/includes/icPending.html", ctrl: "icPendingListCtrl as icplc"},
    {name: "확인 완료", en: "icSuccess", active: false, templateUrl: "templates/views/dashboard/inquiries/includes/icSuccess.html", ctrl: "icSuccessListCtrl as icslc"},
    {name: "전체 문의사항 목록", en: "icList", active: false, templateUrl: "templates/views/dashboard/inquiries/includes/icList.html", ctrl: "icAllListCtrl as icalc"},
  ];

  $ic.enableEdit = function() {
    $ic.editDisabled = false;
  };

  $ic.disableEdit = function() {
    $ic.editDisabled = true;
  };

  $ic.editData = function() {


    console.log($ic.selectedItem);
  }

  $ic.clearActive = function(tabConfig){
    for(var i=0; i<tabConfig.length; i++){
      tabConfig[i].active = false;
    }
  };

  $ic.tabClick = function (tab) {
    if($ic.tabSelected != tab.en){
      $ic.tabSelected = tab.en;
      $ic.clearActive($ic.tabConfig);
      tab.active = true;
      $wr_s.showLoading();
    }
  };

  $ic.init = function () {
    $ic.editDisabled = true;


    $wr_s.showLoading();
  };

  $ic.init();

}]);
