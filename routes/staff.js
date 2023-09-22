/// contains functions for abouts information

const express = require('express');
const router = express.Router();
const staffModel = require('../models/staff');
const roleModel = require('../models/role')

/* all staff route */
router.get('/allStaff', async (req, res) => {
    try {
        const allStaff = await staffModel.find({});
        res.status(201).json({
            allStaff: allStaff
        })
    } catch (error) {
        console.log(error.message)
    }
});
/* create staff */
router.get('/createStaff', async (req, res) => {
    const roles = await roleModel.find({});
    res.send('staff creation form')
});
/* saving data in the database */
router.post('/saveStaff', async (req, res) => {
    try {
        const role = await roleModel.find({ roleName: req.body.roleName })
        const newStaff = new staffModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthDat: req.body.birthDate,
            gender: req.body.gender,
            Status: req.body.Status,
            job: {
                title: req.body.title,
                supervisor: req.body.supervisor,
                department: req.body.department,
                WorkLocation: req.body.WorkLocation,
                StartDate: req.body.StartDate
            },
            address: {
                streetAddress: streetAddress,
                city: city,
                Country: Country,
                emailAddress: emailAddress,
                contact: contact
            },
            role_id: role.role_id
        });
        const savedStaff = await newStaff.save()
        res.send(`${savedStaff.firstname} saved successfully`)
    } catch (error) {
        res.send(error.message)
    }
});

router.get('/:staff_id/view', async (req, res) => {
    //get staff's details function

    try {
        const viewStaff = await staffModel.findById({ _id: req.params.staff_id }).populate({ path: 'role_id', select: 'roleName' });
        res.status(200).send(viewStaff)
    } catch (error) {
        res.send(error.message)
    }
});

router.get('/:staff_id/edit', async (req, res) => {
    //load staff details view
    try {
        const roles = await roleModel.find({});
        const editStaff = await staffModel.findById({ _id: req.params.staff_id })
        res.status(200).send({
            editStaff: editStaff,
            roles: roles
        })
    } catch (error) {
        res.send(error.message)
    }
});

router.put('/:staff_id/update', async (req, res) => {
    //update staff details

    try {
        const role = await roleModel.findOne({ roleName: req.body.roleName });
        const updateStaff = await courseModel.findByIdAndUpdate(
            { _id: req.params.staff_id },
            {
                $set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    birthDate: req.body.birthDate,
                    gender: req.body.gender,
                    Status: req.body.Status,
                    job: {
                        title: req.body.title,
                        supervisor: req.body.supervisor,
                        department: req.body.department,
                        WorkLocation: req.body.WorkLocation,
                        StartDate: req.body.StartDate
                    },
                    address: {
                        streetAddress: re.body.streetAddress,
                        city: req.body.city,
                        Country: req.body.Country,
                        emailAddress: req.body.emailAddress,
                        contact: req.body.contact
                    },
                    role_id: role._id
                }
            },
            { new: true }
        );

        res.status(200).send(updateStaff)
    } catch (error) {
        res.send(error.message)
    }
});

router.delete('/:staff_id/remove', async (req, res) => {
    //delete a Staff's function
    try {
        const todelete = await staffModel.deleteOne({ _id: req.params.staff_id })
        res.status(200).send(" Staff deleted permanetly");
    } catch (error) {

    }
});
module.exports = router;

