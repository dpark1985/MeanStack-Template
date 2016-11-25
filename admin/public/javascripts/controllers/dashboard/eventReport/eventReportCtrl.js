var h3Framework = angular.module('h3Framework')

.controller('eventReportCtrl', ['$wr_s', function ($wr_s) {
  $er = this;

  $er.tabSelected = 'erMgmt';

  $er.tabConfig = [
    {name: "이벤트 제보 관리", en: "erMgmt", active: true, templateUrl: "templates/views/dashboard/eventReports/includes/erMgmt.html", ctrl: "erMgmtCtrl as ermc"},
    {name: "새로운 이벤트 제보", en: "erNew", active: false, templateUrl: "templates/views/dashboard/eventReports/includes/erNew.html", ctrl: "erNewListCtrl as ernlc"},
    {name: "이벤트 검토중", en: "erPending", active: false, templateUrl: "templates/views/dashboard/eventReports/includes/erPending.html", ctrl: "erPendingListCtrl as erplc"},
    {name: "이벤트 등록 완료", en: "erSuccess", active: false, templateUrl: "templates/views/dashboard/eventReports/includes/erSuccess.html", ctrl: "erSuccessListCtrl as erslc"},
    {name: "이벤트 등록 취소", en: "erReject", active: false, templateUrl: "templates/views/dashboard/eventReports/includes/erReject.html", ctrl: "erRejectListCtrl as errlc"},
    {name: "전체 이벤트 제보 목록", en: "erList", active: false, templateUrl: "templates/views/dashboard/eventReports/includes/erList.html", ctrl: "erAllListCtrl as eralc"},
  ];

  $er.enableEdit = function() {
    $er.editDisabled = false;
  };

  $er.disableEdit = function() {
    $er.editDisabled = true;
  };

  $er.editData = function() {


    console.log($er.selectedItem);
  }

  $er.clearActive = function(tabConfig){
    for(var i=0; i<tabConfig.length; i++){
      tabConfig[i].active = false;
    }
  };

  $er.tabClick = function (tab) {
    if($er.tabSelected != tab.en){
      $er.tabSelected = tab.en;
      $er.clearActive($er.tabConfig);
      tab.active = true;
      $wr_s.showLoading();
    }
  };

  $er.init = function () {
    $er.editDisabled = true;


    $wr_s.showLoading();
  };

  $er.init();

}]);
