/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/app/api/v1/;
*/

var express             = require('express');
var router              = express.Router();
var cors                = require('cors');

router.get('/', function (req, res, next) {

});

router.post('/reportEvents', function (req, res, next) {
  console.log(req.body);
  console.log(req.body.options.img[0]);
  var eventImages = req.body.options.img;
  var timeStemp = Date.now();

  req.body.options.img = [];
  req.body.registDate = new Date();

  req.db.reportEvents.insert(req.body, function (err, data) {
    if(err) res.json({'reportEvents': false});

    var titleStr = "";

    for(var i=0; i<req.body.title.split(' ').length; i++){
      titleStr += "_" + req.body.title.split(' ')[i];
    }

    var imgPath = "./public/dbImg/reportEvents/" + timeStemp + titleStr;

    var eventImagesPromise = new Promise(function (resolve, reject) {
      for(var i=0; i<eventImages.length; i++){
        var imgFileName = "reportEvents" + titleStr + "_" + i + "_" + timeStemp;

        if(eventImages[i].src){
          req.base64Img.img(eventImages[i].src, imgPath, imgFileName, function (imgErr, filePath) {
            if(imgErr) reject(imgErr);

            req.db.reportEvents.update({_id: req.db.ObjectId(data._id)}, {
              $push: {
                img: {
                  src: filePath
                }
              }
            }, function (err2, data2) {
              if(err2) reject(err2);
            });
          });
        }
      }
      resolve(true);
    });

    eventImagesPromise.then(function (values) {
      res.json({'reportEvents': true});
    }, function (error) {
      res.json({'reportEvents': false, "error": error});
    });
  });
}),



module.exports = router;
