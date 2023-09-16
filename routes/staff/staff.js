/// contains functions for abouts information

const express = require('express');
const router = express.Router()


router.get('/staff', (req, res) => {
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

router.get('/updateStaff',(req, res)=> {
    //update Course's details function
    res.status(200).send(" update a staff");
});

router.get('/deleteStaff',(req, res)=> {
    //delete a Staff's function
    res.status(200).send(" Deletes a Single staff");
});


module.exports = router;

