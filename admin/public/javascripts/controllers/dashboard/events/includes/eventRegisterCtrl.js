var h3Framework = angular.module('h3Framework')

.controller('eventRegisterCtrl', ['$scope', '$location', '$wr_event', '$wr_s', function ($scope, $location, $wr_event, $wr_s) {
  var $erc = this;

  $erc.daumMap = function(latlng, id) {
    var mapContainer = document.getElementById(id);

    var mapOption = {
      center: new daum.maps.LatLng(latlng.lat, latlng.lng),
      level: 3
    };
    var map = new daum.maps.Map(mapContainer, mapOption);
    var marker = new daum.maps.Marker({
      position: map.getCenter()
    });
    marker.setMap(map);
    daum.maps.event.addListener(map, 'click', function(mouseEvent) {
      var latlng = mouseEvent.latLng;
      marker.setPosition(latlng);

      $scope.$apply(function() {
        $erc.eventInfo.gps.lat = latlng.getLat();
        $erc.eventInfo.gps.lng = latlng.getLng();
      });
    });
    $wr_s.hideLoading();
  };

  $erc.DaumPostcode = function() {
    new daum.Postcode({
      oncomplete: function(data) {
        var fullRoadAddr = data.roadAddress;
        var extraRoadAddr = '';

        if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
            extraRoadAddr += data.bname;
        }
        if(data.buildingName !== '' && data.apartment === 'Y'){
           extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        if(extraRoadAddr !== ''){
            extraRoadAddr = ' (' + extraRoadAddr + ')';
        }
        if(fullRoadAddr !== ''){
            fullRoadAddr += extraRoadAddr;
        }
        $scope.$apply(function() {
          $erc.eventInfo.addr.zipcode = data.zonecode;
          $erc.eventInfo.addr.roadAddr = fullRoadAddr;
          $erc.eventInfo.addr.jibunAddr = data.jibunAddress;
        });
      }
    }).open();
  };

  $erc.getAdminGeoLocation = function() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition($erc.setAdminPosition);
    }
  };

  $erc.setAdminPosition = function(position) {
    $erc.daumMap({lat: position.coords.latitude, lng: position.coords.longitude}, 'map');
  };

  $erc.addMainCategory = function() {
    if($erc.newMainCategory){
      $wr_event.doAddMainCategory({
        newMainCategory: $erc.newMainCategory
      }).then(function (res) {
        if(res.data.newMainCategory){
          $wr_event.getCategories().then(function (res) {
            $erc.categories = res.data;
            $erc.newMainCategory = null;
          });
        }
      });
    }
  };

  $erc.addSubCategory = function() {
    if($erc.newSubCategory){
      $wr_event.doAddSubCategory({
        category: $erc.categoryPlusMain.sub,
        item: $erc.newSubCategory
      }).then(function (res) {
        if(res.data.newSubCategory){
          $wr_event.getCategories().then(function (res) {
            $erc.categories = res.data;
            $erc.newSubCategory = null
          });
        }
      });
    }
  };

  $erc.removeMainCategory = function() {
    $wr_event.doRemoveMainCategory($erc.categoryPlusMain).then(function (res) {
      if(res.data.removeMainCategory) {
        $wr_event.getCategories().then(function (res) {
          $erc.categories = res.data;
          $('#removeMainCategoryModal').modal('hide');
          $('.modal-backdrop.fade.in').css("display", "none");
        });
      }
    });
  };

  $erc.removeSubCategory = function() {
    var checkFlag = false;
    if($erc.newSubCategory) {
      for(var i=0; i<$erc.categories.length; i++){
        if($erc.categories[i].category == $erc.categoryPlusMain.sub){
          for(var j=0; j<$erc.categories[i].list.length; j++){
            if($erc.categories[i].list[j].title == $erc.newSubCategory){
              checkFlag = true;
              $wr_event.doRemoveSubCategory({
                mainCategory: $erc.categoryPlusMain,
                subCategoryTitle: $erc.newSubCategory
              }).then(function (res) {
                if(res.data.removeSubCategory) {
                  $wr_event.getCategories().then(function (res) {
                    $erc.categories = res.data;
                    $erc.newSubCategory = null
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
        $erc.newSubCategory = null
        $('#removeSubCategoryModal').modal('hide');
        $('.modal-backdrop.fade.in').css("display", "none");
      }
    }
  };

  $erc.submit = function() {

    if($erc.eventInfo.hosts) $erc.eventInfo.hosts = $erc.eventInfo.hosts.trim().split(",");
    if($erc.eventInfo.supervisions) $erc.eventInfo.supervisions = $erc.eventInfo.supervisions.trim().split(",");
    if($erc.eventInfo.sponsors) $erc.eventInfo.sponsors = $erc.eventInfo.sponsors.trim().split(",");
    if($erc.eventInfo.phones) $erc.eventInfo.phones = $erc.eventInfo.phones.trim().split(",");
    if($erc.eventInfo.emails) $erc.eventInfo.emails = $erc.eventInfo.emails.trim().split(",");

    var startD = new Date($('#startDate').data('DateTimePicker').date()._d);
    $erc.eventInfo.eventDate.startD.year = startD.getFullYear();
    $erc.eventInfo.eventDate.startD.month = startD.getMonth()+1;
    $erc.eventInfo.eventDate.startD.date = startD.getDate();
    $erc.eventInfo.eventDate.startD.day = startD.getDay();

    var endD = new Date($('#endDate').data('DateTimePicker').date()._d);
    $erc.eventInfo.eventDate.endD.year = endD.getFullYear();
    $erc.eventInfo.eventDate.endD.month = endD.getMonth()+1;
    $erc.eventInfo.eventDate.endD.date = endD.getDate();
    $erc.eventInfo.eventDate.endD.day = endD.getDay();

    $erc.eventInfo.eventDate.text =
      $erc.eventInfo.eventDate.startD.year + "년 " +
      $erc.eventInfo.eventDate.startD.month + "월 " +
      $erc.eventInfo.eventDate.startD.date + "일 ~ " +
      $erc.eventInfo.eventDate.endD.year + "년 " +
      $erc.eventInfo.eventDate.endD.month + "월 " +
      $erc.eventInfo.eventDate.endD.date + "일";



    $wr_event.doRegistNewEvent($erc.eventInfo).then(function (res) {
      if(res.data.registNewEvent){
        $scope.$parent.events.modalContent = {
          title: "이벤트 등록",
          context: "정상적으로 이벤트가 등록되었습니다.",
          state: true
        };
        $('#eventStateModal').modal('show');
      } else {
        $scope.$parent.events.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#eventStateModal').modal('show');
      }
    });
  };

  $('#eventStateModal').on('hidden.bs.modal', function (e) {
    $wr_s.reloadPage();
  });

  $erc.eventRegisterInit = function() {
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

    $wr_event.getCategories().then(function (res) {
      $erc.categories = res.data;
      $erc.eventInfo = {
        title: null,
        eventDate: {
          startD: {
            year: null,
            month: null,
            date: null,
            day: null
          },
          endD: {
            year: null,
            month: null,
            date: null,
            day: null
          },
          text: null
        },
        addr: {
          jibunAddr: null,
          roadAddr: null,
          zipcode: null
        },
        gps: {
          lat: null,
          lng: null,
        },
        hosts: null,
        supervisions: null,
        sponsors: null,
        phones: null,
        emails: null,
        desc: null,
        imgThumbSrc: null,
        imgSeriesSrc: null,
        isActive: false,
        isApproved: false,
        isRejected: false,
        isExpired: false,
        category: $erc.categories[0].list[0],
        subCategory: null
      };
      $erc.categoryPlusMain = $erc.categories[0].list[0];
      $erc.getAdminGeoLocation();
    });
  };

  $erc.init = function () {
    $erc.eventRegisterInit();
  };

  $erc.init();

}]);
