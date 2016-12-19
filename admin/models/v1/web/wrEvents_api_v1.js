/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/wr/api/v1/wrEvents/;
*/

const express   = require('express');
const router    = express.Router();
const fs        = require('fs');

router.get('/', function (req, res, next) {

});


router.post('/registNewEvent', function (req, res, next) {
  var wrEventImg = req.body.imgThumbSrc;
  var timeStemp = Date.now();

  req.body.imgThumbSrc = [];
  req.body.registDate = new Date();
  req.body.visits = 0;
  req.body.isActive = false;
  req.body.isApproved = false;
  req.body.isRejected = false;
  req.body.isExpired = false;

  if(wrEventImg[0]){
    var fileType = wrEventImg[0].split(',')[0];
    var fileData = wrEventImg[0].split(',')[1];
  }

  req.db.wrEvents.insert(req.body, function (err, data) {
    if(err) res.json({"registNewEvent" : false});

    var titleStr = "";
    for(var i=0; i<req.body.title.split(' ').length; i++){
      titleStr += "_" + req.body.title.split(' ')[i];
    }
    var imgPath = "./public/dbImg/wrEvents/" + timeStemp + titleStr;

    if(fileType.indexOf('image/png') > 0) {
      for(var i=0; i<wrEventImg.length; i++) {
        var imgFileName = "wrEvent" + titleStr + "_" + i + "_" + timeStemp;
        req.base64Img.img(wrEventImg[i], imgPath, imgFileName, function (imgErr, filePath){
          if(imgErr) res.json({"registNewEvent" : false});

          filePath = filePath.replace("public/", "");
          req.db.wrEvents.update({_id: req.db.ObjectId(data._id)}, {
            $push: {
              imgThumbSrc: {
                src: filePath
              }
            }
          }, function (err2, data2) {
            if(err2) res.json({"registNewEvent" : false});

            res.json({"registNewEvent" : true});
          });
        });
      };
    } else if(fileType.indexOf('image/svg+xml') > 0) {
      var tempDir = imgPath.split('/');
      tempDir.pop();
      var dir = tempDir.join('/');

      fs.stat(dir, function (statErr) {
        if(statErr){
          fs.mkdir(dir, function (mkDirErr) {
            if(mkDirErr) res.json({"registNewEvent" : false});

            fs.mkdir(imgPath, function(mkErr) {
              if(mkErr) res.json({"registNewEvent" : false});

              fs.writeFile(imgPath+'/wrEvent.svg', req.base64Svg.decode(fileData), 'utf8', function(fileErr){
                if (fileErr) throw fileErr;

                var filePath = imgPath+'/wrEvent.svg';
                filePath = filePath.replace("./public/", "");
                req.db.wrEvents.update({_id: req.db.ObjectId(data._id)}, {
                  $push: {
                    imgThumbSrc: {
                      src: filePath
                    }
                  }
                }, function(err2, data2) {
                  if(err2) res.json({"registNewEvent" : false});

                  res.json({"registNewEvent" : true});
                });
              });
            });
          });
        } else {
          fs.mkdir(imgPath, function(mkErr) {
            if(mkErr) res.json({"registNewEvent" : false});

            fs.writeFile(imgPath+'/wrEvent.svg', req.base64Svg.decode(fileData), 'utf8', function(fileErr){
              if (fileErr) throw fileErr;

              var filePath = imgPath+'/wrEvent.svg';
              filePath = filePath.replace("./public/", "");
              req.db.wrEvents.update({_id: req.db.ObjectId(data._id)}, {
                $push: {
                  imgThumbSrc: {
                    src: filePath
                  }
                }
              }, function(err2, data2) {
                if(err2) res.json({"registNewEvent" : false});

                res.json({"registNewEvent" : true});
              });
            });
          });
        }
      });



    }
  });
});

router.get('/allEventsList', function (req, res, next) {
  req.db.wrEvents.find({}, function(err, data) {
    if(err) res.json({"getAllEventsList": false});

    res.json({"getAllEventsList": true, "list": data});
  });
});

router.get('/allPendingEventsList', function (req, res, next) {
  req.db.wrEvents.find(
    {"isApproved": false, "isExpired": false, "isRejected" : false, "isActive": false},
    function (err, data){
      if(err) res.json({"getAllPendingEventsList": false});

      res.json({"getAllPendingEventsList": true, "list": data});
  });
});

router.post('/activateEvent', function (req, res, next) {
  req.db.wrEvents.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isApproved" : true,
      "isActive" : true
    }
  }, function (err, data) {
    if(err) res.json({"activateEvent": false});

    res.json({"activateEvent": true});
  });
});

router.post('/rejectEvent', function (req, res, next) {
  req.db.wrEvents.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRejected" : true,
    }
  }, function (err, data) {
    if(err) res.json({"rejectEvent": false});

    res.json({"rejectEvent": true});
  });
});

