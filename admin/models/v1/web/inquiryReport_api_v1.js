/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/wr/api/v1/inquiryReport
*/

const express   = require('express');
const router    = express.Router();
const fs        = require('fs');

router.get('/', function (req, res, next) {

});

router.get('/allInquiriesReport', function (req, res, next) {
  req.db.reportInquiry.find({}, function (err, data) {
    if(err) res.json({"allInquiriesReport": false});

    res.json({"allInquiriesReport": true, "list": data});
  });
});

router.get('/newInquiriesReport', function (req, res, next) {
  req.db.reportInquiry.find({"isExamed": false, "isRegistered": false, "isRejected": false}, function (err, data) {
    if(err) res.json({"newInquiriesReport": false});

    res.json({"newInquiriesReport": true, "list": data});
  });
});

router.get('/examedInquiriesReport', function (req, res, next) {
  req.db.reportInquiry.find({"isExamed": true, "isRegistered": false, "isRejected": false}, function (err, data) {
    if(err) res.json({"examedInquiriesReport": false});

    res.json({"examedInquiriesReport": true, "list": data});
  });
});

router.get('/registeredInquiriesReport', function (req, res, next) {
  req.db.reportInquiry.find({"isExamed": true, "isRegistered": true, "isRejected": false}, function (err, data) {
    if(err) res.json({"registeredInquiriesReport": false});

    res.json({"registeredInquiriesReport": true, "list": data});
  });
});

router.get('/inquiryReportStatusCount', function (req, res, next) {
  var newInquiriesPromise = new Promise (function (resolve, reject) {
    req.db.reportInquiry.count({"isExamed": false, "isRegistered": false, "isRejected": false}, function (err, data) {
      if(err) reject(true);

      resolve({"newInquiries" : data});
    });
  });

  var examedInquiriesPromise = new Promise (function (resolve, reject) {
    req.db.reportInquiry.count({"isExamed": true, "isRegistered": false, "isRejected": false}, function (err, data) {
      if(err) reject(true);

      resolve({"examedInquiries" : data});
    });
  });

  var registeredInquiriesPromise = new Promise (function (resolve, reject) {
    req.db.reportInquiry.count({"isExamed": true, "isRegistered": true, "isRejected": false}, function (err, data) {
      if(err) reject(true);

      resolve({"registeredInquiries" : data});
    });
  });

  var allInquiriesPromise = new Promise (function (resolve, reject) {
    req.db.reportInquiry.count({}, function (err, data) {
      if(err) reject(true);

      resolve({"allInquiries" : data});
    });
  });

  Promise.all([newInquiriesPromise, examedInquiriesPromise, registeredInquiriesPromise, allInquiriesPromise]).then(function (values) {
    res.json({"inquiryReportStatusCount" : true, "values": values});
  }, function (error){
    res.json({"inquiryReportStatusCount" : false, "err": error});
  });
});

router.post('/examInquiryReport', function (req, res, next) {
  req.db.reportInquiry.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isExamed" : true
    }
  }, function (err, data) {
    if(err) res.json({"examInquiryReport" : false});

    res.json({"examInquiryReport" : true});
  });
});

router.post('/registInquiryReport', function (req, res, next) {
  req.db.reportInquiry.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRegistered" : true
    }
  }, function (err, data) {
    if(err) res.json({"registInquiryReport" : false});

    res.json({"registInquiryReport" : true});
  });
});

router.post('/unRegistInquiryReport', function (req, res, next) {
  req.db.reportInquiry.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRegistered" : false
    }
  }, function (err, data) {
    if(err) res.json({"unRegistInquiryReport" : false});

    res.json({"unRegistInquiryReport" : true});
  });
});

router.post('/rejectInquiryReport', function (req, res, next) {
  req.db.reportInquiry.update({_id: req.db.ObjectId(req.body._id)}, {
    $set: {
      "isRejected" : true
    }
  }, function (err, data) {
    if(err) res.json({"rejectInquiryReport" : false});

    res.json({"rejectInquiryReport" : true});
  });
})

router.post('/deleteInquiryReport', function (req, res, next) {
  req.db.reportInquiry.find({_id: req.db.ObjectId(req.body._id)}, function (err, data) {
    if (err) res.json({"deleteInquiryReport" : false});

    if(data[0].img[0]) {
      var temp1 = data[0].img[0].src.split('/');
      temp1.pop();
      var dirPath = 'public/' + temp1.join('/');

      for(var i=0; i<data[0].img.length; i++){
        fs.unlinkSync('public/'+data[0].img[i].src);
      }
      fs.rmdirSync(dirPath);

      req.db.reportInquiry.remove({_id: req.db.ObjectId(req.body._id)}, function (err2, data2){
        if(err2) res.json({"deleteInquiryReport" : false});

        res.json({"deleteInquiryReport" : true});
      });
    } else {
      req.db.reportInquiry.remove({_id: req.db.ObjectId(req.body._id)}, function (err2, data2){
        if(err2) res.json({"deleteInquiryReport" : false});

        res.json({"deleteInquiryReport" : true});
      });
    }
  });
});

module.exports = router;
