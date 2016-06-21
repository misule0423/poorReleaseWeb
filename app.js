var express = require('express');
var app = express();

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url); // connect to our database

// set up our express application
app.use(logger('dev'));
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false })); // get information from html forms
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // set up jade for templating
//app.set('view engine', 'ejs'); // set up jade for templating

//app.use(express.static(path.join(__dirname, 'views')));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'config')));
//app.use(express.static(path.join(__dirname, 'auth')));
//app.use(express.static(path.join(__dirname, 'models')));

// required for passport
app.use(session({ secret: 'roopKoreaMinseok' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// required for routes
//var routes = require('./routes/index');
//var users = require('./routes/users');
//app.use('/', routes);
//app.use('/users', users);



require('./public/javascripts/passport')(passport);
require('./routes/index')(app, passport); // load our routes and pass in our app and fully configured passport

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


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
