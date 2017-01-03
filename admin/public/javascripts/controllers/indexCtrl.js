var h3Framework = angular.module('h3Framework')

.controller('indexCtrl', ['$location', '$wr_event', '$wr_s', '$wr_auth', function ($location, $wr_event, $wr_s, $wr_auth) {
	var $index = this;

	$index.adminExist = false;
	$index.errMsg = null;

	$index.isAdminExist = function() {
		$wr_auth.isAdminExist().then(function (res) {
			if(res.data.userExist){
				$index.adminExist = true;
			} else {
				$index.adminExist = false;
				$wr_event.doInitCategories();
			}
		}, function (err) {
			console.log(err);
		});
	};


	$index.createAccount = function() {
		$index.errMsg = null;
		$wr_auth.doRegister($index.admin).then(function (res) {
			$index.errMsg = $index.validation(res.data);
			if($index.errMsg.length > 0){
				$('#modal-warning').modal('show');
			} else {
				$index.adminExist = true;
				$wr_s.setUser({loggedIn: true, login: $index.admin.login});
				$location.path('/dashboard/overview');
			}
		}, function (err) {
			console.log(err);
		});
	};

	$index.doLogin = function() {
		$index.errMsg = null;
		$wr_auth.doLogin($index.login).then(function (res) {
			$index.errMsg = $index.validation(res.data);
			if($index.errMsg.length > 0){
				$('#modal-warning').modal('show');
			} else {
				$wr_s.setUser({loggedIn: true, login: $index.login.login});
				$location.path('/dashboard/overview');
			}
		}, function (err) {
			console.log(err)
		})
	}

	$('#newAccount').on('hidden.bs.modal', function (e) {
		$index.newAccountError = false;
	});

	$index.validation = function (data) {
		var errMsgs = [];

		if(data.indexOf("CODE001") > 0){
			errMsgs.push("아이디 또는 비밀번호가 맞지 않습니다.");
		}

		if(data.indexOf("CODE007") > 0){
			errMsgs.push("이미 등록된 아이디 입니다.");
		}

		if(data.indexOf("CODE008") > 0){
			errMsgs.push("아이디가 정확히 입력되지 않았습니다.");
		}

		if(data.indexOf("CODE002") > 0){
			errMsgs.push("비밀번호가 정확히 입력되지 않았습니다.");
		}

		if(data.indexOf("CODE003") > 0){
			errMsgs.push("비밀번호가 8글자 이하입니다.");
		}

		if(data.indexOf("CODE004") > 0){
			errMsgs.push("비밀번호가 8글자 이하입니다.");
		}

		if(data.indexOf("CODE005") > 0){
			errMsgs.push("비밀번호가 정확히 입력되지 않았습니다.");
		}

		if(data.indexOf("CODE006") > 0){
			errMsgs.push("입력하신 비밀번호가 일치하지 않습니다.");
		}

		return errMsgs;
	};


	$index.init = function() {
		$wr_auth.isLoggedIn().then(function (res) {
			if(res.data.loggedIn){
				$location.path('/dashboard/overview');
			} else {
				$index.isAdminExist();
			}
		}, function (err) {
			console.log(err);
		});
	}

	$index.init();

}]);
