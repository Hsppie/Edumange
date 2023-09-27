const express = require("express");
const path = require('path');
require('dotenv').config();
const methodOverride = require('method-override');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const expressLayout = require("express-ejs-layouts");
const passport = require('passport');
const morgan = require('morgan')

/*
const StudentRoutes = require('./routes/student/student');
const CourseRoutes = require('./routes/course/courses');
const staffRoutes = require('./routes/staff/staff');
*/



const app = express();
require('./utility/passport')(passport);


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
    resave: true
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('combined'))

app.use(methodOverride('_method'))


app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

// setting templating engin
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, '/views'));
app.set('views', __dirname + '/views');
app.set('books', __dirname + '/views/books');
app.set('layouts', __dirname + '/views/layouts');
app.set('partials', __dirname + '/views/partials');
// app.set('layout', path.join(__dirname, '/views/layout'));
// app.set('partials', path.join(__dirname, '/views/partials'));
app.use(express.static('public'));
// app.use('/images', express.static(__dirname + 'public/images'));
// app.use('/css', express.static(__dirname + 'public/css'));
// app.use('/js', express.static(__dirname + 'public/js'));
// app.use('/uploads', express.static(__dirname + 'public/uploads'));
/*
app.use(StudentRoutes);
app.use(CourseRoutes);
app.use(staffRoutes);
*/

///Routes

app.use('/student', require('./routes/student'));
app.use('/courseUnits', require('./routes/courseunit'));
app.use('/courses', require('./routes/courses'));
app.use('/books', require('./routes/books'));
app.use('/role', require('./routes/role'));
app.use('/categories', require('./routes/bookcategory'))
app.use('/staff', require('./routes/staff'))
app.use('/users', require('./routes/user'))

app.listen(process.env.PORT || 3000, () => {
    try {
        console.log(`listening on http://localhost:${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
});
