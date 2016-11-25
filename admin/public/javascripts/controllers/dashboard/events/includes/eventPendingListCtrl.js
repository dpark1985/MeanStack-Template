var h3Framework = angular.module('h3Framework')

.controller('eventPendingListCtrl', ['$scope', '$wr_event', '$wr_s', function ($scope, $wr_event, $wr_s) {
  var $eplc = this;

  $eplc.daumMap = function(latlng, id) {
    return new Promise(function (resolve, reject) {
      var markerPosition  = new daum.maps.LatLng(latlng.lat, latlng.lng);
      var marker = {
          position: markerPosition
      };
      var staticMapContainer  = document.getElementById(id),
          staticMapOption = {
              center: new daum.maps.LatLng(latlng.lat, latlng.lng),
              level: 3,
              marker: marker
          };
      var staticMap = new daum.maps.StaticMap(staticMapContainer, staticMapOption);
      resolve(true);
    });
  };

  $eplc.DaumPostcode = function() {
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
          $eplc.selectedItem.addr.zipcode = data.zonecode;
          $eplc.selectedItem.addr.roadAddr = fullRoadAddr;
          $eplc.selectedItem.addr.jibunAddr = data.jibunAddress;
        });
      }
    }).open();
  };

  $eplc.activateEvent = function(data) {
    $wr_event.doActivateEvent(data).then(function (res) {
      if(res.data.activateEvent) {
        $scope.$parent.events.modalContent = {
          title: "상태 변경",
          context: "정상적으로 이벤트 상태가 변경되었습니다.",
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
    }, function(err) {

    });
  };

  $eplc.rejectEvent = function(data) {
    $wr_event.doRejectEvent(data).then(function (res) {
      if(res.data.rejectEvent) {
        $scope.$parent.events.modalContent = {
          title: "상태 변경",
          context: "정상적으로 이벤트 상태가 변경되었습니다.",
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

  $eplc.detail = function(data) {
    for(var i=0; i<data.imgThumbSrc.length; i++){
      data.imgThumbSrc[i].src = data.imgThumbSrc[i].src.replace("public/", "");
    }

    for(var i=0; i<data.imgSeriesSrc.length; i++){
      data.imgSeriesSrc[i].src = data.imgSeriesSrc[i].src.replace("public/", "");
    }

    $scope.$parent.events.selectedItem = data;
    $scope.$parent.events.categories = $eplc.categories;

    $eplc.daumMap({lat: data.gps.lat, lng: data.gps.lng}, 'detailMap').then(function(data) {
      $('#detailsModal').modal('show');
    }, function(err) {
      console.log(err);
    });
  };


  $eplc.init = function () {
    $eplc.allPendingEventsList = null;

    $wr_event.getCategories().then(function (res) {
      $eplc.categories = res.data;
    });

    $wr_event.getAllPendingEventsList().then(function (res) {
      if(res.data.getAllPendingEventsList) {
        $eplc.allPendingEventsList = res.data.list;
        var tempDate = new Date();
        var today = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
        for(var i=0; i<$eplc.allPendingEventsList.length; i++){
          var tempDate2 = new Date($eplc.allPendingEventsList[i].eventDate.startD);
          var eventDate = new Date(tempDate2.getFullYear(), tempDate2.getMonth(), tempDate2.getDate());
          if(eventDate-today > 0){
            var dDay = "-" + (eventDate-today)/(1000*60*60*24);
          } else if (eventDate-today == 0) {
            var dDay = "-" + 0;
          } else if (eventDate-today < 0) {
            var dDay = "+" + (today-eventDate)/(1000*60*60*24);
          }
          $eplc.allPendingEventsList[i].dDay = dDay;
        }

        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $eplc.init();

}]);
