/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/app/api/v1/wrEvents;
*/

var express             = require('express');
var router              = express.Router();

var serverIp            = require('../../../config/serverConfig');

router.get('/', function (req, res, next) {

});

router.get('/wrEventsList', function (req, res, next) {
  req.db.wrEvents.find({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false}, function (err, data) {
    if(err) res.json({"wrEventsList": false});

    for(var i=0; i<data.length; i++){
      data[i].imgThumbSrc[0].src = serverIp.getServerIp() + data[i].imgThumbSrc[0].src;
    }

    res.json({"wrEventsList": true, "list": data});
  });
});




module.exports = router;
