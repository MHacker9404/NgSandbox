const express = require('express');
const multer = require(`multer`);

const router = express.Router();
const Post = require(`../models/post`);

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
};

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
            console.info(fetchedPosts);
            res.status(200).json({
                count: count,
                posts: fetchedPosts.map((doc) => ({
                    _id: doc._id,
                    title: doc.title,
                    content: doc.content,
                    imagePath: doc.imagePath,
                })),
            });
        });
});

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        const error = isValid ? null : new Error(`Invalid MIME type`);

        //  relative to server.js
        callback(error, './backend/images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        callback(null, `${name}-${Date.now()}.${ext}`);
    },
});
router.post(``, multer({ storage: storage }).single('image'), (req, res, next) => {
    const url = `${req.protocol}://${req.get('host')}`;
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: `${url}/images/${req.file.filename}`,
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

router.patch(`/:id`, multer({ storage: storage }).single('image'), (req, res, next) => {
    console.info(req.file);

    const post = new Post({
        //     _id: req.params.id,
        //     title: req.body.title,
        //     content: req.body.content,
        //     imagePath: req.body.im
    });

    console.info(post);

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
