const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require(`mongoose`);

const postsRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');

const app = express();

// https://github.com/docker/hub-feedback/issues/1255
const mongoOptions = {
    user: 'root-user',
    pass: process.env.MONGO_PASSWORD,
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
};
const connectWithRetry = () => {
    console.log('MongoDB connection with retry');
    mongoose
        .connect(`mongodb://${process.env.MONGO_HOST}/udemy-ng-node?authSource=admin`, mongoOptions)
        .then(() => {
            console.info(`connected to mongo`);
        })
        .catch((err) => {
            console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
            setTimeout(connectWithRetry, 5000);
        });
};
connectWithRetry();

//  parses request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', express.static(path.join(__dirname, 'client')));

app.use((req, res, next) => {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`Access-Control-Allow-Headers`, [`Origin`, `X-Requested-With`, `Content-Type`, `Accept`, `authorization`]);
    res.setHeader(`Access-Control-Allow-Methods`, [`GET`, `POST`, `PATCH`, `DELETE`, `OPTIONS`]);

    next();
});

app.use(`/api/posts`, postsRoutes);
app.use(`/api/auth`, authRoutes);
app.use((req, res, next) => {
    res.sendFile(path.join('client', 'index.html'));
});

module.exports = app;
