const api = require('express').Router()
const models = require('../db/models')
const campuses = models.Campuses;


api.get('/', (req, res, next) => {
  campuses.findAll()
    .then((campusList) => res.json(campusList))
    .catch(next)
})

api.get('/:campusId', (req, res, next) => {
  campuses.findById(req.params.campusId)
    .then((campus) => res.json(campus))
    .catch(next)
})

api.post('/', (req, res, next) => {
  campuses.create({
    name: req.body.name,
    email: req.body.image
  })
    .then((campus) => res.json(campus))
    .catch(next)
})

api.put('/:campusId', (req, res, next) => {
  campuses.findById(req.params.campusId)
  .then((campus) => campus.update(req.body))
  .then((updatedCampus) => res.json(updatedCampus))
  .catch(next)
})

api.delete('/:campusId', (req, res, next) => {
  let name;
  campuses.findById(req.params.campusId)
    .then((campus) => {
      name = campus.name;
      campus.destroy();
    })
    .then(() => res.send('campus' + name + 'destroyed'))
})

module.exports = api
