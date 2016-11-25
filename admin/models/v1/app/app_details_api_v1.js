/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/app/api/v1/details;
*/

var express             = require('express');
var router              = express.Router();

var serverIp            = require('../../../config/serverConfig');

router.get('/', function (req, res, next) {

});

router.post('/visits', function (req, res, next) {
  req.db.events.find({_id: req.db.ObjectId(req.body._id)}, function (err, data) {
    if(err) res.json({"visit": false});

    req.db.events.update({_id: req.db.ObjectId(req.body._id)}, {
      $inc: {
        visits: 1
      }
    }, function (err2, data2) {
      if(err2)res.json({"visit": false});

      res.json({"visit": true});
    });
  });
});

router.post('/addFavorits', function (req, res, next) {
  req.db.events.update({_id: req.db.ObjectId(req.body._id)}, {
    $inc: {
      favorits: 1
    }
  }, function (err2, data2) {
    if(err2)res.json({"favorit": false});

    res.json({"favorit": true});
  });
});

router.post('/removeFavorits', function (req, res, next) {
  req.db.events.update({_id: req.db.ObjectId(req.body._id)}, {
    $inc: {
      favorits: -1
    }
  }, function (err2, data2) {
    if(err2) res.json({"favorit": false});

    res.json({"favorit": true});
  });
});

router.post('/removeAllFavorits', function (req, res, next) {
  for(var i=0; i<req.body.length; i++){
    req.db.events.update({_id: req.db.ObjectId(req.body[i].data._id)}, {
      $inc: {
        favorits: -1
      }
    }, function (err2, data2) {
      if(err2)res.json({"favorit": false});
    });
  }

  res.json({"favorit": true});
});

router.post('/calSaved', function (req, res, next) {
  req.db.events.update({_id: req.db.ObjectId(req.body._id)}, {
    $inc: {
      calSaved: 1
    }
  }, function (err2, data2) {
    if(err2) res.json({"calSaved": false});

    res.json({"calSaved": true});
  })
})

module.exports = router;




module.exports = router;
