/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/app/api/v1/;
*/

var express             = require('express');
var router              = express.Router();

var serverIp            = require('../../../config/serverConfig');

router.get('/', function (req, res, next) {

});

router.post('/serverCheck', function (req, res, next) {
  var timeStemp = new Date;
  var today = timeStemp.getFullYear()+'/'+(timeStemp.getMonth()+1)+'/'+timeStemp.getDate();

  req.db.appInfo.findOne({date: today}, function (err, data) {
    if (err) res.json({"serverUp": false});

    if(data) {
      req.db.appInfo.update({_id: req.db.ObjectId(data._id)}, {
        $inc: {
          visits: 1
        },
        $push: {
          log: {timeStemp: timeStemp, platform: req.body.platform, version: req.body.version, appVersion: req.body.appVersion}
        }
      }, function (err2, data2) {
        if(err2) res.json({"serverUp": false});

        res.json({"serverUp": true});
      });
    } else {
      req.db.appInfo.insert({
        date: today,
        visits: 1,
        log: [{timeStemp: timeStemp, platform: req.body.platform, version: req.body.version, appVersion: req.body.appVersion}]
      }, function(err3, data3) {
        if (err3) res.json({"serverUp": false});

        res.json({"serverUp": true});
      });
    }
  });
});

router.get('/checkAppVersion', function (req, res, next) {
  console.log('gooood');
  res.json({"version": 1.0});
});

router.get('/appTitle', function (req, res, next) {
  req.db.titleImg.find({}, function (err, data) {
    for(var i=0; i<data.length; i++){
      data[i].titleImage[0].src = serverIp.getServerIp() + data[i].titleImage[0].src;
    }


    res.json({'list': data});
  });
});




module.exports = router;
