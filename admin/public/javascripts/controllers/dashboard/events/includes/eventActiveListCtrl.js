var h3Framework = angular.module('h3Framework')

.controller('eventActiveListCtrl', ['$scope', '$wr_event', '$wr_push', '$wr_s', function ($scope, $wr_event, $wr_push, $wr_s) {
  var $ealc = this;

  $ealc.daumMap = function(latlng, id) {
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

  $ealc.pushNotification = function(data) {
    $wr_push.doPushNotification(data).then(function (res) {
      if(res.data.pushNotification){
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

  $ealc.deActivate = function(data) {
    $wr_event.doDeActivateEvent(data).then(function (res){
      if(res.data.deActivateEvent){
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

  $ealc.expire = function(data) {
    $wr_event.doExpireEvent(data).then(function (res) {
      if(res.data.doExpireEvent) {
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

  $ealc.detail = function(data) {
    for(var i=0; i<data.imgThumbSrc.length; i++){
      data.imgThumbSrc[i].src = data.imgThumbSrc[i].src.replace("public/", "");
    }

    for(var i=0; i<data.imgSeriesSrc.length; i++){
      data.imgSeriesSrc[i].src = data.imgSeriesSrc[i].src.replace("public/", "");
    }

    $scope.$parent.events.selectedItem = data;
    $ealc.daumMap({lat: data.gps.lat, lng: data.gps.lng}, 'detailMap2').then(function(data) {
      $('#detailsModalWithoutEdit').modal('show');
    }, function(err) {
      console.log(err);
    });
  }

  $ealc.init = function () {
    $ealc.allActiveEventsList = null;
    $wr_event.getAllActiveEventsList().then(function(res) {
      if(res.data.allActiveEventsList){
        $ealc.allActiveEventsList = res.data.list;

        var tempDate = new Date();
        var today = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());

        for(var i=0; i<$ealc.allActiveEventsList.length; i++){
          var tempDate2 = new Date($ealc.allActiveEventsList[i].eventDate.endD);
          var eventDate = new Date(tempDate2.getFullYear(), tempDate2.getMonth(), tempDate2.getDate());
          if(eventDate-today > 0){
            var dDay = (eventDate-today)/(1000*60*60*24);
          } else if (eventDate-today == 0) {
            var dDay = 0;
          } else if (eventDate-today < 0) {
            var dDay = "+" + (today-eventDate)/(1000*60*60*24);
          }
          $ealc.allActiveEventsList[i].dLeft = dDay;
        }

        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $ealc.init();
}]);
