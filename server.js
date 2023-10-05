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
const flash = require('connect-flash')



const app = express();
require('./utility/passport')(passport);
app.use(bodyparser.json())


// Setting db connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error.message)
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
app.use(flash());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(methodOverride('_method'))


app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next()
});


// setting templating engin
app.set('views', __dirname + '/views');
app.set('books', __dirname + '/views/books');
app.set('layout', __dirname + '/views/layouts/layout');
app.set('partials', __dirname + '/views/partials');
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.set('view engine', 'ejs');


///Routes

app.use('/student', require('./routes/student'));
app.use('/courseUnits', require('./routes/courseunit'));
app.use('/courses', require('./routes/courses'));
app.use('/books', require('./routes/books'));
app.use('/role', require('./routes/role'));
app.use('/categories', require('./routes/bookcategory'))
app.use('/staff', require('./routes/staff'))
app.use('/users', require('./routes/user'))
app.use('/dashboard', require('./routes/dashboard'))

app.listen(process.env.PORT || 3000, () => {
    try {
        console.log(`listening on http://localhost:${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
});
