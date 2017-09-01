const Sequelize = require('sequelize');
const db = require('../index')

module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: '/img/default.jpeg'
  }
})


//many students to one campus
