/// contains functions for abouts information

const express = require('express');
const router = express.Router();
const courseModel = require('../models/course');
const courseunit = require('../models/courseUnits')

/*this routes renders course creation form view */
router.get('/addCourse', async (req, res) => {

    const courseUnits = await courseunit.findOne({ unitname: req.body.units });
    res.status(200).send(courseUnits)
});

/*this route is for creating a new course in database */

router.post('/createCourse', async (req, res) => {
    const courseUnits = await courseunit.findOne({ unitname: req.body.units });

    const newCourse = new courseModel({
        courseName: req.body.courseName,
        description: req.body.description,
        creditHours: req.body.creditHours,
        courseUnits_id: courseUnits._id
    });

    try {
        const course = await newCourse.save()
        res.status(200).send(course)
    } catch (error) {
        console.log(error.message)
    }
});

/* this route is for retrieving all courses */
router.get('/allCourse', async (req, res) => {

    const allCourse = await courseModel.find({});
    res.status(200).send(allCourse);
})

/* this route is for retrieving and viewing a single course */
router.get('/:course_id/view', async (req, res) => {
    /*
    fetch course by  ID from the database
    */
    const viewCourse = await courseModel.findById({ _id: req.params.course_id }).populate({ path: 'courseUnits_id', select: [ 'unitname' ] });
    res.status(200).send(viewCourse);
});
/* this route is for rendering the edit view template */
router.get('/:course_id/editCourse', async (req, res) => {
    const editCourse = await courseModel.findById({ _id: req.params.course_id }).populate({ path: 'courseUnits_id', select: [ 'unitname' ] });
    res.status(200).send(editCourse);
});

/* this route is for update course specfics */
router.put('/:course_id/updateCourse', async (req, res) => {
    try {
        const courseUnit = await courseunit.findOne({ unitname: req.body.units });
        const updateCourse = await courseModel.findByIdAndUpdate(
            { _id: req.params.course_id },
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    creditHours: req.body.creditHours,
                    courseUnits_id: courseUnit._id
                }
            },
            { new: true }
        );
        res.status(200).send(updateCourse);
    } catch (error) {
        console.log(error.message)
    }
});
/* this route is for deleting a specfic course */
router.delete('/:course_id/deletecourse', async (req, res) => {
    const todelete = await courseModel.deleteOne({ _id: req.params.course_id })
    res.status(200).send("Course deleted");
});

module.exports = router;
