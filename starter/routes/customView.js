var express = require('express');
var router = express.Router();

/*
*	req.loggedIn
*		Return true/false 
*
*	req.usr.login
*		Return user Login id
*
*
*/

/* GET index */
router.get('/', function(req, res, next) {
	if(req.loggedIn){
		res.render('index', { userID: req.user.login });		
	} else {
		res.render('index');		
	}
});

module.exports = router;
