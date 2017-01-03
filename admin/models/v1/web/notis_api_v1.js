/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/wr/api/v1/notis/
*/

const express   = require('express');
const router    = express.Router();
const fs        = require('fs');

router.get('/', function (req, res, next) {

});

router.post('/registNewNoti', function (req, res, next) {
  var notiImg = req.body.imgThumbSrc
  var timeStemp = Date.now();

  req.body.imgThumbSrc = [];
  req.body.registDate = new Date();
  req.body.visits = 0;
  req.body.isActive = false;
  req.body.isApproved = false;
  req.body.isRejected = false;

  if(notiImg[0]){
    var fileType = notiImg[0].split(',')[0];
    var fileData = notiImg[0].split(',')[1];
  }

  req.db.notis.insert(req.body, function(err, data) {
    if(err) res.json({"registNewNoti" : false});

    var titleStr = "";
    for(var i=0; i<req.body.title.split(' ').length; i++){
      titleStr += "_" + req.body.title.split(' ')[i];
    }
    var imgPath = "./public/dbImg/notice/" + timeStemp + titleStr;

    if(fileType.indexOf('image/png') > 0) {
      var imgFileName = "notice" + titleStr + "_" + i + "_" + timeStemp;
      req.base64Img.img(notiImg[0], imgPath, imgFileName, function (imgErr, filePath){
        if(imgErr) res.json({"registNewNoti" : false});

        filePath = filePath.replace("public/", "");
        req.db.notis.update({_id: req.db.ObjectId(data._id)}, {
          $push: {
            imgThumbSrc: {
              src: filePath
            }
          }
        }, function (err2, data2) {
          if(err2) res.json({"registNewNoti" : false});

          res.json({"registNewNoti" : true});
        });
      });
    } else if(fileType.indexOf('image/svg+xml') > 0) {
      var tempDir = imgPath.split('/');
      tempDir.pop();
      var dir = tempDir.join('/');

      fs.stat(dir, function (statErr) {
        if(statErr) {
          fs.mkdir(dir, function (mkDirErr) {
            if(mkDirErr) res.json({"registNewNoti" : false});

            fs.mkdir(imgPath, function(mkErr) {
              if(mkErr) res.json({"registNewNoti" : false});

              fs.writeFile(imgPath+'/notice.svg', req.base64Svg.decode(fileData), 'utf8', function(fileErr){
                if (fileErr) res.json({"registNewNoti" : false});

                var filePath = imgPath+'/notice.svg';
                filePath = filePath.replace("./public/", "");
                req.db.notis.update({_id: req.db.ObjectId(data._id)}, {
                  $push: {
                    imgThumbSrc: {
                      src: filePath
                    }
                  }
                }, function(err2, data2) {
                  if(err2) res.json({"registNewNoti" : false});

                  res.json({"registNewNoti" : true});
                });
              });
            });
          });
        } else {
          fs.mkdir(imgPath, function(mkErr) {
            if(mkErr) res.json({"registNewNoti" : false});

            fs.writeFile(imgPath+'/notice.svg', req.base64Svg.decode(fileData), 'utf8', function(fileErr){
              if (fileErr) res.json({"registNewNoti" : false});

              var filePath = imgPath+'/notice.svg';
              filePath = filePath.replace("./public/", "");
              req.db.notis.update({_id: req.db.ObjectId(data._id)}, {
                $push: {
                  imgThumbSrc: {
                    src: filePath
                  }
                }
              }, function(err2, data2) {
                if(err2) res.json({"registNewNoti" : false});

                res.json({"registNewNoti" : true});
              });
            });
          });
        }
      });
    }
  });
});

router.get('/allNotisList', function (req, res, next) {
  req.db.notis.find({}, function (err, data) {
    if(err) res.json({"allNotisList" : false});

    res.json({"allNotisList" : true, "list" : data});
  });
});

router.get('/allPendingNotisList', function (req, res, next) {
  req.db.notis.find(
    {"isApproved": false, "isRejected" : false, "isActive": false},
    function (err, data){
      if(err) res.json({"allPendingNotisList": false});

      res.json({"allPendingNotisList": true, "list": data});
  });
});

router.post('/activateNoti', function (req, res, next) {
  req.db.notis.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isApproved" : true,
      "isActive" : true
    }
  }, function (err, data) {
    if(err) res.json({"activateNoti": false});

    res.json({"activateNoti": true});
  });
});

