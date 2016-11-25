/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/wr/api/v1/admin/;
*/

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

});

router.get('/isAdminExist', function (req, res, next) {
  req.db.admin.find({}, function(err, data) {
    if(data.length > 0){
      res.json({"userExist" : true});
    } else {
      res.json({"userExist" : false});
    }
  });
});

router.get('/isLoggedIn', function (req, res, next) {
  if(req.loggedIn){
    res.json({loggedIn: req.loggedIn, login: req.user.login});
  } else {
    res.json({loggedIn: req.loggedIn});
  }
});

module.exports = router;
