/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/app/api/v1/map;
*/

var express             = require('express');
var router              = express.Router();

var serverIp            = require('../../../config/serverConfig');

router.get('/', function (req, res, next) {

});


router.get('/mapViewEventsData', function (req, res, next) {
  req.db.events.find({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false},
  function(err, data) {
    if(err) res.json({"allActiveEventsList" : false});

    if(data.length > 0){
      for(var i=0; i<data.length; i++){
        data[i].imgThumbSrc[0].src = serverIp.getServerIp() + data[i].imgThumbSrc[0].src;
      }

      for(var j=0; j<data.length; j++){
        for(var k=0; k<data[j].imgSeriesSrc.length; k++){
          data[j].imgSeriesSrc[k].src = serverIp.getServerIp() + data[j].imgSeriesSrc[k].src;
        }
      }
    }


    res.json({"allActiveEventsList" : true, "list": data});
  });
});



module.exports = router;
