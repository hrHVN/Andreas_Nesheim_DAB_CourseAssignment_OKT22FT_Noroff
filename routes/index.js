var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local');
const { User, Password, Role } = require('../modules/sequelize');

/**
 * PASSPORTJS
 */

passport.use(new LocalStrategy(function verify(username, password, cb) {
  User.findAll({
    where: { name: username },
    includes: { model: Password, where: { password: password } }
  })
    .then(user => {
      if (user.password == password) return cb(null, user);
    })
    .catch(err => {
      if (err) return cb(null, false, { message: 'Incorrect username or password.' });
    });
}));

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', user: user || null });
});

/*
 *  Loggin page
 */

router.get('/login', function (req, res, next) {
  // User.findAll().then( data => res.json(data)).catch(err => res.redirect('/'));
  res.render('login', { title: 'Express', user: user || null });
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureMessage: true,
  failureRedirect: '/login'
}));

/*
 * Signup Page
 */

router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Express', user: user || null });
});

/*
 * Logout Page
 */

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;

