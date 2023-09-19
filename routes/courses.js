/// contains functions for abouts information

const express = require('express');
const router = express.Router()
const courseModel = require('../models/course');

router.post('/Createcourse', (req, res) => {
    //create New course function
    const newCourse = new courseModel({
        name: req.body.name,

    })


    res.status(200).send(" Create New course")
});

router.get('/allCourse', (req, res) => {
    /* 
    fetch data from the database
    */
    res.status(200).send(" Dispalys all Course");
});

router.get('/singleCourse', (req, res) => {
    /*
    fetch databy  ID from the database
    */
    res.status(200).send(" Dispalys a single Course");
});

router.put('/updateCourse', (req, res) => {
    //update Course's details function
    res.status(200).send(" update a Course");
});

router.delete('/deletecourse', (req, res) => {
    //delete a Course's function
    res.status(200).send(" Deletes a Single Course");
});


module.exports = router;
