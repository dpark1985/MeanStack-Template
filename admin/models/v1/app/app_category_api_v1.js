/*
	title:		Wonju Romance API V1
	url: 		http://www.127.0.0.1:3000/app/api/v1/category/;
*/

var express             = require('express');
var router              = express.Router();

var serverIp            = require('../../../config/serverConfig');

router.get('/', function (req, res, next) {

});

router.get('/getCategory', function (req, res, next) {
	req.db.categories.find({}, function (err, data) {
		res.json(data);
	});
});

module.exports = router;
