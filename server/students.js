const api = require('express').Router()
const models = require('../db/models')
const students = models.Students;


api.get('/', (req, res, next) => {
  students.findAll()
    .then((studentList) => res.json(studentList))
    .catch(next)
})

api.get('/:studentId', (req, res, next) => {
  students.findById(req.params.studentId)
    .then((student) => res.json(student))
    .catch(next)
})

api.post('/', (req, res, next) => {
  students.create({
    name: req.body.name,
    email: req.body.email
  })
    .then((student) => res.json(student))
    .catch(next)
})

api.put('/:studentId', (req, res, next) => {
  students.findById(req.params.studentId)
  .then((student) => student.update(req.body))
  .then((updatedstudent) => res.json(updatedstudent))
  .catch(next)
})

api.delete('/:studentId', (req, res, next) => {
  let name;
  students.findById(req.params.studentId)
    .then((student) => {
      name = student.name;
      student.destroy();
    })
    .then(() => res.send('student' + name + 'destroyed'))
})

module.exports = api
