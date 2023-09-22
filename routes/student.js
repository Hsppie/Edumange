/// contains functions for abouts information

const express = require('express');
const router = express.Router();
const studentModel = require('../models/student');
//const studentCourse = require('../models/course');
const multer = require('multer');
//const upload = require('../utility/utility');


/* Beginning of Student Registration form route */
router.get('/register', (req, res) => {
    // student registration form route
    res.send('Student Registration form')
});
// Ending of Student Registration form route

// student registration route
router.post('/addStudent', async (req, res) => {
    //create New sudent function
    const newStudent = new studentModel({
        _id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthDate: req.body.birthDate,
        admision: req.body.admision,
        //photo: req.file.fieldname,
        course: req.body.course,
        fees: req.body.fees,
        address: {
            contact: req.body.contact,
            email: req.body.email,
        },
    });
    try {
        const student = await newStudent.save();
        req.session.message = {
            message: 'Student Registered',
            type: 'success',
        }
        res.send(student)
    } catch (error) {
        res.send({
            message: error.message,
            type: 'danger',
        });
    }
});

router.get('/allStudents', async (req, res) => {
    //get all sudents function
    try {
        const allStudents = await studentModel.find({});
        res.status(200).send(allStudents);
        //res.render('text', { title: 'all students page' });
    } catch (error) {
        /*
        * If there is an error in the above code, send a generic Server Error response to the client
        */
    }
});

router.get('/:student_id/view', async (req, res) => {
    //get sudent's details function
    const student = await studentModel.findById(req.params.student_id)//.populate('courses').exec();
    try {
        //const student = await studentModel.find(req.params.student_id);

        //const course = await studentCourse.find({ student: student.student_id });
        //res.send()
        res.status(200).send(student);
    } catch (error) {

    }
});

router.get('/:student_id/edit', async (req, res) => {
    //edit student details
    try {
        const singleStudent = await studentModel.findById(req.params.student_id);
        res.status(200).send(singleStudent);
    } catch (error) {
        console.log(error);
    }

});

router.put('/:student_id/update', async (req, res) => {
    //update sudent's details function
    let update
    try {
        update = await studentModel.findByIdAndUpdate(req.params.id);
        update.firstname = req.body.firstname
        update.lastname = req.body.lastname;
        update.birthDate = req.body.birthDate
        update.admision = req.body.admision
        // update.photo = req.body.fieldname
        update.course = req.body.course
        update.fees = req.body.fees
        update.address.contact = req.body.contact
        update.address.email = req.body.email
        const updated = await update.save();
        res.status(200).send.json(updated);
    } catch (error) {
        if (update === null) {
            console.log(error)
        }
    }
});

router.delete('/:student_id/remove', async (req, res) => {
    //delete a sudent's function
    let deleteStudent
    try {
        deleteStudent = await studentModel.findByIdAndDelete(re.params.student_id);
        deleteStudent.remove();
        res.status(200).send(" student deleted a Single Student");
    } catch (error) {

    }
});

/* End of Student Registration */

/* Beginning of Student Enrolment and Admission */

router.get('/enrollments', (req, res) => {
    // Enroll a student in a course
    res.status(200).send('Enroll a student in a course');
});

router.get('/enrollments/courses/id', (req, res) => {
    // Retrieve a list of enrolled students in a course
    res.status(200).send('Retrieve a list of enrolled students in a course');
});

router.get('/enrollments/enrollment_id', (req, res) => {
    // Withdraw/DELETE a student from a course
    res.status(200).send('Withdraw/DELETE a student from a course');
});

/* end of Student Enrolment and Admission */

module.exports = router;
