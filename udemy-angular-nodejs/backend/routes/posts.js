const express = require('express');
const router = express.Router();
const Post = require(`../models/post`);

router.get(``, (req, res, next) => {
    Post.find().then((docs) => {
        // console.info(docs);
        res.status(200).json({ posts: docs.map((doc) => ({ _id: doc._id, title: doc.title, content: doc.content })) });
    });
});

router.post(``, (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    });

    post.save().then((result) => {
        // console.info(result);
    });

    res.status(201).json({ message: 'created', id: post._id });
    res.end();
});

router.patch(`/:id`, (req, res, next) => {
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
    });

    // console.info(post);

    Post.updateOne({ _id: req.params.id }, post).then((result) => {
        res.status(200).json({ message: 'updated', post: { _id: post._id, title: post.title, content: post.content } });
        res.end();
    });
});

router.delete(`/:id`, (req, res, next) => {
    // console.info(req.params.id);

    Post.deleteOne({ _id: req.params.id }).then((result) => {
        // console.info(result);
        Post.find().then((docs) => {
            // console.info(docs);
            res.status(200).json({ message: 'deleted' });
            res.end();
        });
    });
});

module.exports = router;
