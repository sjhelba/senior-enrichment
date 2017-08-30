const Sequelize = require('sequelize');
const db = require('../index')

module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  }
})


//many students to one campus
