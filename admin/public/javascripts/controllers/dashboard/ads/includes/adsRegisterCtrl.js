var h3Framework = angular.module('h3Framework')

.controller('adsRegisterCtrl', ['$scope', '$wr_s', '$wr_ads', function ($scope, $wr_s, $wr_ads) {
  $arc = this;

  $arc.submit = function() {
    if($arc.registAdonAll) {
      $arc.adInfo.location = {"location" : "AllView", "value": 3};
    }
    var startD = new Date($('#startDate').data('DateTimePicker').date()._d);
    var endD = new Date($('#endDate').data('DateTimePicker').date()._d);

    $arc.adInfo.adDate.startD = startD;
    $arc.adInfo.adDate.endD = endD;

    $wr_ads.doRegistNewAd($arc.adInfo).then(function(res) {
      if(res.data.doRegistNewAd) {
        $scope.$parent.ads.modalContent = {
          title: '광고 등록',
          context: '광고가 정상적으로 등록되었습니다.',
          state: true
        }
        $('#adStateModal').modal('show');
      } else {
        $scope.$parent.ads.modalContent = {
          title: '광고 등록',
          context: '광고등록을 실패하였습니다. 확인해주세요.',
          state: false
        }
        $('#adStateModal').modal('show');
        $arc.adRegisterInit();
      }
    });
  };

  $('#adStateModal').on('hidden.bs.modal', function (e) {
    $wr_s.reloadPage();
  });

  $arc.adRegisterInit = function() {
    $arc.registAdonAll = false;

    $('#startDate').datetimepicker({
      sideBySide: true
    });
    $('#endDate').datetimepicker({
      useCurrent: false,
      sideBySide: true
    });
    $('#startDate').on('dp.change', function (e) {
      $('#endDate').data("DateTimePicker").minDate(e.date);
    });
    $('#endDate').on('dp.change', function (e) {
      $('#startDate').data("DateTimePicker").maxDate(e.date);
    });

    $arc.adLocation = [
      {"location" : "MainView", "value": 1},
      {"location" : "ListView", "value": 2},
    ];

    $arc.adInfo = {
      title: null,
      author: null,
      phones: null,
      href: null,
      location: $arc.adLocation[0],
      adImage: null,
      adDate: {
        startD: null,
        endD: null
      },
      isActive: false,
      isApproved: false,
      isExpired: false,
      isRejected: false,
    };
  };

  $arc.init = function () {
    $arc.adRegisterInit();

    $wr_s.hideLoading();
  };

  $arc.init();

}]);
