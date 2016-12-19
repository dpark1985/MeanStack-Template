/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/wr/api/v1/appTitle/;
*/

const express   = require('express');
const router    = express.Router();
const fs        = require('fs');

router.get('/', function (req, res, next) {

});

router.post('/registNewTitle', function (req, res, next) {
  var titleImg = req.body.titleImage;
  var timeStemp = Date.now();

  req.body.titleImage = [];
  req.body.registDate = new Date();
  req.body.isActive = false,
  req.body.isApproved = false,
  req.body.isRejected = false,
  req.body.isExpired = false;

  if(titleImg[0]) {
    var fileType = titleImg[0].split(',')[0];
    var fileData = titleImg[0].split(',')[1];
  }

  req.db.titleImg.insert(req.body, function(err, data) {
    if(err) res.json({"registNewTitle" : false});

    var titleStr = "";
    for(var i=0; i<req.body.title.split(' ').length; i++){
      titleStr += "_" + req.body.title.split(' ')[i];
    }
    var imgPath = "./public/dbImg/appTitle/" + timeStemp + titleStr;

    if(fileType.indexOf('image/png') > 0) {
      var imgFileName = "appTitle" + titleStr + "_" + i + "_" + timeStemp;
      req.base64Img.img(titleImg[0], imgPath, imgFileName, function(imgErr, filePath){
        if(imgErr) res.json({"registNewTitle" : false});

        filePath = filePath.replace("public/", "");
        req.db.titleImg.update({_id: req.db.ObjectId(data._id)}, {
          $push: {
            titleImage: {
              src: filePath
            }
          }
        }, function(err2, data2) {
          if(err2) res.json({"registNewTitle" : false});

          res.json({"registNewTitle" : true});
        });
      });
    } else if(fileType.indexOf('image/svg+xml') > 0) {
      var tempDir = imgPath.split('/');
      tempDir.pop();
      var dir = tempDir.join('/');

      fs.stat(dir, function(statErr) {
        if(statErr){
          fs.mkdir(dir, function (mkDirErr) {
            if(mkDirErr) res.json({"registNewTitle" : false});

            fs.mkdir(imgPath, function(mkErr) {
              if(mkErr) res.json({"registNewTitle" : false});

              fs.writeFile(imgPath+'/appTitleImg.svg', req.base64Svg.decode(fileData), 'utf8', function(fileErr){
                if (fileErr) throw fileErr;

                var filePath = imgPath+'/appTitleImg.svg';
                filePath = filePath.replace("./public/", "");
                req.db.titleImg.update({_id: req.db.ObjectId(data._id)}, {
                  $push: {
                    titleImage: {
                      src: filePath
                    }
                  }
                }, function(err2, data2) {
                  if(err2) res.json({"registNewTitle" : false});

                  res.json({"registNewTitle" : true});
                });
              });
            });
          });
        } else {
          fs.mkdir(imgPath, function(mkErr) {
            if(mkErr) res.json({"registNewTitle" : false});

            fs.writeFile(imgPath+'/appTitleImg.svg', req.base64Svg.decode(fileData), 'utf8', function(fileErr){
              if (fileErr) throw fileErr;

              var filePath = imgPath+'/appTitleImg.svg';
              filePath = filePath.replace("./public/", "");
              req.db.titleImg.update({_id: req.db.ObjectId(data._id)}, {
                $push: {
                  titleImage: {
                    src: filePath
                  }
                }
              }, function(err2, data2) {
                if(err2) res.json({"registNewTitle" : false});

                res.json({"registNewTitle" : true});
              });
            });
          });
        }
      });
    }
  });
});

router.get('/allTitleList', function (req, res, next) {
  req.db.titleImg.find({}, function (err, data) {
    if(err) res.json({"allTitleList": false});

    res.json({"allTitleList": true, list: data});
  });
});

