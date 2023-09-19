/// contains functions for abouts information

const express = require('express');
const router = express.Router();
const studentModel = require('../models/student');
const multer = require('multer');
const upload = require('../utility/utility');


/* Beginning of Student Registration */
router.post('/addStudent', upload, async (req, res) => {
    //create New sudent function
    const newStudent = new studentModel({
        _id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthDate: req.body.birthDate,
        admision: req.body.admision,
        photo: req.file.fieldname,
        course: req.body.course,
        fees: req.body.fees,
        address: {
            contact: req.body.cotact,
            email: req.body.email,
        },
    });
    try {
        newStudent.save();
        req.session.message = {
            message: 'Student Registered',
            type: 'success',
        }
        res.redirect('/allstudents')
    } catch (error) {
        res.send.json({
            message: error.message,
            type: 'danger',
        });
    }
});



router.get('/allStudents', (req, res) => {
    //get all sudents function
    const allStudents = studentModel.find({});

    //res.status(200).send(" Dispalys all Sudents");
    res.render('text', { title: 'all students page' });
});

router.get('/singleStudent', (req, res) => {
    //get sudent's details function
    res.status(200).send(" Dispalys a single Sudents");
});

router.get('/updateStudent', (req, res) => {
    //update sudent's details function
    res.status(200).send(" update a Sudents");
});

router.get('/deletestudent', (req, res) => {
    //delete a sudent's function
    res.status(200).send(" Deletes a Single Student");
});

/* End of Student Registration */


/* Beginning of Student Enrolment and Admission */


router.get('/enrollments', (req, res) => {
    //Enroll a student in a course
    res.status(200).send("Enroll a student in a course");
});

router.get('/enrollments/courses/id', (req, res) => {
    //Retrieve a list of enrolled students in a course
    res.status(200).send("Retrieve a list of enrolled students in a course");
});

router.get('/enrollments/enrollment_id', (req, res) => {
    //Withdraw/DELETE a student from a course
    res.status(200).send("Withdraw/DELETE a student from a course");
});

/* end of Student Enrolment and Admission */




module.exports = router;