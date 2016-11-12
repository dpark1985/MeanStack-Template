/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/wr/api/v1/overView/;
*/

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

});

router.get('/overViewStatusCount', function (req, res, next) {

  var eventsCountPromise = new Promise(function (resolve, reject) {
    req.db.events.count({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false}, function (err, data) {
      if(err) reject({"eventsCount": err});

      resolve({"eventsCount": data});
    });
  });

  var adsCountPromise = new Promise(function (resolve, reject) {
    req.db.ads.count({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false}, function (err, data) {
      if(err) reject({"adsCount": err});

      resolve({"adsCount": data});
    });
  });

  var notisCountPromise = new Promise(function (resolve, reject) {
    req.db.notis.count({"isApproved": true, "isActive": true, "isRejected": false}, function (err, data) {
      if(err) reject({"notisCount": err});

      resolve({"notisCount": data});
    });
  });

  Promise.all([eventsCountPromise, adsCountPromise, notisCountPromise]).then(function (values) {
    res.json({"overViewStatusCount" : true, "values": values});
  }, function (error) {
    res.json({"overViewStatusCount" : false, "err": error});
  });
});

module.exports = router;
