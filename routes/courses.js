/// contains functions for abouts information

const express = require('express');
const router = express.Router();
const courseModel = require('../models/course');
const multer = require('multer');
const upload = require('../utility/utility')


router.get('/addcourse', (req, res) =>{

})

/* Registration new books*/
router.post('/newcourse', upload, async (req, res) => {
    //create New course function
    const newcourse = new courseModel({
        _id: require.body.id,
        name: require.body.name,
        description: require.body.description,
        creditHours: require.body.creditHours,
        courseUnits_id: require.body.courseUnits_id
    
    });
    try {
        newcourse.save();
        req.session.message = {
            message: 'Course Registered',
            type: 'successfully added',
        }
        res.redirect('/allcourses')
    } catch (error) {
        res.send.json({
            message: error.message,
            type: 'course not added',
        });
    }
});

router.post('/course', (req, res) => {
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

router.Update('/updateCourse',(req, res)=> {
    //update Course's details function
    res.status(200).send(" update a Course");
});

router.delete('/deletecourse',(req, res)=> {
    //delete a Course's function
    res.status(200).send(" Deletes a Single Course");
});


module.exports = router;
