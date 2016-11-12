var h3Framework = angular.module('h3Framework')

.controller('notisCtrl', ['$wr_s', function ($wr_s) {
  $notis = this;

  $notis.tabSelected = 'notisMgmt';

  $notis.tabConfig = [
    {name: "공지사항 관리", en: "notisMgmt", active: true, templateUrl: "templates/views/dashboard/notice/includes/notisMgmt.html", ctrl: "notisMgmtCtrl as nmc"},
    {name: "활성화 공지", en: "notisActive", active: false, templateUrl: "templates/views/dashboard/notice/includes/notisActive.html", ctrl: "notisActiveListCtrl as nalc"},
    {name: "승인 대기", en: "notisPending", active: false, templateUrl: "templates/views/dashboard/notice/includes/notisPending.html", ctrl: "notisPendingListCtrl as nplc"},
    {name: "승인 거절", en: "notisReject", active: false, templateUrl: "templates/views/dashboard/notice/includes/notisReject.html", ctrl: "notisRejectListCtrl as nrls"},
    {name: "전체 목록", en: "notisList", active: false, templateUrl: "templates/views/dashboard/notice/includes/notisList.html", ctrl: "notisListCtrl as nlc"},
    {name: "공지사항 등록", en: "notisRegister", active: false, templateUrl: "templates/views/dashboard/notice/includes/notisRegister.html", ctrl: "notisRegisterCtrl as nrc"},
  ];

  $notis.enableEdit = function() {
    $notis.editDisabled = false;
  };

  $notis.disableEdit = function() {
    $notis.editDisabled = true;
  };

  $notis.editData = function() {


    console.log($notis.selectedItem);
  }

  $notis.clearActive = function(tabConfig){
    for(var i=0; i<tabConfig.length; i++){
      tabConfig[i].active = false;
    }
  };

  $notis.tabClick = function (tab) {
    if($notis.tabSelected != tab.en){
      $notis.tabSelected = tab.en;
      $notis.clearActive($notis.tabConfig);
      tab.active = true;
      $wr_s.showLoading();
    }
  };

  $notis.init = function () {
    $notis.editDisabled = true;


    $wr_s.showLoading();
  };

  $notis.init();

}]);
