var h3Framework = angular.module('h3Framework')

.controller('wrEventsCtrl', ['$wr_s', function ($wr_s) {
  var $wrEvents = this;

  $wrEvents.tabSelected = 'wrEventsMgmt';

  $wrEvents.tabConfig = [
    {name: "이벤트 관리", en: "wrEventsMgmt", active: true, templateUrl: "templates/views/dashboard/wrEvents/includes/wrEventsMgmt.html", ctrl: "wrEventsMgmtCtrl as wremc"},
    {name: "활성화 이벤트", en: "wrEventsActive", active: false, templateUrl: "templates/views/dashboard/wrEvents/includes/wrEventsActive.html", ctrl: "wrEventsActiveListCtrl as wrealc"},
    {name: "승인 대기", en: "wrEventsPending", active: false, templateUrl: "templates/views/dashboard/wrEvents/includes/wrEventsPending.html", ctrl: "wrEventsPendingListCtrl as wreplc"},
    {name: "승인 거절", en: "wrEventsReject", active: false, templateUrl: "templates/views/dashboard/wrEvents/includes/wrEventsReject.html", ctrl: "wrEventsRejectListCtrl as wrerlc"},
    {name: "이벤트 만료", en: "wrEventsExpire", active: false, templateUrl: "templates/views/dashboard/wrEvents/includes/wrEventsExpire.html", ctrl: "wrEventsExpireListCtrl as wreelc"},
    {name: "전체 목록", en: "wrEventsList", active: false, templateUrl: "templates/views/dashboard/wrEvents/includes/wrEventsList.html", ctrl: "wrEventsListCtrl as wrelc"},
    {name: "이벤트 등록", en: "wrEventsRegister", active: false, templateUrl: "templates/views/dashboard/wrEvents/includes/wrEventsRegister.html", ctrl: "wrEventsRegisterCtrl as wrerc"},
  ];

  $wrEvents.enableEdit = function() {
    $wrEvents.editDisabled = false;
  };

  $wrEvents.disableEdit = function() {
    $wrEvents.editDisabled = true;
  };

  $wrEvents.editData = function() {

  }

  $('#detailsModal').on('hidden.bs.modal', function (e) {
    $wrEvents.disableEdit();
  });

  $wrEvents.clearActive = function(tabConfig){
    for(var i=0; i<tabConfig.length; i++){
      tabConfig[i].active = false;
    }
  };

  $wrEvents.tabClick = function (tab) {
    if($wrEvents.tabSelected != tab.en){
      $wrEvents.tabSelected = tab.en;
      $wrEvents.clearActive($wrEvents.tabConfig);
      tab.active = true;
      $wr_s.showLoading();
    }
  };

  $wrEvents.init = function () {
    $wrEvents.editDisabled = true;


    $wr_s.showLoading();
  };

  $wrEvents.init();

}]);
