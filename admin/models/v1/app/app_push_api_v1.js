/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/app/api/v1/push;
*/

var express             = require('express');
var router              = express.Router();

var serverIp            = require('../../../config/serverConfig');

router.get('/', function (req, res, next) {

});

router.post('/deviceToken', function (req, res, next) {
  req.db.devices.find({"deviceToken" : req.body.deviceToken}, function (err, data) {
    if(err) res.json({'deviceToken': false});

    if(data.length == 0){
      req.db.devices.insert({'deviceToken': req.body.deviceToken}, function (err2, data2) {
        if(err2) res.json({'deviceToken': false});

        res.json({'deviceToken': true, 'deviceTokenExist': false});
      });
    } else {
      res.json({'deviceToken': true, 'deviceTokenExist': true});
    }
  });
});





module.exports = router;
