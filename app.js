const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const barangRouter = require('./routes/barang');
const customerRouter= require('./routes/customer');
const salesDetailRouter= require('./routes/sales_detail');
const salesRouter= require('./routes/sales');

const user_controller= require('./controller/user');//for importing verify token

const session = require("express-session");
const passport = require("passport");

const app = express();

//connecting MONGO DB
const mongoose = require("mongoose");
const mongoDB = process.env.DATABASE_URI;   
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//user authentication and sign up
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



//middleware app level for verify bearer token except user route
//app.use('*',user_controller.verifyToken)
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/barang', barangRouter);
app.use('/customer',customerRouter);
app.use('/sales',salesRouter);
app.use('/sales-detail',salesDetailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
