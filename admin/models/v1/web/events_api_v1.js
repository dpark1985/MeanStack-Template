/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/wr/api/v1/events/;
*/

const express   = require('express');
const router    = express.Router();
const fs        = require('fs');

router.get('/', function (req, res, next) {

});

router.post('/initCategories', function (req, res, next) {

  var promise1 = new Promise(function (resolve, reject) {
    req.db.categories.insert({
      category: "mainCategory",
      list: [
        {title: "문화행사", value: 1, sub: "subCategory1"},
        {title: "스포츠", value: 2, sub: "subCategory2"},
      ]
    }, function(err, data){
      if(err) reject(false);

      if(data) resolve(true);
    });
  });

  var promise2 = new Promise(function (resolve, reject) {
    req.db.categories.insert({
      category: "subCategory1",
      list: [
        {title: "공연", value: 1},
        {title: "음악회", value: 2},
        {title: "영화", value: 3},
        {title: "강연", value: 4},
        {title: "축제", value: 5},
      ]
    }, function(err, data){
      if(err) reject(false);

      if(data) resolve(true);
    });
  });

  var promise3 = new Promise(function (resolve, reject) {
    req.db.categories.insert({
      category: "subCategory2",
      list: [
        {title: "농구", value: 1},
        {title: "축구", value: 2},
        {title: "야구", value: 3},
        {title: "테니스", value: 4},
        {title: "배드민턴", value: 5},
        {title: "볼링", value: 6},
        {title: "마라톤", value: 7},
        {title: "걷기", value: 8},
      ]
    }, function(err, data){
      if(err) reject(false);

      if(data) resolve(true);
    });
  });

  Promise.all([promise1, promise2, promise3]).then(function (values) {
    res.json({"initCategories" : true});
  }, function (error) {
    res.json({"initCategories" : false});
  });

});

router.get('/initCategories', function (req, res, next) {
  req.db.categories.find({}, function(err, data) {
    res.json(data);
  });
});

router.post('/addMainCategory', function (req, res, next) {
  req.db.categories.findOne({category: "mainCategory"}, function(err, data) {
    if(err) res.json({"newMainCategory" : false});

    var count = 0;
    var index = 0;

    if(data.list.length > 0){
      for(var i=0; i<data.list.length; i++){
        if(count < data.list[i].value) {
          count = data.list[i].value;
          index = i;
        }
      }
    }
    count++;

    req.db.categories.update({category: "mainCategory"}, {
      $push: {
        list: {
          title: req.body.newMainCategory,
          value: count,
          sub: "subCategory"+count
        }
      }
    }, function(err2, data2) {
      if(err2) console.log(err2);
      if(data2) {
        req.db.categories.insert({
          category: "subCategory"+count,
          list: []
        }, function (err3, data3) {
          if(err3) res.json({"newMainCategory": false});
          if(data3) res.json({"newMainCategory": true});
        });
      }
    });
  });
});

router.post('/addSubCategory', function (req, res, next) {
  req.db.categories.findOne({category: req.body.category}, function (err, data){
    if(err) res.json({"newSubCategory" : false});

    var count = 0;
    var index = 0;

    if(data.list.length > 0){
      for(var i=0; i<data.list.length; i++){
        if(count < data.list[i].value) {
          count = data.list[i].value;
          index = i;
        }
      }
    }
    count++;

    req.db.categories.update({category: req.body.category}, {
      $push: {
        list: {
          title: req.body.item,
          value: count
        }
      }
    }, function (err2, data2){
      if(err2) res.json({"newSubCategory" : false});
      if(data2) res.json({"newSubCategory" : true});
    });
  });
});

router.post('/removeMainCategory', function (req, res, next){
  req.db.categories.findOne({category: "mainCategory"}, function(err, data) {
    if(err) res.json({"removeMainCategory" : false});

    var mainCategory = data;
    for(var i=0; i<mainCategory.list.length; i++){
      if(mainCategory.list[i].value == req.body.value){
        req.db.categories.update({category: "mainCategory"}, {
          $pull: {
            list: mainCategory.list[i]
          }
        }, function(err2, data2) {
          if(err2) res.json({"removeMainCategory" : false});
          if(data2) {
            req.db.categories.remove({category: req.body.sub}, function (err3, data3) {
              if(err3) res.json({"removeMainCategory" : false});
              if(data3) res.json({"removeMainCategory" : true});
            });
          }
        });
      }
    }
  });
});

