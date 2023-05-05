var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
require('dotenv').config();
/*
  Routers
*/
var indexRouter = require('./routes/index');
var animalsRouter = require('./routes/animals');
var speciesRouter = require('./routes/species');
var temperamentRouter = require('./routes/temperament');

var app = express();

// Session
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  }
}));
app.use(passport.authenticate('session'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/animals', animalsRouter);
app.use('/species', speciesRouter);
app.use('/temperament', temperamentRouter);
require('dotenv').config();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;