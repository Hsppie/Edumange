/// contains functions for abouts information

const express = require('express');
const router = express.Router()


router.get('/course', (req, res) => {
    //create New course function
    res.status(200).send(" Create New course")});

router.get('/allCourse',(req, res) => {
    //get all Courses function
    res.status(200).send(" Dispalys all Course");
});

router.get('/singleCourse',(req, res)=> {
    //get Course's details function
    res.status(200).send(" Dispalys a single Course");
});

router.get('/updateCourse',(req, res)=> {
    //update Course's details function
    res.status(200).send(" update a Course");
});

router.get('/deletecourse',(req, res)=> {
    //delete a Course's function
    res.status(200).send(" Deletes a Single Course");
});


module.exports = router;