router.post('/deleteImg', function (req, res, next) {
  req.db.titleImg.findOne({_id: req.db.ObjectId(req.body._id)}, function (err, data) {
    if(err) res.json({"doDelete": false});

    if(data.titleImage[0]) {
      var temp1 = data.titleImage[0].src.split('/');
      temp1.pop();
      var dirPath = 'public/' + temp1.join('/');

      fs.stat('./public/'+data.titleImage[0].src, function (statErr, stats){
        if(statErr) {
          req.db.titleImg.remove({_id: req.db.ObjectId(req.body._id)}, function (err2, data2){
            if(err2) res.json({"doDelete": false});

            res.json({"doDelete": true});
          });
        } else {
          fs.unlinkSync('public/'+data.titleImage[0].src);
          fs.rmdirSync(dirPath);

          req.db.titleImg.remove({_id: req.db.ObjectId(req.body._id)}, function (err2, data2){
            if(err2) res.json({"doDelete": false});

            res.json({"doDelete": true});
          });
        }
      });
    } else {
      req.db.titleImg.remove({_id: req.db.ObjectId(req.body._id)}, function (err2, data2){
        if(err2) res.json({"doDelete": false});

        res.json({"doDelete": true});
      });
    }
  })
});

router.get('/allPendingList', function (req, res, next) {
  req.db.titleImg.find({"isApproved": false, "isExpired": false, "isRejected" : false, "isActive": false},
    function (err, data) {
      if (err) res.json({"allPendingList": false});

      res.json({"allPendingList": true, list: data});
  });
});

router.post('/reject', function (req, res, next) {
  req.db.titleImg.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRejected" : true
    }
  }, function (err, data) {
    if(err) res.json({"reject": false});

    res.json({"reject": true});
  });
});

router.post('/activate', function (req, res, next) {
  req.db.titleImg.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isApproved" : true,
      "isActive" : true
    }
  }, function (err, data) {
    if(err) res.json({"activate": false});

    res.json({"activate": true});
  });
});

router.get('/allRejectedList', function (req, res, next) {
  req.db.titleImg.find({"isRejected" : true}, function (err, data) {
    if(err) res.json({"allRejectedList" : false});

    res.json({"allRejectedList" : true, "list": data});
  });
});

router.post('/unReject', function (req, res, next) {
  req.db.titleImg.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRejected" : false
    }
  }, function(err, data) {
    if(err) res.json({"unReject": false});

    res.json({"unReject": true});
  });
});

router.get('/allActiveList', function (req, res, next) {
  req.db.titleImg.find({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false},
    function (err, data) {
      if(err) res.json({"allActiveList" : false});

      res.json({"allActiveList" : true, "list": data});
  });
});

router.post('/expire', function (req, res, next) {
  req.db.titleImg.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isActive" : false,
      "isExpired" : true
    }
  }, function(err, data) {
    if(err) res.json({"expire": false});

    res.json({"expire": true});
  });
});

router.post('/unExpire', function (req, res, next) {
  req.db.titleImg.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isApproved": false,
      "isExpired" : false
    }
  }, function(err, data) {
    if(err) res.json({"unExpire": false});

    res.json({"unExpire": true});
  });
});

router.get('/allExpiredList', function (req, res, next) {
  req.db.titleImg.find({"isExpired": true}, function (err, data){
    if(err) res.json({"allExpiredList" : false});

    res.json({"allExpiredList" : true, "list": data});
  });
});

router.get('/statusCount', function (req, res, next) {
  var activatedPromise = new Promise(function (resolve, reject) {
    req.db.titleImg.count({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false}, function (err, data) {
      if (err) reject({"activated": err});

      resolve({"activated": data});
    });
  });

  var pendingPromise = new Promise(function (resolve, reject) {
    req.db.titleImg.count({"isApproved": false, "isActive": false, "isExpired": false, "isRejected" : false},
    function (err, data) {
      if (err) reject({"pending": err});

      resolve({"pending": data});
    });
  });

  var rejectedPromise = new Promise(function (resolve, reject) {
    req.db.titleImg.count({"isRejected": true}, function (err, data) {
      if (err) reject({"rejected": err});

      resolve({"rejected": data});
    });
  });

  var expiredPromise = new Promise(function (resolve, reject) {
    req.db.titleImg.count({"isExpired": true}, function (err, data) {
      if (err) reject({"expired": err});

      resolve({"expired": data});
    });
  });

  var allAdPromise = new Promise(function (resolve, reject) {
    req.db.titleImg.count({}, function(err, data) {
      if (err) reject({"allAds": err});

      resolve({"allAds": data});
    });
  });

  Promise.all([activatedPromise, pendingPromise, rejectedPromise, expiredPromise, allAdPromise]).then(function (values) {
    res.json({"statusCount" : true, "values": values});
  }, function (error) {
    res.json({"statusCount" : false, "err": error});
  });
});


module.exports = router;
