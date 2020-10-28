const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require(`mongoose`);

const postsRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');

const app = express();

const mongoOptions = {
    user: 'root-user',
    pass: process.env.MONGO_PASSWORD,
};
mongoose.connect(`mongodb://localhost/udemy-ng-node?authSource=admin`, mongoOptions).then(() => {
    console.info(`connected to mongo`);
});

//  parses request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`Access-Control-Allow-Headers`, [`Origin`, `X-Requested-With`, `Content-Type`, `Accept`, `authorization`]);
    res.setHeader(`Access-Control-Allow-Methods`, [`GET`, `POST`, `PATCH`, `DELETE`, `OPTIONS`]);

    next();
});

app.use(`/api/posts`, postsRoutes);
app.use(`/api/auth`, authRoutes);

module.exports = app;
