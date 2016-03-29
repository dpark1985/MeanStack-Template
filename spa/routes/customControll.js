

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

router.get('/get/blockCode/:category', function (req, res, next){

	var category = req.params.category;

	if(category === 'header'){
		fs.readFile(process.cwd()+'/public/templates/common/navBar.html', 'utf8', function (err, data){
			if (err) throw err;
			var result = data;
			res.send(result);
		});	
	}


});

router.post('/set/blockCode/:category', function (req, res, next){
	var category = req.params.category;
	var data = req.body.data;

	if(category === 'header'){


		fs.writeFile(process.cwd()+'/public/templates/common/navBar.html', data, 'utf8', function (err) {
			if (err) return console.log(err);
			
			res.status(200).send('OK.');
		});

	}
});

module.exports = router;



