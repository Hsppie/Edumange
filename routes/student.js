/// contains functions for abouts information

const express = require('express');
const router = express.Router();
const studentModel = require('../models/student');
const studentCourse = require('../models/course');
const feesModel = require('../models/fees')
const parsar = require('json2csv').Parser;

;


/* Beginning of Student Registration form route */
router.get('/register', async (req, res) => {
    // student registration form route
    const courses = await studentCourse.find()
    res.render('student/AddStudent.ejs', { title: 'New Student', courses: courses })
});
// Ending of Student Registration form route

// student registration route
router.post('/addStudent', async (req, res) => {
    //create New sudent function
    const course = req.body.courseName
    const fee = req.body.amount
    const courses = await studentCourse.findOne({ courseName: course })
    const fees = await feesModel.findOne({ amount: fee })
    if (courses.courseName == req.body.courseName && fees.amount == req.body.amount) {
        let courseid = courses._id
        let feeId = fees._id
        const newStudent = new studentModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            admision: req.body.admision,
            semester: req.body.semester,
            //photo: req.file.fieldname,
            course_id: courseid,
            fees_id: feeId,
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
            res.redirect('/student/allStudents')
        } catch (error) {
            res.send({
                message: error.message,
                type: 'danger',
            });
        }
    }
});

router.get('/allStudents', async (req, res) => {
    //get all sudents function
    try {
        const allStudents = await studentModel.find().populate({ path: "course_id", select: { courseName: 1 } }).exec();
        //console.log(allStudents.course_id.courseName)
        res.render('student/StudentList.ejs', { title: 'Student List', allStudents: allStudents })
        //res.send(allStudents)
    } catch (error) {
        res.send(error.message)
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

const csvpaser = require('json2csv').Parser

//Download CSV file
router.get('/csv/download', async (req, res) => {
    try {
        let students = [];
        var studentDate = await studentModel.find({}).populate('course_id', 'courseName');
        studentDate.forEach((student) => {
            const { firstname, lastname, birthDate, gender, admision, course_id } = student
            students.push({ firstname, lastname, birthDate, gender, admision, course_id })
        });
        //const csvFields = [ 'First Name', 'Last Name', 'Birth Date', 'Gender', 'Admision Number', 'Course', 'Tel', 'Email' ]
        const csvFields = [
            {
                label: 'First Name',
                value: "firstname"
            },
            {
                label: 'Last Name',
                value: "lastname"
            },
            {
                label: 'Birth Date ',
                value: "birthdate"
            },
            {
                label: 'Gender ',
                value: "gender"
            },
            {
                label: 'Admision Number ',
                value: "admision"
            },
            {
                label: 'Course ',
                value: "course_id"
            },
            {
                label: 'Tel ',
                value: "address.contact"
            },
            {
                label: 'Email ',
                value: "address.email"
            }

        ]
        const csvinfo = new csvpaser({ csvFields });
        const csvData = csvinfo.parse(students)
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Deposition", "attachment: filename=Students.csv")
        res.status(200).end(csvData)
    } catch (error) {

    }
})

const multer = require('multer');
const path = require('path');
const csv = require('csvtojson')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, "upload-" + Date.now() + "-" + file.originalname);
    }

})
const upload = multer({ storage: storage });


router.post('/csv/import', upload.single('file'), async (req, res, next) => {
    try {
        const studentDate = [];
        csv().fromFile(req.file.path)
            .then(async (data) => {
                for (var i = 0; i < data.length; i++) {
                    studentDate.push({
                        firstname: data[ i ].firstname,

                    })
                }
                await studentModel.insertMany(studentDate);
            })
        res.send({ status: 400, success: true, message: "Uploaded successfully" })
    } catch (error) {
        res.send({ status: 400, success: false, message: error.message })
    }

})
module.exports = router;