router.post('/rejectNoti', function (req, res, next) {
  req.db.notis.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRejected" : true,
    }
  }, function (err, data) {
    if(err) res.json({"rejectNoti": false});

    res.json({"rejectNoti": true});
  });
});

router.get('/allActiveNotisList', function (req, res, next) {
  req.db.notis.find({"isApproved": true, "isActive": true, "isRejected": false},
  function(err, data) {
    if(err) res.json({"allActiveNotisList" : false});

    res.json({"allActiveNotisList" : true, "list": data});
  });
});

router.post('/deActivateNoti', function (req, res, next) {
  req.db.notis.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isApproved" : false,
      "isActive": false
    }
  }, function(err, data) {
    if(err) res.json({"deActivateNoti": false});

    res.json({"deActivateNoti": true});
  });
});

router.get('/allRejectedNotisList', function (req, res, next) {
  req.db.notis.find({"isRejected" : true}, function (err, data) {
    if(err) res.json({"allRejectedNotisList" : false});

    res.json({"allRejectedNotisList" : true, "list": data});
  });
});

router.post('/unRejectNoti', function (req, res, next) {
  req.db.notis.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRejected" : false
    }
  }, function(err, data) {
    if(err) res.json({"unRejectNoti": false});

    res.json({"unRejectNoti": true});
  });
});

router.post('/deleteNoti', function (req, res, next) {
  req.db.notis.findOne({_id: req.db.ObjectId(req.body._id)}, function(err, data){
    if(err) res.json({"deleteNoti": false});

    if(data.imgThumbSrc[0]){
      var temp1 = data.imgThumbSrc[0].src.split('/');
      temp1.pop();
      var dirPath = 'public/' + temp1.join('/');

      fs.stat('./public/'+data.imgThumbSrc[0].src, function (statErr, stats) {
        if(statErr) {
          req.db.notis.remove({_id: req.db.ObjectId(req.body._id)}, (err2, data2) => {
            if(err2) res.json({"deleteNoti": false});

            res.json({"deleteNoti": true});
          });
        } else {
          fs.unlinkSync('public/'+data.imgThumbSrc[0].src);
          fs.rmdirSync(dirPath);

          req.db.notis.remove({_id: req.db.ObjectId(req.body._id)}, (err2, data2) => {
            if(err2) res.json({"deleteNoti": false});

            res.json({"deleteNoti": true});
          });
        }
      });
    } else {
      req.db.notis.remove({_id: req.db.ObjectId(req.body._id)}, (err2, data2) => {
        if(err2) res.json({"deleteNoti": false});

        res.json({"deleteNoti": true});
      });
    }
  });
});

router.get('/notisStatusCount', function (req, res, next) {
  var activatedPromise = new Promise(function (resolve, reject) {
    req.db.notis.count({"isApproved": true, "isActive": true, "isRejected": false}, function (err, data) {
      if (err) reject({"activated": err});

      resolve({"activated": data});
    });
  });

  var pendingPromise = new Promise(function (resolve, reject) {
    req.db.notis.count({"isApproved": false, "isActive": false, "isRejected" : false},
    function (err, data) {
      if (err) reject({"pending": err});

      resolve({"pending": data});
    });
  });

  var rejectedPromise = new Promise(function (resolve, reject) {
    req.db.notis.count({"isRejected": true}, function (err, data) {
      if (err) reject({"rejected": err});

      resolve({"rejected": data});
    });
  });

  var allAdPromise = new Promise(function (resolve, reject) {
    req.db.notis.count({}, function(err, data) {
      if (err) reject({"allNotis": err});

      resolve({"allNotis": data});
    });
  });

  Promise.all([activatedPromise, pendingPromise, rejectedPromise, allAdPromise]).then(function (values) {
    res.json({"notisStatusCount" : true, "values": values});
  }, function (error) {
    res.json({"notisStatusCount" : false, "err": error});
  });
});

router.post('/checkExpiredAds', function (req, res, next) {
  req.db.notis.find({"isActive": true, "isApproved": true}, function(err, data) {
    if(err) res.json({"checkExpired": false});

    var today = new Date();

    var checkExpiredPromise = new Promise(function(resolve, reject) {
      for(var i=0; i<data.length; i++){
        var adEndDate = new Date(data[i].adDate.endD);

        if (adEndDate-today < 0) {
          req.db.notis.update({_id: req.db.ObjectId(data[i]._id)}, {
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
