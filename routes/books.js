/// contains functions for abouts information

const express = require('express');
const router = express.Router();
const booksModel = require('../models/books');
const bookcateModel = require('../models/bookcategory')

/* this route lists all books available in the database*/
router.get('/allbooks', async (req, res) => {
    /* 
    this is a funtion to retrieve all books from the database
    */
    try {
        const allbooks = await booksModel.find({});
        res.status(200).render('books/BookList.ejs', { allbooks: allbooks, title: 'All Books' });
    } catch (error) {
        res.status(200).send(error.message)
    }
});

//book creation form
router.get('/createbook', async (req, res) => {
    /* 
    this callback function will load the creation form(view)
    */
    try {
        const category = await bookcateModel.find({});
        const allbooks = await booksModel.find({});

        //res.send(category);
        res.render('books/AddBook', { category: category, allbooks: allbooks, title: "AddBook" })
    } catch (error) {
        res.send(error.message)
    }
});
/* Registration new books*/
router.post('/createbook', async (req, res) => {
    /*
    this callback function save data from the creation form to the database
    */
    try {
        let errors = [];
        let categories = req.body.catName;
        const category = await bookcateModel.findOne({ catName: req.body.catName });
        if (category.catName == req.body.catName) {
            const newbook = new booksModel({
                //_id: require.body.id,
                title: require.body.title,
                author: require.body.author,
                isbn: require.body.isbn,
                category_id: category._id
            });
            if (!title || author || isbn || category_id) {
                errors.push({ msg: 'Please enter all fields' });
            }
            const savedbook = await newbook.save();
            req.flash(
                'success_msg',
                `${savedbook.title} has been successfull Saved`
            );
            res.redirect('books/createbook')
        }
    }
    catch (error) {
        // res.send.json({
        //     message: error.message,
        //     type: 'danger',
        // });
        req.flash(
            'error_msg',
            `${error.message}`
        );
        res.redirect('books/createbook')
    }
});

/* this route is for viewing a single book*/
router.get('/:book_id/view', async (req, res) => {
    /* 
    a function that will render a single book view
    book._id
    */
    try {
        const book = await booksModel.findById({ _id: req.params.book_id }).populate({ path: "category_id", select: "catName" })
        res.status(200).send(book);
    } catch (error) {
        res.status(200).send(error.message);
    }
});
/* this route loads the edit book view*/
router.get('/:book_id/edit', async (req, res) => {
    //update sudent's details function
    try {
        const category = await bookcateModel.findOne({});
        const edit = await booksModel.findById({ _id: req.params.book_id }).populate({ path: "category_id", select: "catName" });
        res.status(200).send(edit, category);
    } catch (error) {
        res.status(200).send(error.message);
    }
});

/* this route is for updating the book*/
router.put('/:book_id/update', async (req, res) => {
    //update book's details function
    try {
        const category = await bookcateModel.findOne({ catName: req.body.catName });
        const updatebook = await booksModel.findByIdAndUpdate(
            { _id: req.params.book_id },
            {
                $set: {
                    title: req.body.title,
                    author: req.body.author,
                    isbn: req.body.isbn,
                    categoryId: category._id
                }
            },
            { new: true }
        );
        res.status(200).send(updatebook);
    } catch (error) {
        res.send(error.message)
    }
});

/* this route is for deleting a book*/
router.get('/:book_id/remove', async (req, res) => {
    //delete a book function
    try {
        const todelete = await booksModel.deleteOne({ _id: req.params.book_id })
        res.status(200).send(" Book deleted");
    } catch (error) {
        res.send(error.message)
    }
});

module.exports = router;
