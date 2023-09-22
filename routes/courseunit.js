const express = require('express')
const router = express.Router()
const courseunits = require('../models/courseUnits');
const courses = require('../models/course');

/* fetching all courseunits */
router.get('/allCourseUnits', async (req, res) => {
    const allUnits = await courseunits.find({});
    res.status(200).send(allUnits);
});

/* load creation form view template */

router.get('/addunit', async (req, res) => {
    const course = await courses.findOne({})
    res.status(200).send("createUnit")
});

/* saving data to the database */
router.post("/saveUnit", async (req, res) => {

    try {
        const course = await courses.findOne({ name: req.body.courseName })
        const newUnit = new courseunits({
            unitname: req.body.unitname,
            academicYear: req.body.academicYear,
            semster: req.body.semster,
            course_id: [ course._id ]
        });
        const savedUnit = await newUnit.save();
        res.status(200).send(savedUnit)
    } catch (error) {
        res.send(error.message)
    }
});
/* saving data to the database */
router.get('/:courseunit_id/view', async (req, res) => {
    try {
        const viewUnit = await courseunits.findById({ _id: req.params.courseunit_id }).populate({ path: 'course_id', select: [ 'name' ] });
        res.status(200).send(viewUnit);
    } catch (error) {
        console.log(error)
    }
});
/* renders the edit view template */
router.get('/:courseunit_id/edit', async (req, res) => {
    const course = await courses.findOne({});
    const viewUnit = await courseunits.findById({ _id: req.params.courseunit_id }).populate({ path: 'course_id', select: [ 'name' ] });
    res.status(200).send({
        course: course,
        viewUnit: viewUnit
    });
});
/* renders the edit view template */
router.put('/:courseunit_id/update', async (req, res) => {

    try {
        const course = await courses.findOne({ name: req.body.courseName });
        const updatedUnit = await courseModel.findByIdAndUpdate(
            { _id: req.params.courseunit_id },
            {
                $set: {
                    unitname: req.body.unitname,
                    academicYear: req.body.academicYear,
                    semster: req.body.semster,
                    course_id: course._id
                }
            },
            { new: true }
        );
        res.status(200).send(updatedUnit)

    } catch (error) {
        res.send({
            message: error.message
        })
    }
});
/* for deleting a course unit */
router.delete('/:courseunit_id/remove', async (req, res) => {

    try {
        const todelete = await courseModel.deleteOne({ _id: req.params.courseunit_id })
        res.send('course unit removed successfully')
    } catch (error) {

    }
})



module.exports = router;