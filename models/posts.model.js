const Sequelize = require('sequelize');
const db = require('./../db');

module.exports = postModel = db.sequelize.define(
    'posts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    }
});

