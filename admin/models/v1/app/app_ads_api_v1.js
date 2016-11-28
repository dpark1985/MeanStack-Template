/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/app/api/v1/ads;
*/

var express             = require('express');
var router              = express.Router();

var serverIp            = require('../../../config/serverConfig');

router.get('/', function (req, res, next) {

});

router.get('/mainViewAdsList', function (req, res, next) {
  var mainViewAdsListPromise = new Promise (function (resolve, reject) {
    req.db.ads.find({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false, "location.value": 1},
    function(err, data) {
      if(err) reject(true);

      resolve({"allActiveAdsList" : true, "list": data});
    });
  });

  var allViewAdsListPromise = new Promise (function (resolve, reject) {
    req.db.ads.find({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false, "location.value": 3},
    function(err, data) {
      if(err) reject(true);

      resolve({"allActiveAdsList" : true, "list": data});
    });
  });

  var adsListData = [];

  Promise.all([mainViewAdsListPromise, allViewAdsListPromise]).then(function (values) {
    for(var i=0; i<values.length; i++){
      if(values[i].list.length > 0){
        for(var j=0; j<values[i].list.length; j++){
          values[i].list[j].adImage[0].src = serverIp.getServerIp() + values[i].list[j].adImage[0].src;
          adsListData.push(values[i].list[j]);
        }
      }
    }
    res.json({"allActiveAdsList" : true, "list": adsListData});
  }, function (error) {
    res.json({"allActiveAdsList" : false, "err": error});
  });
});

router.get('/listViewAdsList', function (req, res, next) {
  var mainViewAdsListPromise = new Promise (function (resolve, reject) {
    req.db.ads.find({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false, "location.value": 2},
    function(err, data) {
      if(err) reject(true);

      resolve({"allActiveAdsList" : true, "list": data});
    });
  });

  var allViewAdsListPromise = new Promise (function (resolve, reject) {
    req.db.ads.find({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false, "location.value": 3},
    function(err, data) {
      if(err) reject(true);

      resolve({"allActiveAdsList" : true, "list": data});
    });
  });

  var adsListData = [];

  Promise.all([mainViewAdsListPromise, allViewAdsListPromise]).then(function (values) {
    for(var i=0; i<values.length; i++){
      if(values[i].list.length > 0){
        for(var j=0; j<values[i].list.length; j++){
          values[i].list[j].adImage[0].src = serverIp.getServerIp() + values[i].list[j].adImage[0].src;
          adsListData.push(values[i].list[j]);
        }
      }
    }
    res.json({"allActiveAdsList" : true, "list": adsListData});
  }, function (error) {
    res.json({"allActiveAdsList" : false, "err": error});
  });
});

router.get('/allAdsList', function (req, res, next) {
  req.db.ads.find({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false},
  function(err, data) {
    if(err) res.json({"allActiveAdsList" : false, "err": error});

    for(var i=0; i<data.length; i++){
      data[i].adImage[0].src = serverIp.getServerIp() + data[i].adImage[0].src;
    }

    res.json({"allActiveAdsList" : true, "list": data});
  });

});

router.post('/visits', function (req, res, next) {
  req.db.ads.find({_id: req.db.ObjectId(req.body._id)}, function (err, data) {
    if(err) res.json({"visit": false});

    req.db.ads.update({_id: req.db.ObjectId(req.body._id)}, {
      $inc: {
        visits: 1
      }
    }, function (err2, data2) {
      if(err2)res.json({"visit": false});

      res.json({"visit": true});
    });
  });
});



module.exports = router;
