const express = require("express");
const expressLayout = require("express-ejs-layouts");
const routIndex = require("./routes/index");
const routlogin = require("./routes/login");
const routregister = require("./routes/register");

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayout);
app.use(express.static('public'));

app.use("/", routIndex);
app.use("/login", routIndex);
app.use("/register", routIndex);

app.listen(process.env.PORT || 3000, ()=>{
    try {
        console.log("listening on http://localhost:3000")
    } catch (error) {
        console.log(error)
    }
});
