const express = require('express');
const router = express.Router();
const categoryModel = require('../models/bookcategory')
const bookModel = require('../models/books');


/* fetching all courseunits */
router.get('/allcategories', async (req, res) => {
    const allcategories = await categoryModel.find({});
    res.render('books/AddBookCategory.ejs', { title: "Add Book", allcategories: allcategories });
});

/* load creation form view template */

router.get('/addCategory', async (req, res) => {
    try {
        const books = await bookModel.find({})
        res.status(200).send("Role Tempalte")
    } catch (error) {

    }
});

/* saving data to the database */
router.post("/addCategory", async (req, res) => {

    try {
        // const book = await bookModel.findOne({ title: req.body.title })
        const newCategory = new categoryModel({
            catName: req.body.catName,
            description: req.body.description,
        });
        const savedCategory = await newCategory.save();
        req.flash(
            'success_msg',
            `${savedCategory.catName}  has been successfull Saved`)
        res.redirect('/categories/allcategories')
    } catch (error) {
        req.flash(
            'error_msg',
            `Something Went Wrong`)
        res.redirect('/categories/allcategories')
    }
});
/* saving data to the database */
router.get('/:cate_id/view', async (req, res) => {
    try {
        const viewCategory = await categoryModel.findById({ _id: req.params.cate_id });
        res.status(200).send(viewCategory);
    } catch (error) {
        console.log(error.message)
    }
});
/* renders the edit view template */
router.get('/:cate_id/edit', async (req, res) => {
    const editCategory = await categoryModel.findById({ _id: req.params.cate_id });
    res.render('books/BookCategoryEdit', {
        editCategory: editCategory,
        title: 'Edit Category'
    });
});
/* renders the edit view template */
router.put('/:cate_id/update', async (req, res) => {
    try {
        const updatedcate = await categoryModel.findByIdAndUpdate(
            { _id: req.params.cate_id },
            {
                $set: {
                    catName: req.body.catName
                }
            },
            { new: true }
        );
        req.flash(
            'success_msg',
            `${updatedcate.catName}  has been successfull Saved`)
        res.redirect('/categories/allcategories')

    } catch (error) {
        res.send({
            message: error.message
        })
    }
});
/* for deleting a course unit */
router.delete('/:cate_id/remove', async (req, res) => {

    try {
        const todelete = await categoryModel.deleteOne({ _id: req.params.cate_id })
        //await todelete.delete()
        req.flash(
            'success_msg',
            `Category has been successfull Deleted`)
        res.redirect('/categories/allcategories')
    } catch (error) {
        res.send(error.message)
    }
})



module.exports = router;
