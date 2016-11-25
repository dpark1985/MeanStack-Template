var h3Framework = angular.module('h3Framework')

.controller('eventListCtrl', ['$scope', '$wr_event', '$wr_s', function ($scope, $wr_event, $wr_s) {
  var $elc = this;

  $elc.daumMap = function(latlng, id) {
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

  $elc.detail = function(data) {
    for(var i=0; i<data.imgThumbSrc.length; i++){
      data.imgThumbSrc[i].src = data.imgThumbSrc[i].src.replace("public/", "");
    }

    for(var i=0; i<data.imgSeriesSrc.length; i++){
      data.imgSeriesSrc[i].src = data.imgSeriesSrc[i].src.replace("public/", "");
    }

    $scope.$parent.events.selectedItem = data;
    $elc.daumMap({lat: data.gps.lat, lng: data.gps.lng}, 'detailMap2').then(function(data) {
      $('#detailsModalWithoutEdit').modal('show');
    }, function(err) {
      console.log(err);
    });
  };

  $elc.init = function () {
    $elc.allEventList = null;
    $wr_event.getAllEventsList().then(function (res) {
      if(res.data.getAllEventsList) {
        $elc.allEventList = res.data.list;
        $wr_s.hideLoading();
      } else {
        $wr_s.showServerError();
      }
    });
  };

  $elc.init();



}]);
