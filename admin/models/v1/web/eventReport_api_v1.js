/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/wr/api/v1/eventReport/
*/

const express   = require('express');
const router    = express.Router();
const fs        = require('fs');

router.get('/', function (req, res, next) {

});

router.get('/newEventsReport', function (req, res, next) {
  req.db.reportEvents.find({"isExamed": false, "isRegistered": false, "isRejected": false}, function (err, data) {
    if(err) res.json({"newEventsReport" : false});

    res.json({"newEventsReport" : true, "list" : data});
  });
});

router.get('/allEventsReport', function (req, res, next) {
  req.db.reportEvents.find({}, function (err, data) {
    if(err) res.json({"allEventsReport" : false});

    res.json({"allEventsReport" : true, "list" : data});
  });
});

router.get('/examedEventsReport', function (req, res, next) {
  req.db.reportEvents.find({"isExamed": true, "isRegistered": false, "isRejected": false}, function (err, data) {
    if(err) res.json({"examedEventsReport" : false});

    res.json({"examedEventsReport" : true, "list" : data});
  });
});

router.get('/registeredEventsReport', function (req, res, next) {
  req.db.reportEvents.find({"isExamed": true, "isRegistered": true, "isRejected": false}, function (err, data) {
    if(err) res.json({"registeredEventsReport" : false});

    res.json({"registeredEventsReport" : true, "list" : data});
  });
});

router.get('/rejectedEventsReport', function (req, res, next) {
  req.db.reportEvents.find({"isExamed": true, "isRegistered": false, "isRejected": true}, function (err, data) {
    if(err) res.json({"rejectedEventsReport" : false});

    res.json({"rejectedEventsReport" : true, "list" : data});
  });
});

router.get('/eventReportStatusCount', function (req, res, next) {
  var newEventsReportPromise = new Promise (function (resolve, reject) {
    req.db.reportEvents.count({"isExamed": false, "isRegistered": false, "isRejected": false}, function(err, data) {
      if (err) reject(true);

      resolve({"newEventsReport" : data});
    });
  });

  var examedEventsReportPromise = new Promise (function (resolve, reject) {
    req.db.reportEvents.count({"isExamed": true, "isRegistered": false, "isRejected": false}, function(err, data) {
      if (err) reject(true);

      resolve({"examedEventsReport" : data});
    });
  });

  var registeredEventsReportPromise = new Promise (function (resolve, reject) {
    req.db.reportEvents.count({"isExamed": true, "isRegistered": true, "isRejected": false}, function(err, data) {
      if (err) reject(true);

      resolve({"registeredEventsReport" : data});
    });
  });

  var rejectedEventsReportPromise = new Promise (function (resolve, reject) {
    req.db.reportEvents.count({"isExamed": true, "isRegistered": false, "isRejected": true}, function(err, data) {
      if (err) reject(true);

      resolve({"rejectedEventsReport" : data});
    });
  });

  var allEventsReportPromise = new Promise (function (resolve, reject) {
    req.db.reportEvents.count({}, function(err, data) {
      if (err) reject(true);

      resolve({"allEventsReport" : data});
    });
  });

  Promise.all([newEventsReportPromise, examedEventsReportPromise, registeredEventsReportPromise, rejectedEventsReportPromise, allEventsReportPromise]).then(function (values) {
    res.json({"eventReportStatusCount" : true, "values": values});
  }, function (error) {
    res.json({"eventReportStatusCount" : false, "err": error});
  });
});

router.post('/examEventReport', function (req, res, next) {
  req.db.reportEvents.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isExamed" : true
    }
  }, function (err, data) {
    if (err) res.json({"examEventReport" : false});

    res.json({"examEventReport" : true});
  });
});

router.post('/registEventReport', function (req, res, next) {
  req.db.reportEvents.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRegistered" : true
    }
  }, function (err, data) {
    if (err) res.json({"registEventReport" : false});

    res.json({"registEventReport" : true});
  });
});

router.post('/unRegistEventReport', function (req, res, next) {
  req.db.reportEvents.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRegistered" : false
    }
  }, function (err, data) {
    if (err) res.json({"unRegistEventReport" : false});

    res.json({"unRegistEventReport" : true});
  });
});

router.post('/rejectEventReport', function (req, res, next) {
  req.db.reportEvents.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRejected" : true
    }
  }, function (err, data) {
    if (err) res.json({"rejectEventReport" : false});

    res.json({"rejectEventReport" : true});
  });
});

router.post('/unRejectEventReport', function (req, res, next) {
  req.db.reportEvents.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRejected" : false
    }
  }, function (err, data) {
    if (err) res.json({"unRejectEventReport" : false});

    res.json({"unRejectEventReport" : true});
  });
});

router.post('/deleteEventReport', function (req, res, next) {
  req.db.reportEvents.find({_id: req.db.ObjectId(req.body._id)}, function (err, data) {
    if (err) res.json({"deleteEventReport" : false});

    if(data[0].img[0]) {
      var temp1 = data[0].img[0].src.split('/');
      temp1.pop();
      var dirPath = 'public/' + temp1.join('/');

      for(var i=0; i<data[0].img.length; i++){
        fs.unlinkSync('public/'+data[0].img[i].src);
      }
      fs.rmdirSync(dirPath);

      req.db.reportEvents.remove({_id: req.db.ObjectId(req.body._id)}, function (err2, data2){
        if(err2) res.json({"deleteEventReport" : false});

        res.json({"deleteEventReport" : true});
      });
    } else {
      req.db.reportEvents.remove({_id: req.db.ObjectId(req.body._id)}, function (err2, data2){
        if(err2) res.json({"deleteEventReport" : false});

        res.json({"deleteEventReport" : true});
      });
    }
  });
});

module.exports = router;
