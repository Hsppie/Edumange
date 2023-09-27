const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/login', (req, res) => {
    res.render('users/login', { title: 'Login' })
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/books/addbook',
        failureRedirect: '/users/login',
        //failureFlash: true
    })(req, res, next)

});

router.get('/register', (req, res) => {
    res.send('register page')
})
router.post('/register', async (req, res) => {
    const { email, username, password, role } = req.body
    let errors = [];
    if (!username || !password || role || email) {
        errors.push({ msg: 'Please enter all fields' })
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least six characters long.' })
    }
    if (errors.length > 0) {
        res.send('Rerender page')
    } else {
        const user = await User.findOne({ email: email });
        if (user) {
            const newlogin = new User({
                email: email,
                username: username,
                password: password,
                role: user.role
            });
            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(newlogin.password, salt, (error, hash) => {
                    if (error) {
                        console.log(error)
                    }
                    newlogin.password = hash;
                    newlogin.save()
                        .then(user => {
                            res.send(user)
                        })
                        .catch(error => console.log(error))
                })
            });
        }
    }
})


module.exports = router