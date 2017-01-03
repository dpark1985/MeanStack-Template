var h3Framework = angular.module('h3Framework')

.controller('appTitleRegisterCtrl', ['$scope', '$wr_s', '$wr_appTitle', function ($scope, $wr_s, $wr_appTitle) {
  $atrc = this;

  $atrc.submit = function() {
    $wr_appTitle.doRegistNewTitle($atrc.titleInfo).then(function(res) {
      if(res.data.registNewTitle) {
        $scope.$parent.appTitle.modalContent = {
          title: '광고 등록',
          context: '광고가 정상적으로 등록되었습니다.',
          state: true
        }
        $('#appTitleModal').modal('show');
      } else {
        $scope.$parent.appTitle.modalContent = {
          title: '광고 등록',
          context: '광고등록을 실패하였습니다. 확인해주세요.',
          state: false
        }
        $('#appTitleModal').modal('show');
        $atrc.adRegisterInit();
      }
    });
  };

  $('#appTitleModal').on('hidden.bs.modal', function (e) {
    $wr_s.reloadPage();
  });

  $atrc.adRegisterInit = function() {
    $atrc.titleInfo = {
      title: null,
      href: null,
      titleImage: null,
    };
  };

  $atrc.init = function () {
    $atrc.adRegisterInit();

    $wr_s.hideLoading();
  };

  $atrc.init();

}]);
