const express = require('express');
const mongoose = require('mongoose');

const app = express();

// CORS configuration
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/* Database connection
mongoose.connect('mongodb+srv://admin:zonefranche@wineted.xomi2.mongodb.net/wineted?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connection success'))
    .catch(() => console.error('DB connection failed'));*/

// App routing configuration
app.post('/api/justify', appRouting);

module.exports = app;