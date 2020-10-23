const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require(`mongoose`);
const Post = require(`./models/post`);

const app = express();
const mongoOptions = {
    user: 'root-user',
    pass: 'P@ssw0rd1',
};
mongoose.connect(`mongodb://localhost/udemy-ng-node?authSource=admin`, mongoOptions).then(() => {
    console.info(`connected to mongo`);
});

//  parses request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`Access-Control-Allow-Headers`, [`Origin`, `X-Requested-With`, `Content-Type`, `Accept`]);
    res.setHeader(`Access-Control-Allow-Methods`, [`GET`, `POST`, `PATCH`, `DELETE`, `OPTIONS`]);

    next();
});

app.get(`/api/posts`, (req, res, next) => {
    Post.find().then((docs) => {
        console.log(docs);
        res.status(200).json({ posts: docs });
    });
});

app.post(`/api/posts`, (req, res, next) => {
    // const post = { title: req.body.title, content: req.body.content };
    // console.log(post);
    // posts.push(post);

    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    });

    post.save();

    // res.status(201).json({ posts: posts });
    res.sendStatus(201);
    res.end();
});

app.delete(`/api/posts/:id`, (req, res, next) => {
    console.log(req.params.id);

    Post.deleteOne({ _id: req.params.id }).then((result) => {
        console.log(result);
        Post.find().then((docs) => {
            console.log(docs);
            res.status(200).json({ posts: docs });
        });
    });
});

module.exports = app;
