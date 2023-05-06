var express = require('express');
const { Species } = require('../modules/sequelize');
var router = express.Router();

router.get('/', async function (req, res, next) {
    if (!req.user || req.user.role != 'admin') {
        res.redirect('/');
    }
    else {
        Species.findAll()
        .then(species => {
            res.render("species", { user: req.user , species})
        })
        // species = [
        //     {
        //         Id: 1,
        //         Name: "Tedy bear hamster"
        //     },
        //     {
        //         Id: 2,
        //         Name: "Jack-Russel"
        //     }
        // ]
    }
});

router.post('/update/new', function (req, res, next) {
    if (!req.user || req.user.role != 'admin') {
        res.redirect('/');
    } 
    else {
        //Add new temperament
        Species.create({ name: req.body.name })
            .then(() => {
                res.redirect("/species")
            }).catch((err) => {
                res.json(err);
            });
    }
})

router.post('/update/:id', async function (req, res, next) {
    if (!req.user || req.user.role != 'admin') {
        res.redirect('/');
    } 
    else {
        // Update Temperament
        Species.update({ name: req.body.name }, { where: { id: req.params.id } })
            .then(() => {
                res.redirect("/species")
            }).catch((err) => {
                res.json(err);
            });
    }
});

router.delete('/:id', (req, res) => {
    if (!req.user || req.user.role != 'admin') {
        res.redirect('/');
    } 
    else {
        // Delete Temperament
        Species.destroy({ where: { id: req.params.id } })
            .then(() => res.redirect("/species"));
    }
});



module.exports = router;