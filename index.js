const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');

const post = require('./routes/posts');

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


app.use('/posts', post);

//CREATE DATABASE Programatically

// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE new';
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         console.log('Database created');
//     })
// });

//CREATE TABLE Programatically

// app.get('/creatTable', (req, res) => {
//     let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('post table created');
//     })
// });




app.listen('3000', () => {
    console.log('Server starting....on 3000')
})