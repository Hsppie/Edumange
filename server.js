const express = require("express");
const path = require('path');
require('dotenv').config();
const methodOverride = require('method-override');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const expressLayout = require("express-ejs-layouts");

/*
const StudentRoutes = require('./routes/student/student');
const CourseRoutes = require('./routes/course/courses');
const staffRoutes = require('./routes/staff/staff');
*/



const app = express();


// Setting db connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error)
});
db.once('open', () => {
    console.log('Database connected successfully')
});


// middleware
app.use(express.urlencoded({ extended: false }));
app.use(expressLayout);
app.use(express.json());
app.use(session({
    secret: process.env.SECRETE,
    saveUninitialized: true,
    resave: false
}));

app.use(methodOverride('_method'))


app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

// setting templating engin
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('layout', 'layouts/layout');
app.set('layout', path.join(__dirname, '/views/layout'));
app.set('partials', path.join(__dirname, '/views/partials'));
app.use(express.static('public'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/uploads', express.static(__dirname + 'public/uploads'));
/*
app.use(StudentRoutes);
app.use(CourseRoutes);
app.use(staffRoutes);
*/

///Routes

app.use('/student', require('./routes/student'))


app.listen(process.env.PORT || 3000, () => {
    try {
        console.log(`listening on http://localhost:${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
});
