/// contains functions for abouts information

const express = require('express');
const router = express.Router()
const staffModel = require('../models/staff')
const multer = require('multer')
const upload = require('../utility/utility')


router.get('/addstaff', (req, res) =>{

})

/* Registration of new staff*/
router.post('/newcourse', upload, async (req, res) => {
    //create New course function
    const newcourse = new courseModel({
        firstname: require.body.firstname,
        lastname: require.body.lastname,
        birthdate: require.body.birthdate,
        gender: require.body.gender,
        image: require.body.image,
        Status: require.body.Status,
        job: {
            title: require.body.title,
            Supervisor: require.body.Supervisor,
            department: require.body.department,
            workLocation: require.body.workLocation,
            StartDate: require.body.StartDate
         },
         address: {
            streetAddress: require.body.streetAddress,
            city: require.body.city,
            country: require.body.country,
            emailAddress: require.body.emailAddress,
            contact: require.body.contact
         },
         roleId: require.body.roleId
    
    });
    try {
        newstaff.save();
        req.session.message = {
            message: 'staff Registered',
            type: 'successfully added',
        }
        res.redirect('/allstaffs')
    } catch (error) {
        res.send.json({
            message: error.message,
            type: 'staff not added',
        });
    }
});

router.post('/newstaff', (req, res) => {
    //create New new function
    res.status(200).send(" Create New new")});

router.get('/allStaff',(req, res) => {
    //get all staff function
    res.status(200).send(" Dispalys all staff");
});

router.get('/singleStaff',(req, res)=> {
    //get staff's details function
    res.status(200).send(" Dispalys a single Staff");
});

router.update('/updateStaff',(req, res)=> {
    //update Course's details function
    res.status(200).send(" update a staff");
});

router.delete('/deleteStaff',(req, res)=> {
    //delete a Staff's function
    res.status(200).send(" Deletes a Single staff");
});


module.exports = router;

