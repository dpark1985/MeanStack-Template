/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/app/api/v1/menus;
*/

var express             = require('express');
var router              = express.Router();

var serverIp            = require('../../../config/serverConfig');

router.get('/', function (req, res, next) {

});


router.get('/noticeList', function (req, res, next) {
  req.db.notis.find({"isApproved": true, "isActive": true, "isRejected": false}).sort({
    registDate: -1
  }, function (err, data) {
      if(err) res.json({"allActiveNotisList" : false});

      var noticeData = [];
      for(var i=0; i<5; i++){
        if(data[i]){
          noticeData.push(data[i]);
        }
      }

      res.json({"allActiveNotisList" : true, "list": noticeData});
  });
});

router.post('/reportEvents', function (req, res, next) {
  var eventImages = req.body.img;
  var timeStemp = Date.now();

  req.body.img = [];
  req.body.registDate = new Date();
  req.body.isExamed = false;
  req.body.isRegistered = false;
  req.body.isRejected = false;

  req.db.reportEvents.insert(req.body, function (err, data) {
    if(err) res.json({'reportEvents': false});

    var titleStr = "";

    for(var i=0; i<req.body.title.split(' ').length; i++){
      titleStr += "_" + req.body.title.split(' ')[i];
    }

    var imgPath = "./public/dbImg/reportEvents/" + timeStemp + titleStr;

    var eventImagesPromise = new Promise(function (resolve, reject) {
      for(var i=0; i<eventImages.length; i++){
        var imgFileName = "reportEvent" + titleStr + "_" + i + "_" + timeStemp;

        if(eventImages[i].src){
          req.base64Img.img(eventImages[i].src, imgPath, imgFileName, function (imgErr, filePath) {
            if(imgErr) reject(imgErr);

            filePath = filePath.replace("public/", "");
            req.db.reportEvents.update({_id: req.db.ObjectId(data._id)}, {
              $push: {
                img: {
                  src: filePath
                }
              }
            }, function (err2, data2) {
              if(err2) reject(err2);
            });
          });
        }
      }
      resolve(true);
    });

    eventImagesPromise.then(function (values) {
      res.json({'reportEvents': true});
    }, function (error) {
      res.json({'reportEvents': false, "error": error});
    });
  });
});

router.post('/reportInquiry', function (req, res, next) {
  var eventImages = req.body.img;
  var timeStemp = Date.now();

  req.body.img = [];
  req.body.registDate = new Date();
  req.body.isExamed = false;
  req.body.isRegistered = false;
  req.body.isRejected = false;

  req.db.reportInquiry.insert(req.body, function (err, data) {
    if(err) res.json({'reportEvents': false});

    var titleStr = "";

    for(var i=0; i<req.body.title.split(' ').length; i++){
      titleStr += "_" + req.body.title.split(' ')[i];
    }

    var imgPath = "./public/dbImg/reportInquiries/" + timeStemp + titleStr;

    var eventImagesPromise = new Promise(function (resolve, reject) {
      for(var i=0; i<eventImages.length; i++){
        var imgFileName = "reportInquiry" + titleStr + "_" + i + "_" + timeStemp;

        if(eventImages[i].src){
          req.base64Img.img(eventImages[i].src, imgPath, imgFileName, function (imgErr, filePath) {
            if(imgErr) reject(imgErr);

            filePath = filePath.replace("public/", "");
            req.db.reportInquiry.update({_id: req.db.ObjectId(data._id)}, {
              $push: {
                img: {
                  src: filePath
                }
              }
            }, function (err2, data2) {
              if(err2) reject(err2);
            });
          });
        }
      }
      resolve(true);
    });

    eventImagesPromise.then(function (values) {
      res.json({'reportEvents': true});
    }, function (error) {
      res.json({'reportEvents': false, "error": error});
    });
  });
});



module.exports = router;
