const express = require('express')
const router = express.Router()
const courseunits = require('../models/courseUnits');
const courses = require('../models/course');

/* fetching all courseunits */
router.get('/allCourseUnits', async (req, res) => {
    const allUnits = await courseunits.find({});
    res.render('course/courseUnitList.ejs', { title: 'Course Credits', allUnits: allUnits })
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

        });
        const savedUnit = await newUnit.save();
        req.flash(
            'success_msg',
            `${savedUnit.unitname} has been successfull Saved`)
        res.redirect('/courseUnits/allCourseUnits')
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
        const course = await courseunits.findOne({ name: req.body.courseName });
        const updatedUnit = await courseunits.findByIdAndUpdate(
            { _id: req.params.courseunit_id },
            {
                $set: {
                    unitname: req.body.unitname,
                    academicYear: req.body.academicYear,
                    semster: req.body.semster,

                }
            },
            { new: true }
        );
        req.flash(
            'success_msg',
            `${updatedUnit.unitname} has been successfull Updated`)
        res.redirect('/courseUnits/allCourseUnits')

    } catch (error) {
        res.send({
            message: error.message
        })
    }
});
/* for deleting a course unit */
router.delete('/:courseunit_id/remove', async (req, res) => {

    try {
        const todelete = await courseunits.deleteOne({ _id: req.params.courseunit_id })
        req.flash(
            'success_msg',
            `Course Credit Has been Deleted`)
        res.redirect('/courseUnits/allCourseUnits')
    } catch (error) {
        req.flash(
            'error_msg',
            `${error.message}`)
        res.redirect('/courseUnits/allCourseUnits')
    }
})



module.exports = router;