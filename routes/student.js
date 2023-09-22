/// contains functions for abouts information

const express = require('express');
const router = express.Router();
const studentModel = require('../models/student');
const studentCourse = require('../models/course');
const studentFees = require('../models/fees')
//const multer = require('multer');
//const upload = require('../utility/utility');


/* Beginning of Student Registration form route */
router.get('/registerStudent', async (req, res) => {
    // student registration form route
    const course = await studentCourse.findOne({});
    const fees = await studentFees.findOne({});
    res.send(course, fees)
});
// Ending of Student Registration form route

// student registration route
router.post('/addStudent', async (req, res) => {
    //create New sudent function

    try {

        const course = await studentCourse.findOne(req.body.course);
        const fees = await studentFees.findOne(req.body.fess)
        const newStudent = new studentModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthDate: req.body.birthDate,
            admision: req.body.admision,
            course_id: course._id,
            fees_id: fees._id,
            address: {
                contact: req.body.contact,
                email: req.body.email,
            },
        });

        const student = await newStudent.save();
        // req.session.message = {
        //     message: 'Student Registered',
        //     type: 'success',
        // }
        res.send(student)
    } catch (error) {
        // res.send({
        //     message: error.message,
        //     type: 'danger',
        // });
        res.send(student)
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
        res.send(error.message)
    }
});

router.get('/:student_id/view', async (req, res) => {
    //get sudent's details function

    try {
        //const student = await studentModel.find(req.params.student_id);
        const student = await studentModel.findById(req.params.student_id).populate({ path: 'course_id', select: [ 'name' ] }).populate({ path: 'fees_id', select: 'amount' }).exec();

        //const course = await studentCourse.find({ student: student.student_id });
        //res.send()
        res.status(200).send(student);
    } catch (error) {
        res.send(error.message);
    }
});

router.get('/:student_id/edit', async (req, res) => {
    //edit student details
    try {
        const course = await studentCourse.find({});
        const fees = await studentFees.find({});
        const student = await studentModel.findById(req.params.student_id).populate({ path: 'course_id', select: [ 'name' ] }).populate({ path: 'fees_id', select: 'amount' }).exec();
        res.status(200).send({
            student: student,
            course: course,
            fees: fees
        });
    } catch (error) {
        console.log(error.message);
    }

});

router.put('/:student_id/update', async (req, res) => {
    //update sudent's details function

    try {
        const course = await studentCourse.find({ course: req.body.course });
        const fees = await studentFees.find({ amount: req.body.amount });
        const updateStaff = await courseModel.findByIdAndUpdate(
            { _id: req.params.student_id },
            {
                $set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    birthDate: req.body.birthDate,
                    gender: req.body.gender,
                    admision: req.body.admision,
                    semester: req.body.semester,
                    course_id: course._id,
                    fees_id: fees._id,

                    address: {
                        contact: req.body.contact,
                        city: req.body.city,
                        email: req.body.Country,
                    },
                }
            },
            { new: true }
        );
        res.status(200).send.json(updateStaff);
    } catch (error) {
        // if (update === null) {
        //     console.log(error)
        // }
        res.send(error.message)
    }
});

router.delete('/:student_id/remove', async (req, res) => {
    //delete a sudent's function

    try {
        await studentModel.deleteOne(re.params.student_id);
        res.status(200).send(" student deleted a Single Student");
    } catch (error) {
        res.send(error.message);
    }
});

/* End of Student Registration */


/* 
Beginning of Student Enrolment and Admission 


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