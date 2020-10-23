const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//  parses request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`Access-Control-Allow-Headers`, [`Origin`, `X-Requested-With`, `Content-Type`, `Accept`]);
    res.setHeader(`Access-Control-Allow-Methods`, [`GET`, `POST`, `PATCH`, `DELETE`, `OPTIONS`]);

    next();
});

const posts = [
    {
        id: 1,
        title: 'title',
        content: 'content',
    },
    {
        id: 2,
        title: 'title - 2',
        content: 'content - 2',
    },
];
app.get(`/api/posts`, (req, res, next) => {
    res.status(200).json({ posts: posts });
    res.end();
});

app.post(`/api/posts`, (req, res, next) => {
    const post = { id: posts.length + 1, title: req.body.title, content: req.body.content };
    console.log(post);
    posts.push(post);

    res.status(201).json({ posts: posts });
    res.end();
});

module.exports = app;
