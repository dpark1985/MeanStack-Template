var h3Framework = angular.module('h3Framework')

.controller('eventRegisterCtrl', ['$scope', '$location', '$wr_event', '$wr_s', function ($scope, $location, $wr_event, $wr_s) {
  var $erc = this;

  $erc.openCategoryModal = function() {

    $scope.$parent.events.categories = $erc.categories;
    $('#categoryPlusModal').modal('show');
  }

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
          $erc.eventInfo.addr.roadAddr = fullRoadAddr.split(" ");
          $erc.eventInfo.addr.jibunAddr = data.jibunAddress.split(" ");

          $erc.eventInfo.addr.roadAddr.shift();
          $erc.eventInfo.addr.jibunAddr.shift();

          $erc.eventInfo.addr.roadAddr = $erc.eventInfo.addr.roadAddr.join(" ");
          $erc.eventInfo.addr.jibunAddr = $erc.eventInfo.addr.jibunAddr.join(" ");
        });
      }
    }).open();
  };

  $erc.getAdminGeoLocation = function() {

    $erc.daumMap({lat:37.337327184723506, lng:127.94423270747922}, 'map');

/*
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition($erc.setAdminPosition);
    } else {
      $erc.daumMap({lat: 37.337327184723506, lng: 127.94423270747922}, 'map');
    }
*/
  };

  $erc.setAdminPosition = function(position) {
	console.log(posotion.coords);
    $erc.daumMap({lat: position.coords.latitude, lng: position.coords.longitude}, 'map');
  };

  $erc.submit = function() {

    if($erc.eventInfo.hosts) $erc.eventInfo.hosts = $erc.eventInfo.hosts.split(",");
    if($erc.eventInfo.supervisions) $erc.eventInfo.supervisions = $erc.eventInfo.supervisions.split(",");
    if($erc.eventInfo.sponsors) $erc.eventInfo.sponsors = $erc.eventInfo.sponsors.split(",");
    if($erc.eventInfo.phones) $erc.eventInfo.phones = $erc.eventInfo.phones.trim().split(",");
    if($erc.eventInfo.emails) $erc.eventInfo.emails = $erc.eventInfo.emails.trim().split(",");
    if($erc.eventInfo.href) $erc.eventInfo.href = $erc.eventInfo.href.trim().split(",");

    var startD = new Date($('#startDate').data('DateTimePicker').date()._d);
    $erc.eventInfo.eventDate.startD = startD;

    var endD = new Date($('#endDate').data('DateTimePicker').date()._d);
    $erc.eventInfo.eventDate.endD = endD

    $erc.eventInfo.eventDate.text =
      (startD.getMonth()+1) + "월 " +
      startD.getDate() + "일 ~ " +
      (endD.getMonth()+1) + "월 " +
      endD.getDate() + "일";

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

  $erc.ckReady = function () {
    console.log('ckEditor Ready');
  };

  $erc.eventRegisterInit = function() {
    $erc.options = {
       language: 'ko',
       allowedContent: true,
       entities: false
     };

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
          startD: null,
          endD: null,
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
        href: null,
        desc: null,
        imgThumbSrc: null,
        imgSeriesSrc: null,
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
