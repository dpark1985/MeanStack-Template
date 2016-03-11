var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var everyauth = require('everyauth');
var mongojs = require('mongojs');
var crypto = require('crypto');
var redis = require('redis');
var expressSession = require('express-session');
var RedisStore = require('connect-redis')(expressSession);


/*****************    Route Configuration   ***************************/
var views = require('./routes/customView')
var models = require('./routes/customModel');
/**********************************************************************/


/*****************    EveryAuth COnfiguration   ***********************/
var customAuth = require('./routes/utilities/auth'); 
/**********************************************************************/


/*****************    SessionStore Redis   ****************************/
var client = redis.createClient();
process.on('exit', function(){ client.quit(); });
var options = { client: client }
var sessionStore = new RedisStore(options);
/**********************************************************************/


/**********************************************************************
*   MONGODB                                                           *
*     baseURL = server address / database name (example.com/mydb)     *
*     collections = list of collections                               *
*                                                                     *
*   Database server must be located outside of the hosting server for *
*   the security reason. Otherwise, database server may have great    *
*   chance being exposed to outworld.                                 *
**********************************************************************/
var baseURL = 'localhost/testing';
var collections = ['users'];
var db = mongojs(baseURL, collections);
/**********************************************************************/


var app = express();


/*****************    EveryAuth Configuration   ***********************/
customAuth.active(everyauth, db, crypto);
/**********************************************************************/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'meanstack',
    name: 'meanstack',
    resave: true,
    saveUninitialized: true
}));


/*****************    EveryAuth Middleware   **************************/
app.use(everyauth.middleware(app));
/**********************************************************************/

app.use(express.static(path.join(__dirname, 'public')));

/*****************    Database     ************************************/
app.use(function (req, res, next) {
    req.db = db;
    next();
});
/**********************************************************************/




app.use('/', views);
app.use('/model', models);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
