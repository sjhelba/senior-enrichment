const api = require('express').Router()
const models = require('../../db/models')
const Campuses = models.Campus;


api.get('/', (req, res, next) => {
  Campuses.findAll()
    .then((campusList) => res.json(campusList))
    .catch(err => console.error(err))
})

api.get('/:campusId', (req, res, next) => {
  Campuses.findById(req.params.campusId)
    .then((campus) => res.json(campus))
    .catch(err => console.error(err))
})

api.post('/', (req, res, next) => {
  Campuses.create({
    name: req.body.name,
    image: req.body.image
  })
    .then((campus) => res.json(campus))
    .catch(err => console.error(err))
})

api.put('/:campusId', (req, res, next) => {
  console.log('req.body:', req.body)
  console.log('req.params.campusId:', req.params.campusId)
  Campuses.findById(req.params.campusId)
  .then((campus) => campus.update(req.body))
  .then((updatedCampus) => res.json(updatedCampus))
  .catch(err => console.error(err))
})

api.delete('/:campusId', (req, res, next) => {
  let name;
  Campuses.findById(req.params.campusId)
    .then((campus) => {
      name = campus.name;
      campus.destroy();
    })
    .then(() => res.send('campus' + name + 'destroyed'))
})

module.exports = api
