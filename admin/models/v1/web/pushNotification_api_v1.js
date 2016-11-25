/*
  title:    Wonju Romance API V1
  url:      http://www.127.0.0.1:3000/wr/api/v1/pushNotification
*/

const express           = require('express');
const router            = express.Router();
const https             = require('https');

const apiUrl            = "http://175.206.34.229:2016/";
const FCM_TOCKEN        = 'AAAAmok3Qu0:APA91bEzrwaa-T0pXm8kIP86RjirdQ_Sd5bW8tjHZSoXNi12OK96vkg0NAMhRyqrOJez-o0uG5hyb4UQlW3dJH_saehpANEn6ZQpzxel9ZdWne_xl2NO3GpmgBm_oFdVGiN71BJQGZiZKWkDUJX18M5oeyJzA0YjDw';
const SERVER_KEY        = 'AIzaSyAD0yNvn1TVUP9oxkCqS73JI6K_wdzm3fQ';

router.get('/', function (req, res, next) {

});

router.post('/doPush', function (req, res, next) {
  req.db.devices.find({}, function (err, data) {
    if(err) res.json({pushNotification: false});

    req.body.imgThumbSrc[0].src = apiUrl + req.body.imgThumbSrc[0].src;

    for(var k=0; k<req.body.imgSeriesSrc.length; k++){
      req.body.imgSeriesSrc[k].src = apiUrl + req.body.imgSeriesSrc[k].src;
    }

    for(var i=0; i<data.length; i++){
      var message = {
        to: data[i].deviceToken,
        "data": {
          "title": "새로운 행사가 등록되었습니다.",
          "message": req.body.title,
          "eventData": req.body
        }
      };

      message = JSON.stringify(message);

      var options = {
        hostname: 'fcm.googleapis.com',
        path: '/fcm/send',
        method: 'POST',
        headers: {
          'Authorization': 'key='+FCM_TOCKEN,
          'Content-type': 'application/json'
        }
      };

      var fcm_req = https.request(options, (response) => {
        response.on('data', (d) => {
          process.stdout.write(d);
        });
      });

      fcm_req.end(message);

      fcm_req.on('error', (e) => {
        console.error(e);
      });
    }

    res.json({pushNotification: true});
  });
});


module.exports = router;
