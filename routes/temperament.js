var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
    if (req.user.role != 'admin') res.redirect('/');

        temperament = [
        {
            Id: 1,
            Name: "Calm"
        },
        {
            Id: 2,
            Name: "Scared"
        }
    ]
    res.render("temperament", { user: req.user, temperament: temperament })
})

router.post('/update', async function (req, res, next) {
    if (req.user.role != 'admin') res.redirect('/');
    
    res.render("index", { user: req.user })
})

module.exports = router;