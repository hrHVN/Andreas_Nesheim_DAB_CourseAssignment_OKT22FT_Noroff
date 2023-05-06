var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local');
const { User, Password, Role } = require('../modules/sequelize');


/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.user) res.render('./index', { title: 'DAB - Adopt Animal', user: null });
  res.render('index', { title: 'DAB - Adopt Animal', user: req.user });
});

router.get('/api', async (req, res) => {
  let data = {};
  res.json(data)
})

/**
 * PASSPORTJS
 */

passport.use(new LocalStrategy(async function verify(username, password, cb) {
  let _user = await User.findOne({ where: { username: username } }).then(data => { return data; });
  let _role = await Role.findOne({ where: { id: _user.roleId }, attributes: ['name'] }).then(data => { return data; });
  let _password = await Password.findOne({ where: { userId: _user.id }, attributes: ['password'] }).then(data => { return data; });

  const user = {
    id: _user.id,
    name: _user.name,
    username: _user.username,
    password: _password.password,
    role: _role.name
  };

  if (user.password == password) {
    return cb(null, user);
  }
  return cb(null, null)
}));

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.name, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

//  Login page
router.get('/login', function (req, res) {
  res.render('login', { title: 'Express', user: req.user });
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// Signup Page
router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Express', user: req.user });
});

router.post('/signup', function (req, res, next) {
  Role.findOne({ where: { name: 'user' } })
    .then((r) => {
      User.create({ name: `${req.body.firstname} ${req.body.lastname}`, username: req.body.username, roleId: r.id })
        .then(async (u) => {
          Password.create({ password: req.body.password, userId: u.id })
        })
        .catch(err => {
          res.json(err.errors)
        });
      res.redirect('/login');
    });
});

// Logout Page
router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;

