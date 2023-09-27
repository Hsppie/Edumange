const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/User')
//const passport = require('passport')

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                const user = await User.findOne({ email: email });
                // Match user
                if (!user) {
                    return done(null, false.valueOf, { msg: 'Email does not exit' });
                }
                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, { msg: 'password Incorrect' })
                    }

                })
            } catch (error) {
                if (error) return done(error);
            }
        })
    );
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}


