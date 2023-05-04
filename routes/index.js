var express = require('express');
var router = express.Router();
const { User, Password, Role } = require('../modules/sequelize');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', user: null });
});

router.get('/login', function (req, res, next) {
  User.findAll({
    include: [ //Role, Password
      // { model: Role, where: { name: 'admin' } }
    ]
  })
    .then(users => {
      res.json(users);
      // res.render('login', { title: 'Express', user });
    })
    .catch(err => console.error(err));
  // res.end()
});

router.post('/signup', function (req, res, next) {
  User.create(req.body)
    .then(user => {
      res.json(user)

      // res.render('signup', { title: 'Express', user: null });
    })
    .catch(err => console.error(err));

});

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;

