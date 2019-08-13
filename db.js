const mysql = require('mysql');
const Sequelize = require('sequelize');


const sequelize = new Sequelize('new', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
})

// Create connection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'new'
});

// connect
db.connect((err) => {
    if(err) throw err;
    console.log('MySql Connected')
})


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


