/// contains functions for abouts information

const express = require('express');
const router = express.Router();


/* Beginning of Student Registration */
router.get('/', (req, res) => {
    //create New sudent function
    //res.send('Create new student Here')
    res.send('/layout/studentRegistrati')
});

router.get('/allStudents',(req, res) => {
    //get all sudents function
    res.status(200).send(" Dispalys all Sudents");
});

router.get('/singleStudent',(req, res)=> {
    //get sudent's details function
    res.status(200).send(" Dispalys a single Sudents");
});

router.get('/updateStudent',(req, res)=> {
    //update sudent's details function
    res.status(200).send(" update a Sudents");
});

router.get('/deletestudent',(req, res)=> {
    //delete a sudent's function
    res.status(200).send(" Deletes a Single Student");
});

/* End of Student Registration */


/* Beginning of Student Enrolment and Admission */


router.get('/enrollments',(req, res)=> {
    //Enroll a student in a course
    res.status(200).send("Enroll a student in a course");
});

router.get('/enrollments/courses/id',(req, res)=> {
    //Retrieve a list of enrolled students in a course
    res.status(200).send("Retrieve a list of enrolled students in a course");
});

router.get('/enrollments/enrollment_id',(req, res)=> {
    //Withdraw/DELETE a student from a course
    res.status(200).send("Withdraw/DELETE a student from a course");
});

/* end of Student Enrolment and Admission */




module.exports = router;