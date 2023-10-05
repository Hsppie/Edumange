const express = require('express');
const router = express.Router();
const courseModel = require('../models/course')
const studentModel = require('../models/student');
const staffModel = require('../models/staff');



//Dashboard
router.get('/kpi', async (req, res) => {
    const allstudents = await studentModel.find({}).count();
    const allCourses = await courseModel.find({}).count();
    const allstaff = await staffModel.find({}).count();
    res.render('dashboard', { title: 'Dashboard', allstudents: allstudents, allCourses: allCourses, allstaff: allstaff })
});



module.exports = router;
