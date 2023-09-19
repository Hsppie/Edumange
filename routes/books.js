/// contains functions for abouts information

const express = require('express');
const router = express.Router();
const booksModel = require('../models/books');
const multer = require('multer');
const upload = require('../utility/utility');

//const categoryModel = require('../models/bookcategory')

router.get('/addbook', (req, res) =>{})


/* Registration new books*/
router.post('/newbook', upload, async (req, res) => {
    //create New book function
    const newbook = new booksModel({
        _id: require.body.id,
        title : require.body.title,
        author: require.body.author,
        isbn: require.body.isbn,
    
    });
    try {
        newbook.save();
        req.session.message = {
            message: 'Book Registered',
            type: 'successfully added',
        }
        res.redirect('/allbooks')
    } catch (error) {
        res.send.json({
            message: error.message,
            type: 'missing information',
        });
    }
});



router.get('/allbooks', (req, res) => {
    //get all books function
    const allbooks = booksModel.find({});

    //res.status(200).send(" Dispalys all books");
    res.send('text', { title: 'all books page' });
});

router.get('/singlebook', (req, res) => {
    //get books details function
    res.status(200).send(" Dispalys a single book");
});

router.get('/updatebooks', (req, res) => {
    //update sudent's details function
    res.status(200).send(" update books");
});

router.delete('/deletebook', (req, res) => {
    //delete a book function
    res.status(200).send(" Deletes a Single book");
});


module.exports = router;
