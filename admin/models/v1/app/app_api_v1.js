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




module.exports = router;
