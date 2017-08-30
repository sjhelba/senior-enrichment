const Sequelize = require('sequelize');
const db = require('../index');

module.exports = db.define('student', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
})
