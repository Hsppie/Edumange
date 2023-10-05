const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/login', (req, res) => {
    res.render('users/login', { title: 'Login', layout: './layouts/login.ejs' })
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
    const { email, username, password } = req.body;
    let errors = [];
    if (!email || !username || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    if (errors.length > 0) {
        res.render('register', {
            errors, email, password
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors, email, password
                });
            } else {
                const newUser = new User({

                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
})


module.exports = router