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


/**
 * Middleware for handle not found route 
 */
app.use((req, res, next) => {
    const error = new Error("Not Found URL request");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    if (error.status === 404) {
        return res.json({
            error: {
                message: error.message
            }
        });
    } else {
        return res.json({
            error: {
                message: error.message
            }
        });
    }


});

module.exports = app;
