/**
 * Created by SAJID on 7/17/2017.
 */

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");


/* Routes */
var index = require("./routes/index");
var todos = require("./routes/todos");

var app = express();

/* View Engine */
app.set('views', path.join(__direname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: false
    }
));

app.use('/', index);
app.use('/api/v1', todos);

app.listen(3000, function () {
    console.log("App is running on port 3000")
})
