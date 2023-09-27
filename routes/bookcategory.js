const express = require('express');
const router = express.Router();
const categoryModel = require('../models/bookcategory')
const bookModel = require('../models/books');


/* fetching all courseunits */
router.get('/allcategories', async (req, res) => {
    const allUnits = await categoryModel.find({});
    res.status(200).send(allUnits);
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
router.post("/saveCategory", async (req, res) => {

    try {
        const book = await bookModel.findOne({ title: req.body.title })
        const newCategory = new categoryModel({
            catName: req.body.catName,
            //book_id: book.book_id
        });
        const savedCategory = await newCategory.save();
        res.status(200).send(savedCategory)
    } catch (error) {
        console.log(error.message)
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
    res.status(200).send({
        editCategory: editCategory
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
        res.status(200).send(updatedcate)

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
        res.send('role removed successfully')
    } catch (error) {
        res.send(error.message)
    }
})



module.exports = router;
