

var express = require('express');
var router = express.Router();

// index user status check
router.get('/get/userStatus', function (req, res, next) {
	if(req.loggedIn){
		res.json({ userID: req.user.login });	
	} else {
		res.json({ userID: null });
	}
});




// admin user status check
router.get('/get/adminStatus', function (req, res, next) {
	if(req.loggedIn){
		req.db.users.find({"login" : req.user.login}, function (err, data){
			if(data[0].isAdmin){
				res.json({userID: data[0].login});
			} else {
				res.json({ userID: null });
			}
		});
	} else {
		res.json({ userID: null });
	}
});



module.exports = router;
