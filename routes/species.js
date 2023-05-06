var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
    if (req.user.role != 'admin') res.redirect('/');

    species = [
        {
            Id: 1,
            Name: "Tedy bear hamster"
        },
        {
            Id: 2,
            Name: "Jack-Russel"
        }
    ]
    res.render("species", { user: req.user })
})

router.post('/update', async function (req, res, next) {
    if (req.user.role != 'admin') res.redirect('/');

    res.render("index", { user: req.user })
})

module.exports = router;