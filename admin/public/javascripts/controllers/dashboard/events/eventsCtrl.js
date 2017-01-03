var h3Framework = angular.module('h3Framework')

.controller('eventsCtrl', ['$wr_s', '$wr_event', function ($wr_s, $wr_event) {
  var $events = this;

  $events.tabSelected = 'eventMgmt';

  $events.tabConfig = [
    {name: "행사 관리", en: "eventMgmt", active: true, templateUrl: "templates/views/dashboard/events/includes/eventMgmt.html", ctrl: "eventMgmtCtrl as emc"},
    {name: "활성화 이벤트", en: "eventActive", active: false, templateUrl: "templates/views/dashboard/events/includes/eventActive.html", ctrl: "eventActiveListCtrl as ealc"},
    {name: "승인 대기", en: "eventPending", active: false, templateUrl: "templates/views/dashboard/events/includes/eventPending.html", ctrl: "eventPendingListCtrl as eplc"},
    {name: "승인 거절", en: "eventReject", active: false, templateUrl: "templates/views/dashboard/events/includes/eventReject.html", ctrl: "eventRejectListCtrl as erlc"},
    {name: "행사 만료", en: "eventExpire", active: false, templateUrl: "templates/views/dashboard/events/includes/eventExpire.html", ctrl: "eventExpireListCtrl as eelc"},
    {name: "전체 목록", en: "eventList", active: false, templateUrl: "templates/views/dashboard/events/includes/eventList.html", ctrl: "eventListCtrl as elc"},
    {name: "행사 등록", en: "eventRegister", active: false, templateUrl: "templates/views/dashboard/events/includes/eventRegister.html", ctrl: "eventRegisterCtrl as erc"},
  ];

  $events.enableEdit = function() {
    $events.editDisabled = false;
  };

  $events.disableEdit = function() {
    $events.editDisabled = true;
  };

  $events.editData = function() {
    var startD = new Date($('#startDate').data('DateTimePicker').date()._d);
    $events.selectedItem.eventDate.startD = startD;

    var endD = new Date($('#endDate').data('DateTimePicker').date()._d);
    $events.selectedItem.eventDate.endD = endD;

    $events.selectedItem.eventDate.text =
      (startD.getMonth()+1) + "월 " +
      startD.getDate() + "일 ~ " +
      (endD.getMonth()+1) + "월 " +
      endD.getDate() + "일";

    console.log($events.selectedItem);
  }

  $('#detailsModal').on('hidden.bs.modal', function (e) {
    $events.disableEdit();
  });

  $events.addMainCategory = function() {
    if($events.newMainCategory){
      $wr_event.doAddMainCategory({
        newMainCategory: $erc.newMainCategory
      }).then(function (res) {
        if(res.data.newMainCategory){
          $wr_event.getCategories().then(function (res) {
            $events.categories = res.data;
            $events.newMainCategory = null;
          });
        }
      });
    }
  };

  $events.addSubCategory = function() {
    if($events.newSubCategory){
      $wr_event.doAddSubCategory({
        category: $events.categoryPlusMain.sub,
        item: $events.newSubCategory
      }).then(function (res) {
        if(res.data.newSubCategory){
          $wr_event.getCategories().then(function (res) {
            $events.categories = res.data;
            $events.newSubCategory = null
          });
        }
      });
    }
  };

  $events.removeMainCategory = function() {
    $wr_event.doRemoveMainCategory($erc.categoryPlusMain).then(function (res) {
      if(res.data.removeMainCategory) {
        $wr_event.getCategories().then(function (res) {
          $events.categories = res.data;
          $('#removeMainCategoryModal').modal('hide');
          $('.modal-backdrop.fade.in').css("display", "none");
        });
      }
    });
  };

  $events.removeSubCategory = function() {
    var checkFlag = false;
    if($events.newSubCategory) {
      for(var i=0; i<$events.categories.length; i++){
        if($events.categories[i].category == $events.categoryPlusMain.sub){
          for(var j=0; j<$events.categories[i].list.length; j++){
            if($events.categories[i].list[j].title == $events.newSubCategory){
              checkFlag = true;
              $wr_event.doRemoveSubCategory({
                mainCategory: $events.categoryPlusMain,
                subCategoryTitle: $events.newSubCategory
              }).then(function (res) {
                if(res.data.removeSubCategory) {
                  $wr_event.getCategories().then(function (res) {
                    $events.categories = res.data;
                    $events.newSubCategory = null
                    $('#removeSubCategoryModal').modal('hide');
                    $('.modal-backdrop.fade.in').css("display", "none");
                  });
                }
              });
            }
          }
        }
      }
      if(!checkFlag) {
        $events.newSubCategory = null
        $('#removeSubCategoryModal').modal('hide');
        $('.modal-backdrop.fade.in').css("display", "none");
      }
    }
  };

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