router.post('/removeSubCategory', function (req, res, next) {
  req.db.categories.findOne({category: req.body.mainCategory.sub}, function(err, data) {
    if(err) res.json({"removeSubCategory" : false});

    var subCategory = data;
    for(var i=0; i<subCategory.list.length; i++){
      if(subCategory.list[i].title == req.body.subCategoryTitle){
        req.db.categories.update({category: req.body.mainCategory.sub}, {
          $pull: {
            list: subCategory.list[i]
          }
        }, function (err2, data2) {
          if(err2) res.json({"removeSubCategory" : false});
          if(data2) res.json({"removeSubCategory" : true});
        });
      }
    }
  });
});

router.post('/registNewEvent', function (req, res, next) {
  var thumbNailImg = req.body.imgThumbSrc;
  var seriseImg = req.body.imgSeriesSrc;

  var timeStemp = Date.now();

  req.body.imgThumbSrc = [];
  req.body.imgSeriesSrc = [];
  req.body.registDate = new Date();
  req.body.visits = 0;
  req.body.favorits = 0;
  req.body.calSaved = 0;
  req.body.isActive = false;
  req.body.isApproved = false;
  req.body.isRejected = false;
  req.body.isExpired = false;
  req.body.notificationSent = false;

  if(thumbNailImg[0]){
    var fileType1 = thumbNailImg[0].split(',')[0];
    var fileData1 = thumbNailImg[0].split(',')[1];
  }


  req.db.events.insert(req.body, function (err, data) {
    if(err) res.json({"registNewEvent" : false});

    var titleStr = "";
    for(var i=0; i<req.body.title.split(' ').length; i++){
      titleStr += "_" + req.body.title.split(' ')[i];
    }
    var imgPath = "./public/dbImg/events/" + timeStemp + titleStr;

    // data._id
    var thumbPromise = new Promise(function (resolve, reject) {
      if(fileType1.indexOf('image/png') > 0) {
        var imgFileName = "thumb" + titleStr + "_" + i + "_" + timeStemp;
        req.base64Img.img(thumbNailImg[0], imgPath, imgFileName, function (imgErr, filePath){
          if(imgErr) reject("thumbNailImg");

          filePath = filePath.replace("public/", "");
          req.db.events.update({_id: req.db.ObjectId(data._id)}, {
            $push: {
              imgThumbSrc: {
                src: filePath
              }
            }
          }, function (err2, data2) {
            if(err2) reject("thumbNailImg");
          });
        });
        resolve(true);
      } else if(fileType1.indexOf('image/svg+xml') > 0) {
        fs.mkdir(imgPath, function(mkErr) {
          if(mkErr) reject("thumbNailImg");

          fs.writeFile(imgPath+'/thumb.svg', req.base64Svg.decode(fileData1), 'utf8', function(fileErr) {
            if (fileErr) reject("thumbNailImg");

            var filePath = imgPath+'/thumb.svg';
            filePath = filePath.replace("./public/", "");
            req.db.events.update({_id: req.db.ObjectId(data._id)}, {
              $push: {
                imgThumbSrc: {
                  src: filePath
                }
              }
            }, function (err2, data2) {
              if(err2) reject("thumbNailImg");

              resolve(true);
            });
          });
        });
      }
    });

    var serisePromise = new Promise(function (resolve, reject) {
      for(var i=0; i<seriseImg.length; i++){
        var imgFileName = "series" + titleStr + "_" + i + "_" + timeStemp;
        req.base64Img.img(seriseImg[i], imgPath, imgFileName, function (imgErr, filePath){
          if(imgErr) reject("serisePromise");

          filePath = filePath.replace("public/", "");
          req.db.events.update({_id: req.db.ObjectId(data._id)}, {
            $push: {
              imgSeriesSrc: {
                src: filePath
              }
            }
          }, function (err3, data3) {
            if(err3) reject("serisePromise");
          });
        });
      };
      resolve(true);
    });

    Promise.all([thumbPromise, serisePromise]).then(function (values) {
      res.json({"registNewEvent" : true});
    }, function (error) {
      console.log(error);
      res.json({"registNewEvent" : false, "err": error});
    });
  });
});

router.get('/allEventsList', function (req, res, next) {
  req.db.events.find({}, function(err, data) {
    if(err) res.json({"getAllEventsList": false});

    res.json({"getAllEventsList": true, "list": data});
  });
});

router.get('/allPendingEventsList', function (req, res, next) {
  req.db.events.find(
    {"isApproved": false, "isExpired": false, "isRejected" : false, "isActive": false},
    function (err, data){
      if(err) res.json({"getAllPendingEventsList": false});

      res.json({"getAllPendingEventsList": true, "list": data});
  });
});