router.get('/allActiveEventsList', function (req, res, next) {
  req.db.wrEvents.find({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false},
  function(err, data) {
    if(err) res.json({"allActiveEventsList" : false});

    res.json({"allActiveEventsList" : true, "list": data});
  });
});

router.post('/deActivateEvent', function (req, res, next) {
  req.db.wrEvents.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isApproved" : false,
      "isActive": false
    }
  }, function(err, data) {
    if(err) res.json({"deActivateEvent": false});

    res.json({"deActivateEvent": true});
  });
});

router.post('/expireEvent', function (req, res, next) {
  req.db.wrEvents.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isActive" : false,
      "isExpired" : true
    }
  }, function(err, data) {
    if(err) res.json({"doExpireEvent": false});

    res.json({"doExpireEvent": true});
  });
});

router.get('/allExpiredEventsList', function (req, res, next) {
  req.db.wrEvents.find({"isExpired": true}, function (err, data){
    if(err) res.json({"getAllExpiredEventsList" : false});

    res.json({"getAllExpiredEventsList" : true, "list": data});
  });
});

router.post('/unExpireEvent', function (req, res, next) {
  req.db.wrEvents.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isApproved": false,
      "isExpired" : false
    }
  }, function(err, data) {
    if(err) res.json({"doUnExpire": false});

    res.json({"doUnExpire": true});
  });
});

router.get('/allRejectedEventsList', function (req, res, next) {
  req.db.wrEvents.find({"isRejected" : true}, function (err, data) {
    if(err) res.json({"getAllRejectedEventsList" : false});

    res.json({"getAllRejectedEventsList" : true, "list": data});
  });
});

router.post('/unRejectEvent', function (req, res, next) {
  req.db.wrEvents.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRejected" : false
    }
  }, function(err, data) {
    if(err) res.json({"doUnReject": false});

    res.json({"doUnReject": true});
  });
});

router.post('/deleteEvent', function (req, res, next) {
  req.db.wrEvents.findOne({_id: req.db.ObjectId(req.body._id)}, function(err, data){
    if(err) res.json({"doDelete": false});

    if(data.imgThumbSrc[0]){
      var temp1 = data.imgThumbSrc[0].src.split('/');
      temp1.pop();
      var dirPath = 'public/' + temp1.join('/');

      fs.stat('./public/'+data.imgThumbSrc[0].src, function (statErr, stats) {
        if(statErr) {
          req.db.wrEvents.remove({_id: req.db.ObjectId(req.body._id)}, (err2, data2) => {
            if(err2) res.json({"doDelete": false});

            res.json({"doDelete": true});
          });
        } else {
          fs.unlinkSync('public/'+data.imgThumbSrc[0].src);
          fs.rmdirSync(dirPath);

          req.db.wrEvents.remove({_id: req.db.ObjectId(req.body._id)}, (err2, data2) => {
            if(err2) res.json({"doDelete": false});

            res.json({"doDelete": true});
          });
        }
      });
    } else {
      req.db.wrEvents.remove({_id: req.db.ObjectId(req.body._id)}, (err2, data2) => {
        if(err2) res.json({"doDelete": false});

        res.json({"doDelete": true});
      });
    }
  });
});

router.get('/eventStatusCount', function (req, res, next) {
  var activatedPromise = new Promise(function (resolve, reject) {
    req.db.wrEvents.count({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false}, function (err, data) {
      if (err) reject({"activated": err});

      resolve({"activated": data});
    });
  });

  var pendingPromise = new Promise(function (resolve, reject) {
    req.db.wrEvents.count({"isApproved": false, "isActive": false, "isExpired": false, "isRejected" : false},
    function (err, data) {
      if (err) reject({"pending": err});

      resolve({"pending": data});
    });
  });

  var rejectedPromise = new Promise(function (resolve, reject) {
    req.db.wrEvents.count({"isRejected": true}, function (err, data) {
      if (err) reject({"rejected": err});

      resolve({"rejected": data});
    });
  });

  var expiredPromise = new Promise(function (resolve, reject) {
    req.db.wrEvents.count({"isExpired": true}, function (err, data) {
      if (err) reject({"expired": err});

      resolve({"expired": data});
    });
  });

  var allEventPromise = new Promise(function (resolve, reject) {
    req.db.wrEvents.count({}, function(err, data) {
      if (err) reject({"allEvents": err});

      resolve({"allEvents": data});
    });
  });

  Promise.all([activatedPromise, pendingPromise, rejectedPromise, expiredPromise, allEventPromise]).then(function (values) {
    res.json({"eventStatusCount" : true, "values": values});
  }, function (error) {
    res.json({"eventStatusCount" : false, "err": error});
  });
});



module.exports = router;
