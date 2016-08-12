
var aitch3AdminFramework = angular.module('aitch3AdminFramework')

.controller('adminCtrl', ['$window', '$adminFactory', '$SPAaccount', function ($window, $adminFactory, $SPAaccount) {
	var $admin = this;
	$admin.modalOn = false;

	$admin.userStatus = $adminFactory.getUserData();

	$admin.doLogin = function(){
		var data = {
			login: $admin.userInput.userID,
			password: $admin.userInput.password
		};
		$SPAaccount.login(data).then(function (res){
			$admin.errMsgs = $SPAaccount.validation(res.data);
			if($admin.errMsgs.length > 0){
				$admin.showModal();
			} else {
				$window.location = '/admin';
			}
		}, function (err){
			console.log(err);
		});
	};

	$admin.showModal = function(){
		$('#modal-warning').modal({
			backdrop: false,
			show: true,
			keyboard: false
		});
		$admin.modalOn = true;
	};

	$admin.closeModal = function(){
		$('#modal-warning').modal('hide');
	};

	$('#modal-warning').on('hide.bs.modal', function(e){
		$admin.modalOn = false;
	})

}]);
