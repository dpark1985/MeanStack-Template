var h3Framework = angular.module('h3Framework')

.controller('wrEventsExpireListCtrl', ['$scope', '$wr_wrEvent', '$wr_s', function ($scope, $wr_wrEvent, $wr_s) {
  var $wreelc = this;

  $wreelc.daumMap = function(latlng, id) {
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

  $wreelc.delete = function(data) {
    $wr_wrEvent.doDelete(data).then(function (res) {
      if(res.data.doDelete) {
        $scope.$parent.wrEvents.modalContent = {
          title: "이벤트 등록",
          context: "정상적으로 이벤트가 등록되었습니다.",
          state: true
        };
        $('#wrEventStateModal').modal('show');
      } else {
        $scope.$parent.wrEvents.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#wrEventStateModal').modal('show');
      }
    });
  };

  $wreelc.unExpire = function(data) {
    $wr_wrEvent.doUnExpire(data).then(function (res) {
      if(res.data.doUnExpire) {
        $scope.$parent.wrEvents.modalContent = {
          title: "이벤트 등록",
          context: "정상적으로 이벤트가 등록되었습니다.",
          state: true
        };
        $('#wrEventStateModal').modal('show');
      } else {
        $scope.$parent.wrEvents.modalContent = {
          title: "상태 변경",
          context: "문제가 발생하였습니다. 확인해주세요.",
          state: false
        };
        $('#wrEventStateModal').modal('show');
      }
    });
  };

  $('#wrEventStateModal').on('hidden.bs.modal', function (e) {
    $wr_s.reloadPage();
  });

  $wreelc.detail = function(data) {
    for(var i=0; i<data.imgThumbSrc.length; i++){
      data.imgThumbSrc[i].src = data.imgThumbSrc[i].src.replace("public/", "");
    }

    $scope.$parent.wrEvents.selectedItem = data;
    $('#detailsModal').modal('show');
  }


  $wreelc.init = function () {
    $wreelc.allExpiredEventsList = null;
    $wr_wrEvent.getAllExpiredEventsList().then(function(res) {
      if(res.data.getAllExpiredEventsList) {
        $wreelc.allExpiredEventsList = res.data.list;

        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    })
  };

  $wreelc.init();
}]);
