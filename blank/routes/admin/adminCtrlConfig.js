

var express = require('express');
var router = express.Router();


var adminCtrl = require('./controllers/adminCtrl');

// http://127.0.0.1:3000/adminCtrl/

router.get('/adminStatus', function (req, res, next) {
	adminCtrl.getAdminStatus(req, res);
});

router.get('/osData', function (req, res, next) {
  adminCtrl.getOSData(req, res);
});

router.get('/serverData', function (req, res, next) {
  adminCtrl.getServerData(req, res);
});

router.get('/visitData', function (req, res, next) {
  adminCtrl.getVisitData(req.db, req, res);
});

router.get('/usersData', function (req, res, next) {
  adminCtrl.getUsersData(req.db, req, res);
});



module.exports = router;
