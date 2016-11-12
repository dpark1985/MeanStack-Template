
exports.active = function(everyauth, db, crypto){
	// everyauth module initial setting
	var auth = everyauth.password.loginWith('login');
	everyauth.everymodule.userPkey('_id');
	everyauth.everymodule.findUserById(function(id, callback){
		db.admin.findOne({
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
	auth.getRegisterPath('/auth/newAdmin');
	auth.postRegisterPath('/auth/newAdmin');
	auth.extractExtraRegistrationParams(function (req) {
		return {
			login: req.body.login,
			password: req.body.password,
			passwordConfirm: req.body.passwordc
		}
	});
	auth.validateRegistration(function (userAttribute, errors){
		var promise = this.Promise();

		if(userAttribute.login == null || userAttribute.login == undefined || userAttribute.login == ""){
			errors.push('CODE008');
		}

		if(userAttribute.password == null || userAttribute.password == undefined || userAttribute.password == ""){
			errors.push('CODE002');
		}

		if(userAttribute.password.length < 8){
			errors.push('CODE003');
		}

		if(userAttribute.password.length > 32){
			errors.push('CODE004');
		}

		if(userAttribute.passwordConfirm == null || userAttribute.passwordConfirm == undefined || userAttribute.passwordConfirm == ""){
			errors.push('CODE005');
		}

		if(userAttribute.password != userAttribute.passwordConfirm){
			errors.push('CODE006');
		}

		db.admin.findOne({ login: userAttribute.login }, function (error, user){
			if(user){
				errors.push('CODE007');
			}
			if(errors.length){
				/************************************************************************
				*   promise.fulfill(errors);           		                        			*
				*-----------------------------------------------------------------------*
				*   This function is called when user input is incorrect.								*
				*   The parameter [errors] is an array of error messages								*
				************************************************************************/
				promise.fulfill(errors);
			} else {

				var cryptoPassword = 'wonjuRomance';
				var cipher = crypto.createCipher('aes192', cryptoPassword);
				cipher.update(userAttribute.password, 'utf8', 'base64');
				var cipheredOut = cipher.final('base64');


				userAttribute.password = cipheredOut;


				/************************************************************************
				*   promise.fulfill(userAttribute);                                   	*
				*-----------------------------------------------------------------------*
				*   This function is called when user input is correct and done		  		*
				*   validation. This is called only once.																*
				************************************************************************/
				promise.fulfill(userAttribute);
			}
		});

		return promise;
	});
	auth.registerUser(function (userAttribute){
		var promise = this.Promise();

		db.admin.insert({
			login: userAttribute.login,
			password: userAttribute.password
		}, function (error, result){
			if(error) return promise.fulfill([error]);
			promise.fulfill(result);
		});
		return promise;
	});
	auth.registerSuccessRedirect('/');




	// Login Configuration
	auth.loginView('log');
	auth.getLoginPath('/auth/dologin');
	auth.postLoginPath('/auth/dologin');
	auth.authenticate(function (login, password){
		var promise = this.Promise();
		var errors = [];


		var cryptoPassword = 'wonjuRomance';
		var cipher = crypto.createCipher('aes192', cryptoPassword);
		cipher.update(password, 'utf8', 'base64');
		var cipheredOut = cipher.final('base64');


		db.admin.findOne({ login: login, password: cipheredOut }, function (error, user){
				if(user == null){
					errors.push('CODE001');
					return promise.fulfill(errors);
				}
				promise.fulfill(user);
		});

		return promise;
	});
	auth.loginSuccessRedirect('/');
};
