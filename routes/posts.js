const express = require('express');

const router = express.Router();
const postModel = require('../models/posts.model');
const db = require('./../db');

// upload image using multer
const multer = require('multer');
const storage = multer.diskStorage({
   destination: function(req, file, cb) {
        cb(null, 'uploads/');
   },
    filename: (req, file, cb) => {
        cb(null,  file.originalname);
    }
});

const filterFile = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ 
        storage: storage,
        fileFilter: filterFile
    });

//Post data to table 
router.post('/addPosts', upload.single('image'),(req, res) => {

    console.log(req.file);
    let post = new postModel(
        { 
            title: req.body.title, 
            body: req.body.body,
        });
        
    let sql = `INSERT INTO posts (title, body) VALUES ("${post.title}", "${post.body}")`
    db.query(sql, post, (err, result) => {
        if(!err) {
            console.log(result);
            res.send(result);
        } else  throw err;
    });
});

// Get All Documents
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM posts';
    db.query(sql, (err, result) => {
        if(!err) {
            console.log(result);
            res.send(result);
        } else  throw err;
    })
});

// Get Single document using ID
router.get('/:id', (req, res) => {
    let postId = req.params.id;
    if(!postId) {
        return res.send('please provide post id');
    } else {
        let sql = 'SELECT * FROM posts where id=?';
        db.query(sql, postId, (err, result) => {
            if (err) throw err;
            console.log(result[0]);
            res.send(result[0]);
        }) 
    }
});

//update documents using ID
router.put('/:id', (req, res) => {
    let post = new postModel(
        { 
            title: req.body.title, 
            body: req.body.body
        });
    let postId = req.params.id;
    if(!postId) {
        return res.send('Please Provide post id ');
    } else {
        let sql = `UPDATE posts
        SET title = "${post.title}", body = "${post.body}"
        WHERE id = "${postId}"`;
 
        db.query(sql, (error, results, fields) => {
        if (error){
            return console.error(error.message);
        }
        console.log('Rows affected:', results.affectedRows);
        res.send(results);
        });
    }
})

router.delete('/:id', (req, res) => {
    let postId = req.params.id;
    const sql = `DELETE  FROM posts WHERE id= ?`
    db.query(sql, postId, (err, result) => {
        if(!err){
            res.send(result);
        } else 
        {
            res.send(err.message)
        }

    })
})




module.exports = router;