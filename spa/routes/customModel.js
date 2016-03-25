

var express = require('express');
var router = express.Router();
var fs = require('fs');




router.get('/get/userStatus', function (req, res, next) {
	if(req.loggedIn){
		res.json({ userID: req.user.login });	
	} else {
		res.json({ userID: null });
	}
});


router.post('/set/title', function (req, res, next){
	var title = req.body.title;
	var old = req.body.old;

	fs.readFile(process.cwd()+'/routes/customView.js', 'utf8', function(err, data){
		if (err) throw err;

		var result = data.replace(old, title);

		fs.writeFile(process.cwd()+'/routes/customView.js', result, 'utf8', function (err) {
			if (err) return console.log(err);
			res.redirect(200, '/');
		});
	});
});

module.exports = router;