router.post('/activateEvent', function (req, res, next) {
  req.db.events.update({_id: req.db.ObjectId(req.body._id)}, {
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
  req.db.events.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRejected" : true,
    }
  }, function (err, data) {
    if(err) res.json({"rejectEvent": false});

    res.json({"rejectEvent": true});
  });
});

router.get('/allActiveEventsList', function (req, res, next) {
  req.db.events.find({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false},
  function(err, data) {
    if(err) res.json({"allActiveEventsList" : false});

    res.json({"allActiveEventsList" : true, "list": data});
  });
});

router.post('/deActivateEvent', function (req, res, next) {
  req.db.events.update({_id: req.db.ObjectId(req.body._id)}, {
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
  req.db.events.update({_id: req.db.ObjectId(req.body._id)}, {
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
  req.db.events.find({"isExpired": true}, function (err, data){
    if(err) res.json({"getAllExpiredEventsList" : false});

    res.json({"getAllExpiredEventsList" : true, "list": data});
  });
});

router.post('/unExpireEvent', function (req, res, next) {
  req.db.events.update({_id: req.db.ObjectId(req.body._id)}, {
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
  req.db.events.find({"isRejected" : true}, function (err, data) {
    if(err) res.json({"getAllRejectedEventsList" : false});

    res.json({"getAllRejectedEventsList" : true, "list": data});
  });
});

router.post('/unRejectEvent', function (req, res, next) {
  req.db.events.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRejected" : false
    }
  }, function(err, data) {
    if(err) res.json({"doUnReject": false});

    res.json({"doUnReject": true});
  });
});

router.post('/deleteEvent', function (req, res, next) {
  req.db.events.findOne({_id: req.db.ObjectId(req.body._id)}, function(err, data){
    if(err) res.json({"doDelete": false});

    if(data.imgThumbSrc[0]) {
      var temp1 = data.imgThumbSrc[0].src.split('/');
      temp1.pop();
      var dirPath = 'public/' + temp1.join('/');

      fs.stat('./public/'+data.imgThumbSrc[0].src, function (statErr, stats) {
        if(statErr) {
          req.db.events.remove({_id: req.db.ObjectId(req.body._id)}, function (err2, data2){
            if(err2) res.json({"doDelete": false});

            res.json({"doDelete": true});
          });
        } else {
          fs.unlinkSync('public/'+data.imgThumbSrc[0].src);
          for(var i=0; i<data.imgSeriesSrc.length; i++){
            fs.unlinkSync('public/'+data.imgSeriesSrc[i].src);
          }
          fs.rmdirSync(dirPath);

          req.db.events.remove({_id: req.db.ObjectId(req.body._id)}, function (err2, data2){
            if(err2) res.json({"doDelete": false});

            res.json({"doDelete": true});
          });
        }
      })
    } else {
      req.db.events.remove({_id: req.db.ObjectId(req.body._id)}, function (err2, data2){
        if(err2) res.json({"doDelete": false});

        res.json({"doDelete": true});
      });
    }
  });
});

router.get('/eventStatusCount', function (req, res, next) {
  var activatedPromise = new Promise(function (resolve, reject) {
    req.db.events.count({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false}, function (err, data) {
      if (err) reject({"activated": err});

      resolve({"activated": data});
    });
  });

  var pendingPromise = new Promise(function (resolve, reject) {
    req.db.events.count({"isApproved": false, "isActive": false, "isExpired": false, "isRejected" : false},
    function (err, data) {
      if (err) reject({"pending": err});

      resolve({"pending": data});
    });
  });

  var rejectedPromise = new Promise(function (resolve, reject) {
    req.db.events.count({"isRejected": true}, function (err, data) {
      if (err) reject({"rejected": err});

      resolve({"rejected": data});
    });
  });

  var expiredPromise = new Promise(function (resolve, reject) {
    req.db.events.count({"isExpired": true}, function (err, data) {
      if (err) reject({"expired": err});

      resolve({"expired": data});
    });
  });

  var allEventPromise = new Promise(function (resolve, reject) {
    req.db.events.count({}, function(err, data) {
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


router.post('/checkExpiredEvents', function (req, res, next) {
  req.db.events.find({"isActive": true, "isApproved": true}, function(err, data) {
    if(err) res.json({"checkExpired": false});

    var tempDate = new Date();
    var today = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());

    var checkExpiredPromise = new Promise(function(resolve, reject) {
      for(var i=0; i<data.length; i++){
        var eventDate = new Date(data[i].eventDate.endD.year, data[i].eventDate.endD.month-1, data[i].eventDate.endD.date);
        if (eventDate-today < 0) {
          req.db.events.update({_id: req.db.ObjectId(data[i]._id)}, {
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
