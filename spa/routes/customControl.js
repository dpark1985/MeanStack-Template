

var express = require('express');
var router = express.Router();
var fs = require('fs');




router.post('/set/title', function (req, res, next){
	var newTitle = req.body.title;
	var oldTitle = req.body.old;


	fs.readFile(process.cwd()+'/routes/customView.js', 'utf8', function (err, data){
		if (err) throw err;

		var result = data.replace(oldTitle, newTitle);

		fs.writeFile(process.cwd()+'/routes/customView.js', result, 'utf8', function (err) {
			if (err) return console.log(err);
			res.redirect(200, '/');
		});
	});



});

router.post('/get/blockCode', function (req, res, next){

	var cateogry = req.body.cateogry;
	console.log(req.body);

	console.log(process.cwd()+'/public/templates/common/navBar.html');

	if(category === 'header'){



		fs.readFile(process.cwd()+'/public/templates/common/navBar.html', 'utf8', function (err, data){
			if (err) throw err;

			var result = data;

			res.send(result);


		});	
	}




});

module.exports = router;



