const Sequelize = require('sequelize');
const db = require('../index');
const Campus = require('./campus');

const Student = module.exports = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  }
},
{
  defaultScope: {
    include: {model: Campus}
  }
}
)

Student.hook('beforeValidate', function (student) {
  if (!student.email){
    student.email = `${student.name}@mhiajs.edu`
  }
})
