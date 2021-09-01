const express = require('express');
const mongoose = require('mongoose');
const justifyController = require('./modules/justify/middlewares/justify-controller');
const authController = require('./modules/auth/middelwares/auth-controllers');
const limitController = require('./modules/limit/middelwares/limit-controllers');

const app = express();

// CORS configuration
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Parsing request body
app.use(express.text())

//Database connection
mongoose.connect('mongodb+srv://jusitfyUser:AdUdXNAFtTcPZfTG@cluster0.mckun.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connection success'))
    .catch((error) =>{
        console.error('DB connection failed', error);
    });


// App routing configuration
app.post('/api/justify', authController.tokenAuth, limitController.isLimitReached, justifyController.justify);
app.post('/api/signup', authController.signup);
app.post('/api/login', authController.login);


module.exports = app;