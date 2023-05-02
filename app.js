var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mySql = require('mysql');

var indexRouter = require('./routes/index');
var animalsRouter = require('./routes/animals');
var speciesRouter = require('./routes/species');
var temperamentRouter = require('./routes/temperament');

require('dotenv').config();
var app = express();

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

/*
   MySql db settup check
*/

let connection = mySql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
  if (err) return console.error(err);

  connection.query(`USE ${process.env.DB_DB}`, (err, results) => {
    // Create DB if not existing
    if (err && err.code == 'ER_BAD_DB_ERROR') {
      connection.query(`CREATE DATABASE ${process.env.DB_DB}`, (err, results, fields) => {
        if (err) {
          return console.error(err);
        }
        return console.log('Databse re-created: ', results);
      })
    }
  })

  console.log('conneted to DB: ', process.env.DB_DB)
});


// GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password';
// GRANT ALL ON *.* TO 'root'@'%' IDENTIFIED BY 'password';
// CREATE USER 'developer'@'%' IDENTIFIED BY 'D3v3lope3r_ubuntu';
// GRANT ALL ON *.* TO "developer"@"%";

// CREATE DATABASE 'adoptiondb';
// SELECT host, user FROM mysql.user;
// show DATABASES;
// ALTER USER 'developer'@'%' IDENTIFIED WITH mysql_native_password BY 'D3v3lope3r_ubuntu';