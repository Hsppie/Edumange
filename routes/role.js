const express = require('express');
const router = express.Router();
const roleModel = require('../models/role')


/* fetching all courseunits */
router.get('/allRoles', async (req, res) => {
    const allroles = await roleModel.find({});
    res.status(200).send(allroles);
});

/* load creation form view template */

router.get('/addRole', async (req, res) => {
    res.status(200).send("Role Tempalte")
});

/* saving data to the database */
router.post("/saveRole", async (req, res) => {

    try {
        const newRole = new roleModel({
            roleName: req.body.roleName
        });
        const savedRole = await newRole.save();
        res.status(200).send(savedRole)
    } catch (error) {
        console.log(error.message)
    }
});
/* saving data to the database */
router.get('/:role_id/view', async (req, res) => {
    try {
        const viewRole = await roleModel.findById({ _id: req.params.role_id });
        res.status(200).send(viewRole);
    } catch (error) {
        console.log(error.message)
    }
});
/* renders the edit view template */
router.get('/:role_id/edit', async (req, res) => {
    const viewRole = await roleModel.findById({ _id: req.params.role_id });
    res.status(200).send({
        viewRole: viewRole
    });
});
/* renders the edit view template */
router.put('/:role_id/update', async (req, res) => {
    try {
        const updatedRole = await roleModel.findByIdAndUpdate(
            { _id: req.params.role_id },
            {
                $set: {
                    roleName: req.body.roleName
                }
            },
            { new: true }
        );
        res.send(updatedRole);

    } catch (error) {
        res.send({
            message: error.message
        })
    }
});
/* for deleting a course unit */
router.delete('/:role_id/remove', async (req, res) => {

    try {
        const todelete = await roleModel.deleteOne({ _id: req.params.role_id })
        //await todelete.delete()
        res.send('role removed successfully')
    } catch (error) {
        res.send(error.message)
    }
})



module.exports = router;
