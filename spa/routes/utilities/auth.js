
exports.active = function(everyauth, db, crypto){
	// everyauth module initial setting
	var auth = everyauth.password.loginWith('login');
	everyauth.everymodule.userPkey('_id');
	everyauth.everymodule.findUserById(function(id, callback){
		db.users.findOne({
			_id: db.ObjectId(id)
		}, function(error, user){
			callback(error, user);
		});
	});

	// Log out
	everyauth.everymodule.logoutPath('/logout');
	everyauth.everymodule.logoutRedirectPath('/');

	// Rregistration Configuration
	auth.registerView('log');
	auth.getRegisterPath('/models/register');
	auth.postRegisterPath('/models/register');
	auth.extractExtraRegistrationParams(function (req) {
		//console.log(req.body);
		return {
			login: req.body.login,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm
		}
	});
	auth.validateRegistration(function (userAttribute, errors){ 
		var promise = this.Promise();

		if(userAttribute.login == null || userAttribute.login == undefined || userAttribute.login == ""){
			errors.push('아이디가 정확히 입력되지 않았습니다.');
		}

		if(userAttribute.password == null || userAttribute.password == undefined || userAttribute.password == ""){
			errors.push('비밀번호가 정확히 입력되지 않았습니다.');
		}

		if(userAttribute.password.length < 8){
			errors.push('비밀번호가 8글자 이하입니다.');
		}

		if(userAttribute.password.length > 32){
			errors.push('비밀번호가 32글자 이상입니다.');
		}

		if(userAttribute.passwordConfirm == null || userAttribute.passwordConfirm == undefined || userAttribute.passwordConfirm == ""){
			errors.push('비밀번호가 정확히 입력되지 않았습니다.');
		}

		if(userAttribute.password != userAttribute.passwordConfirm){
			errors.push('입력하신 비밀번호가 일치하지 않습니다.');
		}

		db.users.findOne({ login: userAttribute.login }, function (error, user){
			if(user){
				errors.push('이미 등록된 아이디 입니다.');	
			} 
			if(errors.length){
				/************************************************************************
				*   promise.fulfill(errors);           		                        	*
				*-----------------------------------------------------------------------*
				*   This function is called when user input is incorrect.				*
				*   The parameter [errors] is an array of error messages				*
				************************************************************************/				
				promise.fulfill(errors);
			} else {

				var cryptoPassword = 'MEANSTACK';
				var cipher = crypto.createCipher('aes192', cryptoPassword);
				cipher.update(userAttribute.password, 'utf8', 'base64');
				var cipheredOut = cipher.final('base64');

				
				userAttribute.password = cipheredOut;


				/************************************************************************
				*   promise.fulfill(userAttribute);                                   	*
				*-----------------------------------------------------------------------*
				*   This function is called when user input is correct and done		  	*
				*   validation. This is called only once.								*
				************************************************************************/
				promise.fulfill(userAttribute);
			}
		});

		return promise;
	});
	auth.registerUser(function (userAttribute){ 
		var promise = this.Promise();

		db.users.insert({
			login: userAttribute.login,
			password: userAttribute.password
		}, function (error, result){
			if(error) return promise.fulfill([error]);
			promise.fulfill(result);
		});
		return promise;
	});
	auth.registerSuccessRedirect('/logsuccess');




	// Login Configuration
	auth.loginView('log');
	auth.getLoginPath('/models/login');
	auth.postLoginPath('/models/login');
	auth.authenticate(function (login, password){ 
		var promise = this.Promise();
		var errors = [];


		var cryptoPassword = 'MEANSTACK';
		var cipher = crypto.createCipher('aes192', cryptoPassword);
		cipher.update(password, 'utf8', 'base64');
		var cipheredOut = cipher.final('base64');


		db.users.findOne({ login: login, password: cipheredOut }, function (error, user){
				if(user == null){
					errors.push('아이디 또는 비밀번호가 맞지 않습니다.');
					return promise.fulfill(errors);
				}
				promise.fulfill(user);
		});
		
		return promise;
	});
	auth.loginSuccessRedirect('/logsuccess');
};