var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")

/*
 here goes our Routers
*/



var app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json({ type: 'application/json', }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
    CHANGES HERE
*/

var usersRouter = require('./routes/users');

app.use('/users', usersRouter);



var mongoose = require('mongoose');
const db_name ="users"
const db = mongoose.connect(`mongodb://localhost:27017/${db_name}`, { useNewUrlParser: true, useUnifiedTopology: true });
db.then(() => {
    console.log("db connected ...")
}).catch(err => {
    console.error("connection failed ... : ", err)
})

module.exports = app;
