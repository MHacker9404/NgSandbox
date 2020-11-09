const express = require('express');
const router = express.Router();
const checkJWT = require('../middleware/check-jwt');

const useFileStorage = require('../middleware/file');

const Post = require(`../models/post`);

router.get(``, (req, res, next) => {
    const query = req.query;
    const postQuery = Post.find(); //  delayed execution
    const pageSize = +query.pageSize;
    const page = +query.page;
    let fetchedPosts;

    if (pageSize && page) {
        postQuery.skip(pageSize * (page - 1)).limit(pageSize);
    }
    postQuery
        .then((docs) => {
            fetchedPosts = docs;
            return Post.count({});
        })
        .then((count) => {
            // console.info(fetchedPosts);
            res.status(200).json({
                count: count,
                posts: fetchedPosts.map((doc) => ({
                    _id: doc._id,
                    title: doc.title,
                    content: doc.content,
                    imagePath: doc.imagePath,
                    creator: doc.creator,
                })),
            });
        });
});

router.post(``, checkJWT, useFileStorage, (req, res, next) => {
    const url = `${req.protocol}://${req.get('host')}`;
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: `${url}/images/${req.file.filename}`,
        creator: req['userData']['userId'],
    });

    post.save().then((result) => {
        // console.info(result);

        res.status(201).json({
            message: 'created',
            post: {
                ...post,
                id: result._id,
            },
        });
        res.end();
    });
});

router.patch(`/:id`, checkJWT, useFileStorage, (req, res, next) => {
    const post = new Post({
        //     _id: req.params.id,
        //     title: req.body.title,
        //     content: req.body.content,
        //     imagePath: req.body.im
    });

    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then((result) => {
        res.status(200).json({ message: 'updated', post: { _id: post._id, title: post.title, content: post.content } });
        res.end();
    });
});

router.delete(`/:id`, checkJWT, (req, res, next) => {
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
