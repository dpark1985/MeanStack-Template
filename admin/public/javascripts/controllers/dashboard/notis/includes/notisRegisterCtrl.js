var h3Framework = angular.module('h3Framework')

.controller('notisRegisterCtrl', ['$scope', '$wr_s', '$wr_notis', function ($scope, $wr_s, $wr_notis) {
  $nrc = this;


  $nrc.submit = function() {


    console.log($nrc.noteInfo);

    $wr_notis.doRegistNewNoti($nrc.noteInfo).then(function(res) {
      if(res.data.registNewNoti) {
        $scope.$parent.notis.modalContent = {
          title: '공지사항 등록',
          context: '공지사항이 정상적으로 등록되었습니다.',
          state: true
        }
        $('#notiStateModal').modal('show');
      } else {
        $scope.$parent.notis.modalContent = {
          title: '공지사항 등록',
          context: '공지사항 등록을 실패하였습니다. 확인해주세요.',
          state: false
        }
        $('#notiStateModal').modal('show');
        $nrc.notisRegisterInit();
      }
    });

  }

  $('#notiStateModal').on('hidden.bs.modal', function (e) {
    $wr_s.reloadPage();
  });

  $nrc.notisRegisterInit = function() {
    $nrc.noteInfo = {
      title: null,
      href: null,

      isActive: false,
      isApproved: false,
      isRejected: false,

    };
  };

  $nrc.init = function () {
    $nrc.notisRegisterInit();

    $wr_s.hideLoading();
  };

  $nrc.init();

}]);
