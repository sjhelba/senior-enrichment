const api = require('express').Router()
const models = require('../../db/models')
const Students = models.Student;


api.get('/', (req, res, next) => {
  Students.findAll()
    .then((studentList) => res.json(studentList))
    .catch(err => console.error(err))
})

api.get('/:studentId', (req, res, next) => {
  Students.findById(req.params.studentId)
    .then((student) => res.json(student))
    .catch(err => console.error(err))
})

api.post('/', (req, res, next) => {
  Students.create({
    name: req.body.name,
    email: req.body.email,
    campusId: req.body.campusId
  })
    .then(student => Students.findById(student.id))
    .then(studentWithCampus => res.json(studentWithCampus))
    .catch(err => console.error(err))
})

api.put('/:studentId', (req, res, next) => {
  console.log('req.body', req.body);
  console.log('req.params.studentId', req.params.studentId);
  Students.findById(req.params.studentId)
  .then((student) => student.update(req.body))
  .then((updatedstudent) => res.json(updatedstudent))
  .catch(err => console.error(err))
})

api.delete('/:studentId', (req, res, next) => {
  let id;
  Students.findById(req.params.studentId)
    .then((student) => {
      id = student.id;
      student.destroy();
    })
    .then(() => res.json(id))
})

module.exports = api
