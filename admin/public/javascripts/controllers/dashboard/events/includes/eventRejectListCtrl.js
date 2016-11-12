var h3Framework = angular.module('h3Framework')

.controller('eventRejectListCtrl', ['$scope', '$location', '$wr_event', '$wr_s', function ($scope, $location, $wr_event, $wr_s) {
  var $erlc = this;

  $erlc.daumMap = function(latlng, id) {
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

  $erlc.unReject = function(data) {
    $wr_event.doUnReject(data).then(function (res) {
      if(res.data.doUnReject) {
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

  $erlc.delete = function(data) {
    $wr_event.doDelete(data).then(function (res) {
      if(res.data.doDelete) {
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

  $erlc.detail = function(data) {
    for(var i=0; i<data.imgThumbSrc.length; i++){
      data.imgThumbSrc[i].src = data.imgThumbSrc[i].src.replace("public/", "");
    }

    for(var i=0; i<data.imgSeriesSrc.length; i++){
      data.imgSeriesSrc[i].src = data.imgSeriesSrc[i].src.replace("public/", "");
    }

    $scope.$parent.events.selectedItem = data;
    $erlc.daumMap({lat: data.gps.lat, lng: data.gps.lng}, 'detailMap2').then(function(data) {
      $('#detailsModalWithoutEdit').modal('show');
    }, function(err) {
      console.log(err);
    });
  }


  $erlc.init = function () {
    $erlc.allRejectedEventsList = null;
    $wr_event.getAllRejectedEventsList().then(function(res) {
      if(res.data.getAllRejectedEventsList) {
        $erlc.allRejectedEventsList = res.data.list;

        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    })
  };

  $erlc.init();
}]);
