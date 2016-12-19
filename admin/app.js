// import npm modules
var express                   = require('express');
var socket_io                 = require('socket.io');
var path                      = require('path');
var favicon                   = require('serve-favicon');
var logger                    = require('morgan');
var cookieParser              = require('cookie-parser');
var bodyParser                = require('body-parser');
var everyauth                 = require('everyauth');
var mongojs                   = require('mongojs');
var expressSession            = require('express-session');
var crypto                    = require('crypto');
var base64Img                 = require('base64-img');
var cors                      = require('cors');
var base64Svg                 = require('js-base64').Base64;

// import Routes
var views                     = require('./routes/views');

// import Admin REST API modules
var wr_api_v1                 = require('./models/v1/web/wr_api_v1');
var overView_api_v1           = require('./models/v1/web/overView_api_v1');
var admin_api_v1              = require('./models/v1/web/admin_api_v1');
var events_api_v1             = require('./models/v1/web/events_api_v1');
var ads_api_v1                = require('./models/v1/web/ads_api_v1');
var notis_api_v1              = require('./models/v1/web/notis_api_v1');
var eventReport_api_v1        = require('./models/v1/web/eventReport_api_v1');
var inquiryReport_api_v1      = require('./models/v1/web/inquiryReport_api_v1');
var wrEvents_api_v1           = require('./models/v1/web/wrEvents_api_v1');
var pushNotification_api_v1   = require('./models/v1/web/pushNotification_api_v1');
var appTitle_api_v1           = require('./models/v1/web/appTitle_api_v1');

// import App REST API modules
var app_api_v1                = require('./models/v1/app/app_api_v1');
var app_details_api_v1        = require('./models/v1/app/app_details_api_v1');
var app_ads_api_v1            = require('./models/v1/app/app_ads_api_v1');
var app_calendar_api_v1       = require('./models/v1/app/app_calendarView_api_v1');
var app_list_api_v1           = require('./models/v1/app/app_listView_api_v1');
var app_map_api_v1            = require('./models/v1/app/app_mapView_api_v1');
var app_menus_api_v1          = require('./models/v1/app/app_menuViews_api_v1');
var app_wrEvents_api_v1       = require('./models/v1/app/app_wrEvents_api_v1');
var app_push_api_v1           = require('./models/v1/app/app_push_api_v1');


// import Database Config
var dbConfig              = require('./config/dbConfig');

// import Authentification controller
var customAuth            = require('./controllers/auth');

// MongoDB setup
var connection            = dbConfig().connection();
var collections           = dbConfig().dbCollections();
var db                    = mongojs(connection, collections);

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
app.use(function (req, res, next) {
    req.base64Svg = base64Svg;
    next();
});

app.use('/wr/api/v1',                   wr_api_v1);
app.use('/wr/api/v1/admin',             admin_api_v1);
app.use('/wr/api/v1/overView',          overView_api_v1);
app.use('/wr/api/v1/events',            events_api_v1);
app.use('/wr/api/v1/ads',               ads_api_v1);
app.use('/wr/api/v1/notis',             notis_api_v1);
app.use('/wr/api/v1/eventReport',       eventReport_api_v1);
app.use('/wr/api/v1/inquiryReport',     inquiryReport_api_v1);
app.use('/wr/api/v1/wrEvents',          wrEvents_api_v1);
app.use('/wr/api/v1/pushNotification',  pushNotification_api_v1);
app.use('/wr/api/v1/appTitle',          appTitle_api_v1);

app.use('/app/api/v1',                  app_api_v1);
app.use('/app/api/v1/details',          app_details_api_v1);
app.use('/app/api/v1/ads',              app_ads_api_v1);
app.use('/app/api/v1/calendar',         app_calendar_api_v1);
app.use('/app/api/v1/list',             app_list_api_v1);
app.use('/app/api/v1/map',              app_map_api_v1);
app.use('/app/api/v1/menus',            app_menus_api_v1);
app.use('/app/api/v1/wrEvents',         app_wrEvents_api_v1);
app.use('/app/api/v1/push',             app_push_api_v1);

app.use('/',                            views);



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
