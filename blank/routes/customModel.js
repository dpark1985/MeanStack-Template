

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




module.exports = router;
