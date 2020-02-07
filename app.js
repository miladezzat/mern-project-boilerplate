const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/api/items');

const app = express(); //creating app

app.use(logger('dev')); //logger

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//user routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

//using api
app.use('/api/items', itemsRouter);

module.exports = app;
