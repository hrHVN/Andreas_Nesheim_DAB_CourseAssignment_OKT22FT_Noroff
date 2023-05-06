var express = require('express');
const { Temperament } = require('../modules/sequelize');
var router = express.Router();

router.get('/', async function (req, res, next) {
    if (!req.user || req.user.role != 'admin') {
        res.redirect('/');
    } 
    else {
        // Get all
        Temperament.findAll()
            .then(temp => {
                res.render("temperament", { user: req.user, temperament: temp })
            })
            .catch(err => console.error(err));
    }
    // let temperament = [
    //     {
    //         Id: 1,
    //         Name: "Calm"
    //     },
    //     {
    //         Id: 2,
    //         Name: "Scared"
    //     }
    // ]
})

router.post('/update/new', function (req, res, next) {
    if (!req.user || req.user.role != 'admin') {
        res.redirect('/');
    } 
    else {
        //Add new temperament
        Temperament.create({ name: req.body.name })
            .then(() => {
                res.redirect("/temperament")
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
        Temperament.update({ name: req.body.name }, { where: { id: req.params.id } })
            .then(() => {
                res.redirect("/temperament")
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
        Temperament.destroy({ where: { id: req.params.id } })
            .then(() => res.redirect("/temperament"));
    }
});


module.exports = router;