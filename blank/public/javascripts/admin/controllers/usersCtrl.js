
var aitch3AdminFramework = angular.module('aitch3AdminFramework')

.controller('usersCtrl', ['$http', function ($http) {
  var $users = this;
  $users.modalOn = false;

  $http.get('/adminCtrl/usersData').then(function (res) {
    $users.userData = res.data;
  }, function (err) {
    console.log(err);
  });

  $users.showUser = function(user){
    $('#userDataModal').modal({
      backdrop: false,
      show: true,
      keyboard: false
    });
    $users.modalOn = true;
    $users.user = user;
  };

  $users.closeModal = function(){
    $('#userDataModal').modal('hide');
  };

  $('#userDataModal').on('hide.bs.modal', function(e){
    $users.modalOn = false;
  });



}]);
