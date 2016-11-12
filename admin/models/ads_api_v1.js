/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/wr/api/v1/ads/
*/

var express = require('express');
var router = express.Router();
var fs = require('fs');
var exec = require('child_process').exec;

router.get('/', function (req, res, next) {

});

router.post('/registNewAd', function (req, res, next) {
  var adImg = req.body.adImage;
  var timeStemp = Date.now();

  req.body.adImage = [];
  req.body.registDate = new Date();

  req.db.ads.insert(req.body, function(err, data) {
    if(err) res.json({"doRegistNewAd" : false});

    var titleStr = "";
    for(var i=0; i<req.body.title.split(' ').length; i++){
      titleStr += "_" + req.body.title.split(' ')[i];
    }

    var imgPath = "./public/dbImg/ads/" + timeStemp + titleStr;

    for(var i=0; i<adImg.length; i++){
      var imgFileName = "ad" + titleStr + "_" + i + "_" + timeStemp;
      req.base64Img.img(adImg[i], imgPath, imgFileName, function(imgErr, filePath){
        if(imgErr) res.json({"doRegistNewAd" : false});

        req.db.ads.update({_id: req.db.ObjectId(data._id)}, {
          $push: {
            adImage: {
              src: filePath
            }
          }
        }, function(err2, data2) {
          if(err2) res.json({"doRegistNewAd" : false});

          res.json({"doRegistNewAd" : true});
        });
      });
    }

  });
});

router.get('/allAdsList', function (req, res, next) {
  req.db.ads.find({}, function (err, data) {
    if(err) res.json({"allAdsList" : false});

    res.json({"allAdsList" : true, "list" : data});
  });
});

router.get('/allPendingAdsList', function (req, res, next) {
  req.db.ads.find(
    {"isApproved": false, "isExpired": false, "isRejected" : false, "isActive": false},
    function (err, data){
      if(err) res.json({"allPendingAdsList": false});

      res.json({"allPendingAdsList": true, "list": data});
  });
});

router.post('/activateAd', function (req, res, next) {
  req.db.ads.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isApproved" : true,
      "isActive" : true
    }
  }, function (err, data) {
    if(err) res.json({"activateAd": false});

    res.json({"activateAd": true});
  })
});

router.post('/rejectAd', function (req, res, next) {
  req.db.ads.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRejected" : true,
    }
  }, function (err, data) {
    if(err) res.json({"rejectAd": false});

    res.json({"rejectAd": true});
  });
});

router.get('/allActiveAdsList', function (req, res, next) {
  req.db.ads.find({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false},
  function(err, data) {
    if(err) res.json({"allActiveAdsList" : false});

    res.json({"allActiveAdsList" : true, "list": data});
  });
});

router.post('/expireAd', function (req, res, next) {
  req.db.ads.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isActive" : false,
      "isExpired" : true
    }
  }, function(err, data) {
    if(err) res.json({"expireAd": false});

    res.json({"expireAd": true});
  });
});

router.get('/allExpiredAdsList', function (req, res, next) {
  req.db.ads.find({"isExpired": true}, function (err, data){
    if(err) res.json({"allExpiredAdsList" : false});

    res.json({"allExpiredAdsList" : true, "list": data});
  });
});

router.post('/unExpireAd', function (req, res, next) {
  req.db.ads.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isApproved": false,
      "isExpired" : false
    }
  }, function(err, data) {
    if(err) res.json({"unExpireAd": false});

    res.json({"unExpireAd": true});
  });
});

router.get('/allRejectedAdsList', function (req, res, next) {
  req.db.ads.find({"isRejected" : true}, function (err, data) {
    if(err) res.json({"allRejectedAdsList" : false});

    res.json({"allRejectedAdsList" : true, "list": data});
  });
});

router.post('/unRejectAd', function (req, res, next) {
  req.db.ads.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRejected" : false
    }
  }, function(err, data) {
    if(err) res.json({"unRejectAd": false});

    res.json({"unRejectAd": true});
  });
});

router.post('/deleteAd', function (req, res, next) {
  req.db.ads.find({_id: req.db.ObjectId(req.body._id)}, function(err, data){
    var temp1 = data[0].adImage[0].src.split('/');
    temp1.pop();
    var dirPath = temp1.join('/');

    exec('rm -rf ' + dirPath, function (error, stdout, stderr) {
      if(error) res.json({"doDelete": false});

      req.db.ads.remove({_id: req.db.ObjectId(req.body._id)}, function (err2, data2){
        if(err2) res.json({"doDelete": false});

        res.json({"doDelete": true});
      });
    });
  });
});

router.get('/adStatusCount', function (req, res, next) {
  var activatedPromise = new Promise(function (resolve, reject) {
    req.db.ads.count({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false}, function (err, data) {
      if (err) reject({"activated": err});

      resolve({"activated": data});
    });
  });

  var pendingPromise = new Promise(function (resolve, reject) {
    req.db.ads.count({"isApproved": false, "isActive": false, "isExpired": false, "isRejected" : false},
    function (err, data) {
      if (err) reject({"pending": err});

      resolve({"pending": data});
    });
  });

  var rejectedPromise = new Promise(function (resolve, reject) {
    req.db.ads.count({"isRejected": true}, function (err, data) {
      if (err) reject({"rejected": err});

      resolve({"rejected": data});
    });
  });

  var expiredPromise = new Promise(function (resolve, reject) {
    req.db.ads.count({"isExpired": true}, function (err, data) {
      if (err) reject({"expired": err});

      resolve({"expired": data});
    });
  });

  var allAdPromise = new Promise(function (resolve, reject) {
    req.db.ads.count({}, function(err, data) {
      if (err) reject({"allAds": err});

      resolve({"allAds": data});
    });
  });

  Promise.all([activatedPromise, pendingPromise, rejectedPromise, expiredPromise, allAdPromise]).then(function (values) {
    res.json({"adStatusCount" : true, "values": values});
  }, function (error) {
    res.json({"adStatusCount" : false, "err": error});
  });
});

router.post('/checkExpiredAds', function (req, res, next) {
  req.db.ads.find({"isActive": true, "isApproved": true}, function(err, data) {
    if(err) res.json({"checkExpired": false});

    var today = new Date();

    var checkExpiredPromise = new Promise(function(resolve, reject) {
      for(var i=0; i<data.length; i++){
        var adEndDate = new Date(data[i].adDate.endD);

        if (adEndDate-today < 0) {
          req.db.ads.update({_id: req.db.ObjectId(data[i]._id)}, {
            $set: {
              "isActive": false,
              "isExpired": true
            }
          }, function (err, data){
            if(err) reject(err);
          });
        }
      }
      resolve(true);
    });

    checkExpiredPromise.then(function (values) {
      res.json({"checkExpired": true});
    }, function (err) {
      res.json({"checkExpired": false});
    });

  });
});


module.exports = router;
