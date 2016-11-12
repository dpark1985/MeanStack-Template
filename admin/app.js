// import npm modules
var express             = require('express');
var socket_io           = require('socket.io');
var path                = require('path');
var favicon             = require('serve-favicon');
var logger              = require('morgan');
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var everyauth           = require('everyauth');
var mongojs             = require('mongojs');
var expressSession      = require('express-session');
var crypto              = require('crypto');
var base64Img           = require('base64-img');
var cors                = require('cors');

// import Routes
var views               = require('./routes/views');

// import Admin REST API modules
var wr_api_v1           = require('./models/wr_api_v1');
var overView_api_v1     = require('./models/overView_api_v1');
var admin_api_v1        = require('./models/admin_api_v1');
var events_api_v1       = require('./models/events_api_v1');
var ads_api_v1          = require('./models/ads_api_v1');
var notis_api_v1        = require('./models/notis_api_v1');

// import App REST API modules
var app_api_v1          = require('./models/app_api_v1');

// import Database Config
var dbConfig            = require('./config/dbConfig');

// import Authentification controller
var customAuth          = require('./controllers/auth');

// MongoDB setup
var connection          = dbConfig().connection();
var collections         = dbConfig().dbCollections();
var db                  = mongojs(connection, collections);

// Express
var app = express();

// execute imported custom module
customAuth.active(everyauth, db, crypto);

// view engine setup
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'wonjuRomance',
    name: 'wonjuRomance',
    resave: true,
    saveUninitialized: false
}));
app.use(everyauth.middleware(app));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    req.db = db;
    next();
});
app.use(function (req, res, next) {
    req.base64Img = base64Img;
    next();
});

app.use('/wr/api/v1',             wr_api_v1);
app.use('/wr/api/v1/admin',       admin_api_v1);
app.use('/wr/api/v1/overView',    overView_api_v1);
app.use('/wr/api/v1/events',      events_api_v1);
app.use('/wr/api/v1/ads',         ads_api_v1);
app.use('/wr/api/v1/notis',       notis_api_v1);

app.use('/app/api/v1',            app_api_v1);

app.use('/',                      views);



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
