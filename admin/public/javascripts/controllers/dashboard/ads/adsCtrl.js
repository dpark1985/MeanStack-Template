var h3Framework = angular.module('h3Framework')

.controller('adsCtrl', ['$wr_s', function ($wr_s) {
  $ads = this;

  $ads.tabSelected = 'adsMgmt';

  $ads.tabConfig = [
    {name: "광고 관리", en: "adsMgmt", active: true, templateUrl: "templates/views/dashboard/ads/includes/adsMgmt.html", ctrl: "adsMgmtCtrl as amc"},
    {name: "활성화 광고", en: "adsActive", active: false, templateUrl: "templates/views/dashboard/ads/includes/adsActive.html", ctrl: "adsActiveListCtrl as aalc"},
    {name: "승인 대기", en: "adsPending", active: false, templateUrl: "templates/views/dashboard/ads/includes/adsPending.html", ctrl: "adsPendingListCtrl as aplc"},
    {name: "승인 거절", en: "adsReject", active: false, templateUrl: "templates/views/dashboard/ads/includes/adsReject.html", ctrl: "adsRejectListCtrl as arlc"},
    {name: "종료 광고", en: "adsExpire", active: false, templateUrl: "templates/views/dashboard/ads/includes/adsExpire.html", ctrl: "adsExpireListCtrl as aelc"},
    {name: "전체 목록", en: "adsList", active: false, templateUrl: "templates/views/dashboard/ads/includes/adsList.html", ctrl: "adsListCtrl as alc"},
    {name: "광고 등록", en: "adsRegister", active: false, templateUrl: "templates/views/dashboard/ads/includes/adsRegister.html", ctrl: "adsRegisterCtrl as arc"},
  ];

  $ads.enableEdit = function() {
    $ads.editDisabled = false;
  };

  $ads.disableEdit = function() {
    $ads.editDisabled = true;
  };

  $ads.editData = function() {

    var startD = $('#adStartDate').data('DateTimePicker').date()._d;
    var endD = $('#adEndDate').data('DateTimePicker').date()._d;
    $ads.selectedItem.adDate.startD = startD;
    $ads.selectedItem.adDate.endD = endD;

    if($ads.registAdonAll) {
      $ads.selectedItem.location = {"location" : "AllView", "value": 3};
    }

    console.log($ads.selectedItem);
  }

  $ads.clearActive = function(tabConfig){
    for(var i=0; i<tabConfig.length; i++){
      tabConfig[i].active = false;
    }
  };

  $ads.tabClick = function (tab) {
    if($ads.tabSelected != tab.en){
      $ads.tabSelected = tab.en;
      $ads.clearActive($ads.tabConfig);
      tab.active = true;
      $wr_s.showLoading();
    }
  };

  $ads.init = function () {
    $ads.editDisabled = true;

    $('#adStartDate').datetimepicker();
    $('#adEndDate').datetimepicker({
      useCurrent: false
    });
    $('#adStartDate').on('dp.change', function (e) {
      $('#adEndDate').data("DateTimePicker").minDate(e.date);
    });
    $('#adEndDate').on('dp.change', function (e) {
      $('#adStartDate').data("DateTimePicker").maxDate(e.date);
    });

    $ads.adLocation = [
      {"location" : "MainView", "value": 1},
      {"location" : "ListView", "value": 2},
    ];

    $wr_s.showLoading();
  };

  $ads.init();

}]);
