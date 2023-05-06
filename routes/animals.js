var express = require('express');
var router = express.Router();
const { Animal, Temperament, Species, Size, User } = require('../modules/sequelize');

router.get('/', async function (req, res) {
  Animal.findAll({
    attributes: ['id', 'name', 'birthday'],
    include: [
      { model: Size, as: 'size', attributes: ['name'] },
      { model: Species, as: 'species', attributes: ['name'] },
      { model: Temperament, attributes: ['name'] },
      { model: User, attributes: ['id'] }
    ],
  })
    .then(data => {
      const today = new Date();
      data.forEach(element => {
        let md = JSON.stringify(element.birthday).slice(1, 11).split(/[- :]/);;
        let age = new Date(Date.UTC(md[0], md[1], md[2]));
        element.age = today.getFullYear() - age.getFullYear();
        element.Birthday = `${age.getDate()}/${age.getMonth()}/${age.getFullYear()}`;
      });
      // res.json(data);
      res.render('animals', {
        user: req.user,
        animals: data
      });
    })
    .catch(err => console.log(err));
  let animals = [
    {
      "Id": 1,
      "Name": "Coco",
      "Species": "Dwarf Hamster",
      "Birthday": "2020-02-12",
      "Temperament": "calm, scared",
      "Size": "small",
      "Adopted": false
    },
    {
      "Id": 2,
      "Name": "Ted",
      "Species": "Tedy bear hamster",
      "Birthday": "2021-02-12",
      "Temperament": "calm, scared",
      "Size": "small",
      "Adopted": false
    },
    {
      "Id": 3,
      "Name": "Coco",
      "Species": "Jack-Russel",
      "Birthday": "2020-02-12",
      "Temperament": "energetic",
      "Size": "medium",
      "Adopted": false
    },
    {
      "Id": 4,
      "Name": "Everrest",
      "Species": "Budgy",
      "Birthday": "2019-02-12",
      "Temperament": "calm, happy",
      "Size": "small",
      "Adopted": false
    },
    {
      "Id": 5,
      "Name": "Rocko",
      "Species": "Tortouse",
      "Birthday": "2020-02-12",
      "Temperament": "calm, lazy",
      "Size": "medium",
      "Adopted": false
    },
    {
      "Id": 6,
      "Name": "Goldy",
      "Species": "Gold Fish",
      "Birthday": "2023-02-12",
      "Temperament": "calm",
      "Size": "small",
      "Adopted": false
    },
    {
      "Id": 7,
      "Name": "Lizzy",
      "Species": "Lizzard",
      "Birthday": "2020-02-12",
      "Temperament": "calm,lazy",
      "Size": "medium",
      "Adopted": false
    },
    {
      "Id": 8,
      "Name": "Goga",
      "Species": "Bearder Dragon",
      "Birthday": "2018-02-12",
      "Temperament": "calm, lazy, scared",
      "Size": "large",
      "Adopted": true
    },
    {
      "Id": 9,
      "Name": "Tweet Tweet",
      "Species": "Parrot",
      "Birthday": "2020-02-12",
      "Temperament": "calm, happy",
      "Size": "large",
      "Adopted": false
    },
    {
      "Id": 10,
      "Name": "Toothless",
      "Species": "Corn snake",
      "Birthday": "2017-02-12",
      "Temperament": "scared",
      "Size": "medium",
      "Adopted": false
    },
    {
      "Id": 11,
      "Name": "Sophie",
      "Species": "Dwarf Hamster",
      "Birthday": "2020-02-12",
      "Temperament": "calm, scared",
      "Size": "small",
      "Adopted": false
    },
    {
      "Id": 12,
      "Name": "Teddy",
      "Species": "Teddy bear hamster",
      "Birthday": "2021-02-12",
      "Temperament": "calm, scared",
      "Size": "small",
      "Adopted": false
    },
    {
      "Id": 13,
      "Name": "Roger",
      "Species": "Parrot",
      "Birthday": "2020-02-18",
      "Temperament": "calm, happy",
      "Size": "large",
      "Adopted": false
    }
  ]
});

router.post('/:id', async function (req, res) {
  // adopt animal
  console.log('req.id: ', req.params.id)

  Animal.update({ userId: req.user.id }, { where: { id: req.params.id } })
    .then(a => {
      console.log('update: ', a)
      res.redirect('/animals')
    })
    .catch(err => console.error('err: ', err));
});

router.post('/:id', async function (req, res) {
  // cancel adoption
  Animal.update({ userId: 1 }, { where: { id: req.params.id } })
    .then(a => {
      console.log('update: ', a)
      res.redirect('/animals')
    })
    .catch(err => console.error('err: ', err));
});
module.exports = router;