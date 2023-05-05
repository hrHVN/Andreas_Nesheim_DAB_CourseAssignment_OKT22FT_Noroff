var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
    if (req.body.user.role != 'admin') {
        res.redirect('/login');
    }

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
    res.render("temperament", { user: null, temperament: temperament })
})

router.post('/update', async function (req, res, next) {
    if (req.body.user.role != 'admin') {
        res.redirect('/login');
    }
    res.render("index", { user: null })
})

module.exports = router;