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

router.post('/visits', function (req, res, next) {
  req.db.wrEvents.find({_id: req.db.ObjectId(req.body._id)}, function (err, data) {
    if(err) res.json({"visit": false});

    req.db.wrEvents.update({_id: req.db.ObjectId(req.body._id)}, {
      $inc: {
        visits: 1
      }
    }, function (err2, data2) {
      if(err2)res.json({"visit": false});

      res.json({"visit": true});
    });
  });
});



module.exports = router;
