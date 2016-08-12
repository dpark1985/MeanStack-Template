

var express = require('express');
var router = express.Router();
var fs = require('fs');
var util = require('util');




router.post('/set/title', function (req, res, next){
	var oldTitle = req.body.oldTitle;
	var newTitle = req.body.newTitle;

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
	if(category === 'footer'){
		fs.readFile(process.cwd()+'/public/templates/common/footer.html', 'utf8', function (err, data){
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

	if(category === 'footer'){
		fs.writeFile(process.cwd()+'/public/templates/common/footer.html', data, 'utf8', function (err) {
			if (err) return console.log(err);
			res.status(200).send('OK.');
		});
	}
});

router.post('/create/file', function (req, res, next){


/*
	fs.readFile(process.cwd()+'/routes/customView.js', 'utf8', function (err, data){
		if (err) throw err;
		var result = data;

		var index = result.indexOf("router.get('/', function (req, res, next)");

		res.send(index.toString());



		fs.writeFile(process.cwd()+'/routes/customView.js', result, 'utf8', function (err){
			if (err) return console.log(err);
			res.status(200).send('OK.');
		});


	});
*/



/*
	fs.readFile(process.cwd()+'/config/config.js', 'utf8', function (err, data){
		if (err) throw err;
		var result = data;

		result = result.replace("var dbCollections = ['structure', 'users'];", "var dbCollections = ['structure', 'users', 'testing'];")

		fs.writeFile(process.cwd()+'/config/config.js', result, 'utf8', function (err){
			if (err) return console.log(err);
			res.status(200).send('OK.');
		});
	});
*/




/*
	fs.readFile(process.cwd()+'/app.js', 'utf8', function (err, data){
		if (err) throw err;
		var result = data;

		count = result.match().length;   //** regex

		for(var i=0; i<count; i++){
			result = result.replace("//**", "");
		}

		fs.writeFile(process.cwd()+'/app.js', result, 'utf8', function (err){
			if (err) return console.log(err);
			res.status(200).send(result);
		});
	});
*/



/*
	fs.readFile(process.cwd()+'/routes/utilities/auth.js', 'utf8', function (err, data){
		if (err) throw err;
		var result = data;

		result = result.replace("errors.push('비밀번호가 8글자 이하입니다.');", "errors.push('비밀번호가 8글자 이하입니다???.');")
		//res.send(result);
		fs.writeFile(process.cwd()+'/routes/utilities/auth.js', result, 'utf8', function (err){
			if (err) return console.log(err);
			res.status(200).send('OK.');
		});
	});
*/



	var titleText = req.body.title;
	fs.readFile(process.cwd()+'/public/javascripts/controllers/config/SPAglobal.js', 'utf8', function (err, data){
		if (err) throw err;
		var result = data;

		var a = new RegExp('\\$scope\\.titleText\\s=\\s\\"'+ titleText +'\\"\\;');
		var b = '$scope.titleText = "' + "ABC" +'";';

		result = result.replace(a, b);
		fs.writeFile(process.cwd()+'/public/javascripts/controllers/config/SPAglobal.js', result, 'utf8', function (err){
			if (err) return console.log(err);
			res.status(200).send('OK.');
		});
	});



});



module.exports = router;
