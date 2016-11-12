var h3Framework = angular.module('h3Framework')

.controller('eventsCtrl', ['$wr_s', function ($wr_s) {
  var $events = this;

  $events.tabSelected = 'eventMgmt';

  $events.tabConfig = [
    {name: "이벤트 관리", en: "eventMgmt", active: true, templateUrl: "templates/views/dashboard/events/includes/eventMgmt.html", ctrl: "eventMgmtCtrl as emc"},
    {name: "활성화 이벤트", en: "eventActive", active: false, templateUrl: "templates/views/dashboard/events/includes/eventActive.html", ctrl: "eventActiveListCtrl as ealc"},
    {name: "승인 대기", en: "eventPending", active: false, templateUrl: "templates/views/dashboard/events/includes/eventPending.html", ctrl: "eventPendingListCtrl as eplc"},
    {name: "승인 거절", en: "eventReject", active: false, templateUrl: "templates/views/dashboard/events/includes/eventReject.html", ctrl: "eventRejectListCtrl as erlc"},
    {name: "이벤트 만료", en: "eventExpire", active: false, templateUrl: "templates/views/dashboard/events/includes/eventExpire.html", ctrl: "eventExpireListCtrl as eelc"},
    {name: "전체 목록", en: "eventList", active: false, templateUrl: "templates/views/dashboard/events/includes/eventList.html", ctrl: "eventListCtrl as elc"},
    {name: "이벤트 등록", en: "eventRegister", active: false, templateUrl: "templates/views/dashboard/events/includes/eventRegister.html", ctrl: "eventRegisterCtrl as erc"},
  ];

  $events.enableEdit = function() {
    $events.editDisabled = false;
  };

  $events.disableEdit = function() {
    $events.editDisabled = true;
  };

  $events.editData = function() {
    var startD = new Date($('#startDate').data('DateTimePicker').date()._d);
    $events.selectedItem.eventDate.startD.year = startD.getFullYear();
    $events.selectedItem.eventDate.startD.month = startD.getMonth()+1;
    $events.selectedItem.eventDate.startD.date = startD.getDate();
    $events.selectedItem.eventDate.startD.day = startD.getDay();

    var endD = new Date($('#endDate').data('DateTimePicker').date()._d);
    $events.selectedItem.eventDate.endD.year = endD.getFullYear();
    $events.selectedItem.eventDate.endD.month = endD.getMonth()+1;
    $events.selectedItem.eventDate.endD.date = endD.getDate();
    $events.selectedItem.eventDate.endD.day = endD.getDay();

    console.log($events.selectedItem);
  }

  $('#detailsModal').on('hidden.bs.modal', function (e) {
    $events.disableEdit();
  });

  $events.clearActive = function(tabConfig){
    for(var i=0; i<tabConfig.length; i++){
      tabConfig[i].active = false;
    }
  };

  $events.tabClick = function (tab) {
    if($events.tabSelected != tab.en){
      $events.tabSelected = tab.en;
      $events.clearActive($events.tabConfig);
      tab.active = true;
      $wr_s.showLoading();
    }
  };

  $events.init = function () {
    $events.editDisabled = true;

    $('#startDate').datetimepicker();
    $('#endDate').datetimepicker({
      useCurrent: false
    });
    $('#startDate').on('dp.change', function (e) {
      $('#endDate').data("DateTimePicker").minDate(e.date);
    });
    $('#endDate').on('dp.change', function (e) {
      $('#startDate').data("DateTimePicker").maxDate(e.date);
    });

    $wr_s.showLoading();
  };

  $events.init();

}]);
