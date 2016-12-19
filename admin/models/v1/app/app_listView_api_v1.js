/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/app/api/v1/list;
*/

var express             = require('express');
var router              = express.Router();

var serverIp            = require('../../../config/serverConfig');

router.get('/', function (req, res, next) {

});


router.post('/listViewEventsData', function (req, res, next) {
  if(req.body.category == 'all'){
    req.db.events.find({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false}).sort({
      registDate: -1
    }, function(err, data) {
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
  } else {
    req.db.events.find({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false, "category.value": req.body.category}).sort({
      registDate: -1
    }, function(err, data) {
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
  }
});

router.post('/categoryEventsData', function (req, res, next) {
  req.db.events.find({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false, "category.value": req.body.main, "subCategory.value": req.body.sub}).sort({
    registDate: -1
  }, function (err, data) {
    if(err) res.json({"allActiveEventsList" : false});

    for(var i=0; i<data.length; i++){
      data[i].imgThumbSrc[0].src = serverIp.getServerIp() + data[i].imgThumbSrc[0].src;
    }

    for(var j=0; j<data.length; j++){
      for(var k=0; k<data[j].imgSeriesSrc.length; k++){
        data[j].imgSeriesSrc[k].src = serverIp.getServerIp() + data[j].imgSeriesSrc[k].src;
      }
    }

    res.json({"allActiveEventsList" : true, "list": data});
  });
});

router.post('/serchEventsData', function (req, res, next) {
  console.log(req.body.keyword);
  req.db.events.find({"isApproved": true, "isActive": true, "isExpired" : false, "isRejected": false, "title": {$regex: ".*"+req.body.keyword+".*"}}, function (err, data){

    for(var i=0; i<data.length; i++){
      data[i].imgThumbSrc[0].src = serverIp.getServerIp() + data[i].imgThumbSrc[0].src;
    }

    for(var j=0; j<data.length; j++){
      for(var k=0; k<data[j].imgSeriesSrc.length; k++){
        data[j].imgSeriesSrc[k].src = serverIp.getServerIp() + data[j].imgSeriesSrc[k].src;
      }
    }

    res.json({"list": data});
  });
});

module.exports = router;
