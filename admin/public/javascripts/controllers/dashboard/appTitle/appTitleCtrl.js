var h3Framework = angular.module('h3Framework')

.controller('appTitleCtrl', ['$wr_s', function ($wr_s) {
  $appTitle = this;

  $appTitle.tabSelected = 'appTitleMgmt';

  $appTitle.tabConfig = [
    {name: "앱 타이틀 관리", en: "appTitleMgmt", active: true, templateUrl: "templates/views/dashboard/appTitle/includes/appTitleMgmt.html", ctrl: "appTitleMgmtCtrl as atmc"},
    {name: "활성화 타이틀", en: "appTitleActive", active: false, templateUrl: "templates/views/dashboard/appTitle/includes/appTitleActive.html", ctrl: "appTitleActiveListCtrl as atalc"},
    {name: "승인 대기", en: "appTitlePending", active: false, templateUrl: "templates/views/dashboard/appTitle/includes/appTitlePending.html", ctrl: "appTitlePendingListCtrl as atplc"},
    {name: "승인 거절", en: "appTitleReject", active: false, templateUrl: "templates/views/dashboard/appTitle/includes/appTitleReject.html", ctrl: "appTitleRejectListCtrl as atrlc"},
    {name: "종료 광고", en: "appTitleExpire", active: false, templateUrl: "templates/views/dashboard/appTitle/includes/appTitleExpire.html", ctrl: "appTitleExpireListCtrl as atelc"},
    {name: "전체 목록", en: "appTitleList", active: false, templateUrl: "templates/views/dashboard/appTitle/includes/appTitleList.html", ctrl: "appTitleListCtrl as atlc"},
    {name: "타이틀 등록", en: "appTitleRegister", active: false, templateUrl: "templates/views/dashboard/appTitle/includes/appTitleRegister.html", ctrl: "appTitleRegisterCtrl as atrc"},
  ];

  $appTitle.enableEdit = function() {
    $appTitle.editDisabled = false;
  };

  $appTitle.disableEdit = function() {
    $appTitle.editDisabled = true;
  };

  $appTitle.editData = function() {


    console.log($appTitle.selectedItem);
  }

  $appTitle.clearActive = function(tabConfig){
    for(var i=0; i<tabConfig.length; i++){
      tabConfig[i].active = false;
    }
  };

  $appTitle.tabClick = function (tab) {
    if($appTitle.tabSelected != tab.en){
      $appTitle.tabSelected = tab.en;
      $appTitle.clearActive($appTitle.tabConfig);
      tab.active = true;
      $wr_s.showLoading();
    }
  };

  $appTitle.init = function () {
    $appTitle.editDisabled = true;
    $wr_s.showLoading();
  };

  $appTitle.init();

}]);
